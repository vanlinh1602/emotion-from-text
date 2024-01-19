import { Button, Form, Modal, Select, Typography } from 'antd';
import Waiting from 'components/Waiting';
import { emotionsEmoji } from 'lib/options';
import { useState } from 'react';
import { backendService } from 'services';

type Props = {
  content: string;
  emotion: string;
  onClose: () => void;
};

const Feedback = ({ content, emotion, onClose }: Props) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    const { emotion: formEmotion } = await form.validateFields();
    const result = await backendService.post('/feedback', { content, emotion: formEmotion });
    if (result.kind === 'ok') {
      setLoading(false);
      Modal.success({
        title: 'Success',
        content: 'Thank you for your feedback',
        onOk: onClose,
      });
    }
  };

  return (
    <Modal
      title="Feedback"
      open
      onCancel={onClose}
      footer={[
        <Button type="primary" onClick={handleSave}>
          Gửi
        </Button>,
      ]}
    >
      {loading ? <Waiting /> : null}
      <Form form={form} initialValues={{ emotion }}>
        <Form.Item name="content" label="Content">
          <Typography.Text>
            <b>{content}</b>
          </Typography.Text>
        </Form.Item>
        <Form.Item name="emotion" label="Emotion">
          <Select options={Object.keys(emotionsEmoji).map((value) => ({ label: value, value }))} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Feedback;
