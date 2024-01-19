import { Button, Col, Form, Image, Input, Layout, Row, Select, Typography } from 'antd';
import Waiting from 'components/Waiting';
import { emotionsEmoji } from 'lib/options';
import { max, round } from 'lodash';
import { useState } from 'react';
import { backendService } from 'services';

import Feedback from './Feedback';
import type { Reponse } from './type';

const Home = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState<'en' | 'vi'>('vi');
  const [data, setData] = useState<Reponse | null>(null);
  const [feedback, setFeedback] = useState<string>();

  const handleDetect = async () => {
    setLoading(true);
    const { text } = await form.validateFields();
    const result = await backendService.post('/detect', { text, language });
    if (result.kind === 'ok') {
      setData({
        ...(result.data as Reponse),
        text,
      });
    }
    form.resetFields();
    setLoading(false);
  };

  return (
    <Layout>
      {loading ? <Waiting /> : null}
      {feedback ? (
        <Feedback
          emotion={data?.emotion!}
          content={feedback}
          onClose={() => setFeedback(undefined)}
        />
      ) : null}
      <Layout.Header>
        <Typography.Title level={2}>Emotion Detect</Typography.Title>
      </Layout.Header>
      <Layout.Content
        style={{
          height: window.innerHeight - 50,
          backgroundColor: '#fff',
          margin: 10,
          borderRadius: 10,
        }}
      >
        <Row>
          <Col span={12} style={{ padding: 20 }}>
            <Row align="middle" gutter={10} style={{ marginBottom: 10 }}>
              <Col>Language</Col>
              <Col>
                <Select
                  value={language}
                  options={[
                    {
                      label: 'English',
                      value: 'en',
                    },
                    {
                      label: 'Vietnamese',
                      value: 'vi',
                    },
                  ]}
                  onChange={(value) => {
                    setLanguage(value);
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Form form={form} style={{ width: '100%' }}>
                <Form.Item name="text">
                  <Input.TextArea
                    rows={5}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        handleDetect();
                      }
                    }}
                  />
                </Form.Item>
              </Form>
            </Row>
            <Row justify="space-between">
              <Col>
                <Button type="primary" onClick={handleDetect}>
                  Detect
                </Button>
              </Col>
              {data ? (
                <Col>
                  <Button
                    type="primary"
                    onClick={() => {
                      setFeedback(data.text);
                    }}
                  >
                    Send Feedback
                  </Button>
                </Col>
              ) : null}
            </Row>
          </Col>
          <Col span={12}>
            {data ? (
              <Row justify="space-between">
                <Col style={{ paddingRight: 10 }}>
                  <Typography>
                    <b>Text:</b> {data?.text}
                  </Typography>
                  <Typography>
                    <b>Emotion:</b> {data?.emotion} {emotionsEmoji[data?.emotion ?? '']}
                  </Typography>
                  <Typography>
                    <b>Confidence:</b> {round(max(data.probability) || 0, 4)}
                  </Typography>
                </Col>
                <Col>
                  <Image src={data?.chart} />
                </Col>
              </Row>
            ) : null}
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  );
};

export default Home;
