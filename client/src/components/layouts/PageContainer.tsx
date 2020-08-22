import React from 'react'
import { Header, FlashMessages, RouteIndex } from '..'
import { RouteWithSubRoutesProps } from '../routes/RouteWithSubRoutes'

interface PageContainerProps {
  header?: typeof Header
  includeFlashMessages?: boolean
  routes?: RouteWithSubRoutesProps[]
}

const PageContainer: React.FC<PageContainerProps> = ({
  children,
  header: Header,
  includeFlashMessages = true,
  routes = []
}) => {
  if(routes.length === 0) {
    return <>
      {Header? <Header /> : ""}
      {includeFlashMessages ? <FlashMessages /> : ""}
      {children}
    </>
  } else {
    return <RouteIndex routes={routes} />
  }
}

export default PageContainer