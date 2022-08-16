import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type State = {
  jwt?: string
  isAuth: boolean
  rememberJwt: boolean
}

export const initialState: State = {
  jwt: undefined,
  rememberJwt: false,
  isAuth: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setRememberJwt: (
      state,
      action: PayloadAction<{ rememberJwt: boolean }>
    ) => {
      state.rememberJwt = action.payload.rememberJwt
    },
    setAuth: (state, action: PayloadAction<{ jwt: string }>) => {
      state.jwt = action.payload.jwt
      state.isAuth = true
    },
    logout: (state) => {
      state.jwt = undefined
      state.isAuth = false
    },
  },
})

export const { setAuth, setRememberJwt, logout } = authSlice.actions

export default authSlice.reducer
