import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import { useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import { setAuth, setRememberJwt } from '@/redux/features/auth';
import { RootState } from '@/redux/store';
import { useLoginMutation } from '@/redux/services/auth';

interface LoginFormFieldData {
  username: string;
  password: string;
}

export default function LoginPaper() {
  const [formError, setFormError] = useState('');
  const rememberMe = useSelector((state: RootState) => state.auth.rememberJwt);
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormFieldData>();

  const hadleCheckRememberMe: CheckboxProps['onChange'] = (e) => {
    dispatch(setRememberJwt({ rememberJwt: e.target.checked }));
  };

  const [login] = useLoginMutation();

  const handleLogin = async (data: LoginFormFieldData) => {
    try {
      const res = await login({
        username: data.username,
        password: data.password,
      }).unwrap();

      dispatch(setAuth({ jwt: res.accessToken }));
      router.push('/admin');
    } catch (error) {
      const err = error as AxiosError;

      console.error(err);
      setFormError('something went wrong.');
      return error;
    }
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit(handleLogin)}
      elevation={2}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 4,
      }}
    >
      <Box
        sx={{
          margin: 'auto',
          textAlign: 'center',
          fontWeight: 'bold',
        }}
      >
        Login
      </Box>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            gap: 2,
            flexDirection: 'column',
          }}
        >
          <Typography
            sx={{
              'color': 'red',
              'textAlign': 'center',
              'fontSize': '0.875rem',
              '&:empty': {
                height: '1.5em',
              },
            }}
          >
            {formError}
          </Typography>
          <TextField
            required
            id="username"
            label="Username"
            type="username"
            defaultValue=""
            variant="standard"
            helperText={errors.username?.message}
            {...register('username', { required: true })}
          />
          <TextField
            required
            id="password"
            label="Password"
            type="password"
            defaultValue=""
            variant="standard"
            helperText={errors.password?.message}
            {...register('password', { required: true })}
          />
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={rememberMe}
                onChange={hadleCheckRememberMe}
              />
            }
            label="remember me"
          />
        </Box>
      </Box>
      <Button
        variant="contained"
        sx={{
          width: '350px',
          fontWeight: 'bold',
        }}
        type="submit"
      >
        Login
      </Button>
    </Paper>
  );
}
