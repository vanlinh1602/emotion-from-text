import { Avatar, Row, Typography } from 'antd';
import React from 'react';

import type { ChatMes } from './type';

type Props = {
  messages: ChatMes[];
  mainUser: string;
};

const ChatMessage = ({ text, sender, isMain }: ChatMes & { isMain: boolean }) => (
  <Row align="middle" justify={!isMain ? 'start' : 'end'}>
    {!isMain ? (
      <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }} size="large">
        {sender.charAt(0)}
      </Avatar>
    ) : null}
    <Typography.Text
      style={{
        backgroundColor: '#005ef6',
        padding: 5,
        borderRadius: 12,
        margin: 5,
        color: 'white',
      }}
    >
      {text}
    </Typography.Text>
    {isMain ? (
      <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }} size="large">
        {sender.charAt(0)}
      </Avatar>
    ) : null}
  </Row>
);

const Chat = ({ messages, mainUser }: Props) => (
  <div>
    {messages.map((msg) => (
      <ChatMessage text={msg.text} sender={msg.sender} isMain={mainUser === msg.sender} />
    ))}
  </div>
);

export default Chat;
