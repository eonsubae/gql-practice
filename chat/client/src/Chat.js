import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks';
import React, { useState } from 'react';
import {
  messagesQuery,
  addMessageMutation,
  messageAddedSubscription,
} from './graphql/queries';
import MessageInput from './MessageInput';
import MessageList from './MessageList';

const Chat = ({ user }) => {
  const [messages, setMessages] = useState([]);
  useQuery(messagesQuery, {
    onCompleted: ({ messages }) => setMessages(messages),
  });
  // const { /* loading, error, */ data } = useQuery(messagesQuery /* { options... like in client.query } */); // 이 코드가 아래 두 줄과 같은 역할
  // const [result, setResult] = useState({ loading: true });
  // client.query({ query : messagesQuery }).then(({ data }) => setResult({ loading : false, data }));
  const [addMessage /* { loading, error, data, called} */] = useMutation(
    addMessageMutation
  );
  useSubscription(messageAddedSubscription, {
    onSubscriptionData: ({ subscriptionData }) => {
      setMessages(messages.concat(subscriptionData.data.messageAdded));
    },
  });
  // const { data } = useSubscription(messageAddedSubscription);
  // const messages = data ? [data.messageAdded] : [];

  const handleSend = async (text) => {
    // TODO
    const { data } = await addMessage({ variables: { input: { text } } });
  };

  // if (loading) return <Spinner />;
  // if (error) return <div>Error!</div>;

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Chatting as {user}</h1>
        <MessageList user={user} messages={messages} />
        <MessageInput onSend={handleSend} />
      </div>
    </section>
  );
};

export default Chat;
