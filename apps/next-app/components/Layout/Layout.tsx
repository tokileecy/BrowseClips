import { ReactNode } from 'react'
import BaseThemeProvider from './BaseThemeProvider'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'

export interface LayoutProps {
  children?: ReactNode
}

const Layout = (props: LayoutProps): JSX.Element => {
  const { children } = props

  return (
    <BaseThemeProvider>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </BaseThemeProvider>
  )
}

export default Layout
