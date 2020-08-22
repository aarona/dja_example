import React, { useState, useEffect } from 'react'
import { Snackbar } from '@material-ui/core'
import { Alert } from '..'

interface MessagesProps {
  messages: string[]
}

const Messages: React.FC<MessagesProps> = ({ messages }) => {
  const [showMessage, setShowMessage] = useState(true)

  useEffect(() => {
    setShowMessage(messages.length > 0)
  }, [messages])

  const onClose = () => setShowMessage(false)

  const renderMessages = (messages: string[]) => {
    if (messages.length === 0) return <></>
    if (messages.length === 1) return <>{messages[0]}</>
    return <ul>
      {messages.map((message, key) => <li key={key}>{message}</li>)}
    </ul>
  }

  return <Snackbar
    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    key={`top,center`}
    open={showMessage}
    onClose={onClose}
  >
    <Alert onClose={onClose}>{renderMessages(messages)}</Alert>
  </Snackbar>
}

export default Messages
