import { ReactNode, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { setAuth } from '@/redux/features/auth/authSlice'
import { RootState } from '@/redux/store'
import api from '@/api'
import Header from './Header'
import Main from './Main'

export interface LayoutProps {
  variant?: 'common' | 'login'
  children?: ReactNode
}

export default function Layout(props: LayoutProps) {
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
    <>
      <Header />
      <Main>{children}</Main>
    </>
  )
}
