import React, { useContext } from 'react'
import { MessageContext } from '.';

interface MessagesProps {
  //messages: null | string[]
}

const Messages: React.FC<MessagesProps> = () => {
  // console.log("Render Messages...");
  
  const { messages, setMessages } = useContext(MessageContext)

  if (messages && messages.length > 0) {
    setMessages!([])
  }
  
  if(!messages || (messages && messages.length === 0)) {
    return <></>
  }

  return <ul>
    {messages.map((message, key) => <li key={key}>{message}</li>)}
  </ul>;
}

export default Messages