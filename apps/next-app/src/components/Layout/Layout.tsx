import { ReactNode, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import BaseThemeProvider from './BaseThemeProvider'
import Header from './Header'
import Main from './Main'
import { setAuth } from '@/redux/features/auth/authSlice'
import { RootState } from '@/redux/store'
import api from '@/api'

export interface LayoutProps {
  variant?: 'common' | 'login'
  children?: ReactNode
}

const Layout = (props: LayoutProps): JSX.Element => {
  const { children, variant = 'common' } = props

  const jwt = useSelector((state: RootState) => state.auth.jwt)
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    if (jwt !== undefined) {
      api.setJwt(jwt)
    }
  }, [jwt])

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
