import React, { useState, useEffect } from 'react'
import { Alert } from '..'
import { Snackbar } from '@material-ui/core'
import { useLocation } from 'react-router'

interface ContainerProps {
  message: string
}
const Container: React.FC<ContainerProps> = ({ message }) => {
  const [showMessage, setShowMessage] = useState(true)

  useEffect(() => {
    if (message !== '') {
      setShowMessage(true);
    }
  }, [message]);

  const onClose = () => setShowMessage(false)

  return <Snackbar
    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    key={`top,center`}
    open={showMessage}
    onClose={onClose}
  >
    <Alert onClose={onClose}>{message}</Alert>
  </Snackbar>
}

const FlashMessages: React.FC = () => {
  let message: string = ''
  const location = useLocation()
  
  const state = (location?.state) as any
  
  if(state && state.message) {
    message = state.message
  }
  
  return message !== '' ? <Container message={message} /> : <></>
}

export default FlashMessages
