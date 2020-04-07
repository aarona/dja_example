import React, { useContext, useState, createContext } from 'react'
import { Messages, SetMessages } from '../../types'

export const defaultMessageState: MessageState = {
  messages: null,
  setMessages: null,
}

export interface MessageState {
  messages: Messages
  setMessages: SetMessages
}

export const MessageContext = createContext<MessageState>(defaultMessageState)

interface MessageProviderProps {

}

export const MessageProvider: React.FC<MessageProviderProps> = ({ children }) => {
  // console.log("Render MessageProvider...");

  const ctx = useContext(MessageContext)
  const [messages, setMessages] = useState<string[]>([])

  ctx.messages = messages
  ctx.setMessages = setMessages

  return <MessageContext.Provider value={ctx}>
    {children}
  </MessageContext.Provider>
}

export default { MessageProvider, MessageContext }