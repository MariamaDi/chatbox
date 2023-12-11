import { useState } from "react";
import { Socket } from "socket.io-client";

interface Props {
  socket: Socket;
  setUsername: (username: string) => void;
}

const Username = ({ socket, setUsername }: Props) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUsername(text);
    socket.emit("username-set", {
      username: text,
    });
  };
  //A enlever
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {<button type="submit">submit</button>}
    </form>
  );
};
export default Username;
