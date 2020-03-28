import React from 'react'

interface MessagesProps {
  messages?: string[]
}

export const Messages: React.FC<MessagesProps> = ({ messages }) => {
  console.log("messages: ", messages);
  
  if(!messages || (messages && messages.length === 0)) {
    return <></>
  }

  return <ul>
    {messages.map((message, key) => <li key={key}>{message}</li>)}
  </ul>;
}

export default Messages