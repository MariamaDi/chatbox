import { useEffect } from "react";
import Message, { IMessage } from "./Message";

interface Props {
  messages: IMessage[];
  username: string;
  onSendMessage: (arg: string, translate: boolean) => void;
}


const Messages = ({ messages, username, onSendMessage }: Props) => {
  return (
    <div>
      {messages.map((msg) => (
        <div key={msg.timeSent}>
          <Message message={msg} isMe={msg.username === username} />
          <button onClick={() => onSendMessage(msg.content,true)} type="submit">
            translate
          </button>
        </div>
      ))}
    </div>
  );
};
export default Messages;
