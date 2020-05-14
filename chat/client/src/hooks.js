import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks';
import {
  messagesQuery,
  addMessageMutation,
  messageAddedSubscription,
  addMessage,
} from './graphql/queries';

export function useChatMessages() {
  const { data } = useQuery(messagesQuery);
  const messages = data ? data.messages : [];
  const [addMessage] = useMutation(addMessageMutation);
  useSubscription(messageAddedSubscription, {
    onSubscriptionData: ({ client, subscriptionData }) => {
      client.writeData({
        data: {
          messages: messages.concat(subscriptionData.data.messageAdded),
        },
      });
    },
  });
  return {
    messages,
    addMessage: (text) => addMessage({ variables: { input: { text } } }),
  };
}
