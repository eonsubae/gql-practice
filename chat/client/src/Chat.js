import { useQuery } from '@apollo/react-hooks';
import React from 'react';
import { messagesQuery } from './graphql/queries';
import MessageInput from './MessageInput';
import MessageList from './MessageList';

const Chat = ({ user }) => {
  const { /* loading, error, */ data } = useQuery(
    messagesQuery /* { options... like in client.query } */
  ); // 이 코드가 아래 두 줄과 같은 역할
  // const [result, setResult] = useState({ loading: true });
  // client.query({ query : messagesQuery }).then(({ data }) => setResult({ loading : false, data }));
  const messages = data ? data.messages : [];

  const handleSend = async (text) => {
    // TODO
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
