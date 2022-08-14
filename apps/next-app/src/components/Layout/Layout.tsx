import { ReactNode, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import BaseThemeProvider from './BaseThemeProvider'
import Header from './Header'
import Main from './Main'
import { setAuth } from '@/redux/features/auth/authSlice'

export interface LayoutProps {
  variant?: 'common' | 'login'
  children?: ReactNode
}

const Layout = (props: LayoutProps): JSX.Element => {
  const { children, variant = 'common' } = props

  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    if (variant === 'common') {
      const jwt = localStorage.getItem('jwt')

      if (jwt) {
        dispatch(setAuth({ jwt }))
      } else {
        router.push('/login')
      }
    }
  }, [variant])

  return (
    <BaseThemeProvider>
      <Header />
      <Main>{children}</Main>
    </BaseThemeProvider>
  )
}

export default Layout
