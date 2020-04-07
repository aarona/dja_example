import React from 'react'
import { Header, Messages } from '../components';

interface PageContainerProps {
  includeHeader?: boolean
  includeMessages?:boolean
}

const PageContainer: React.FC<PageContainerProps> = ({
  children,
  includeHeader = true,
  includeMessages = true
}) => {
  // console.log("Render PageContainer...");

  return <>
    { includeHeader ? <Header /> : "" }
    { includeMessages ? <Messages /> : "" }
    { children }
  </>;
}

export default PageContainer