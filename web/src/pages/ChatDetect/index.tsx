import { Button, Col, Form, Image, Input, Layout, Row, Typography } from 'antd';
import Waiting from 'components/Waiting';
import { emotionsEmoji } from 'lib/options';
import type { Reponse } from 'pages/Home/type';
import { useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { backendService } from 'services';

import Chat from './Chat';
import type { ChatMes } from './type';

const ChatDetect = () => {
  const [messages, setMessages] = useState<ChatMes[]>([]);
  const [formUser1] = Form.useForm();
  const [formUser2] = Form.useForm();
  const [emotion1, setEmotion1] = useState<{ text: string; chart: string }>();
  const [emotion2, setEmotion2] = useState<{ text: string; chart: string }>();
  const [loading, setLoading] = useState(false);
  const handleSend = async (mes: string, user: string) => {
    if (!mes) return;
    setLoading(true);
    const newMes = {
      text: mes,
      sender: user,
    };
    const result = await backendService.post<Reponse>('/detect', { text: mes, language: 'vi' });
    if (result.kind === 'ok') {
      if (user === 'A') setEmotion1({ text: result.data.emotion, chart: result.data.chart });
      else setEmotion2({ text: result.data.emotion, chart: result.data.chart });
    }
    setMessages([...messages, newMes]);
    setLoading(false);
  };
  return (
    <Layout>
      {loading ? <Waiting /> : null}
      <Row gutter={20}>
        <Col span={6} style={{ padding: 20, width: '100%' }}>
          <Row justify="space-between" style={{ marginBottom: 10 }}>
            <Col>
              <b style={{ fontSize: 18 }}>User 1</b>
            </Col>
            <Col>
              <Typography style={{ fontSize: 18 }}>
                Emotion: {emotion1?.text} {emotionsEmoji[emotion1?.text ?? '']}
              </Typography>
            </Col>
          </Row>
          <Row
            style={{
              padding: 10,
              borderRadius: 12,
              backgroundColor: '#fff',
              display: 'block',
              width: '100%',
              height: 400,
              overflow: 'scroll',
              overflowX: 'hidden',
              overflowY: 'scroll',
            }}
          >
            <Chat messages={messages} mainUser="A" />
          </Row>
          <Row gutter={10} style={{ marginTop: 5 }} justify="space-between">
            <Col span={20}>
              <Form form={formUser1}>
                <Form.Item name="mess">
                  <Input
                    style={{ borderRadius: 12 }}
                    type="text"
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        const mes = formUser1.getFieldValue('mess');
                        handleSend(mes, 'A');
                        formUser1.resetFields();
                      }
                    }}
                  />
                </Form.Item>
              </Form>
            </Col>
            <Col span={4}>
              <Button
                style={{ borderRadius: 12 }}
                type="primary"
                onClick={() => {
                  const mes = formUser1.getFieldValue('mess');
                  handleSend(mes, 'A');
                  formUser1.resetFields();
                }}
              >
                <FiSend />
              </Button>
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          {emotion1?.chart ? (
            <>
              <Image src={emotion1?.chart} />
              <Row justify="center">
                <Typography>User 1</Typography>
              </Row>
            </>
          ) : null}
        </Col>
        <Col span={6} style={{ padding: 20, width: '100%' }}>
          <Row justify="space-between" style={{ marginBottom: 10 }}>
            <Col>
              <b style={{ fontSize: 18 }}>User 2</b>
            </Col>
            <Col>
              <Typography style={{ fontSize: 18 }}>
                Emotion: {emotion2?.text} {emotionsEmoji[emotion2?.text ?? '']}
              </Typography>
            </Col>
          </Row>
          <Row
            style={{
              padding: 10,
              borderRadius: 12,
              backgroundColor: '#fff',
              display: 'block',
              width: '100%',
              height: 400,
              overflow: 'scroll',
              overflowX: 'hidden',
              overflowY: 'scroll',
            }}
          >
            <Chat messages={messages} mainUser="B" />
          </Row>
          <Row gutter={10} style={{ marginTop: 5 }} justify="space-between">
            <Col span={20}>
              <Form form={formUser2}>
                <Form.Item name="mess">
                  <Input
                    style={{ borderRadius: 12 }}
                    type="text"
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        const mes = formUser2.getFieldValue('mess');
                        handleSend(mes, 'B');
                        formUser2.resetFields();
                      }
                    }}
                  />
                </Form.Item>
              </Form>
            </Col>
            <Col span={4}>
              <Button
                style={{ borderRadius: 12 }}
                type="primary"
                onClick={() => {
                  const mes = formUser2.getFieldValue('mess');
                  handleSend(mes, 'B');
                  formUser2.resetFields();
                }}
              >
                <FiSend />
              </Button>
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          {emotion2?.chart ? (
            <>
              <Image src={emotion2?.chart} />
              <Row justify="center">
                <Typography>User 2</Typography>
              </Row>
            </>
          ) : null}
        </Col>
      </Row>
    </Layout>
  );
};

export default ChatDetect;
