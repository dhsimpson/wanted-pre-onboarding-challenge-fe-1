import { TextField, Button, Box, Grid } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { useMutation } from 'react-query';

interface AuthMutationParams {
  email: string;
  password: string;
  url: string;
}
interface AuthMutationResponse {
  token: string;
  data: {
    token: string;
  };
}

const validate = (check: (str: string) => boolean, data: string, message: string) => {
  if (!check(data)) {
    alert(message);
    return false;
  }
  return true;
};

const checkEmail = (str: string) => (str.includes('@') && str.includes('.') ? true : false);

const checkPassword = (str: string) => str.length >= 8;

const authApi = (params: AuthMutationParams) =>
  axios.post<any, AuthMutationResponse>(`http://localhost:8080${params.url}`, {
    email: params.email,
    password: params.password,
  });

function Auth() {
  const [submitType, setSubmitType] = useState('');
  const authMutation = useMutation(authApi, {
    onSuccess: data => {
      localStorage.setItem('authtoken', data.data.token);
    },
    onError: e => {
      console.error(e);
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email')?.toString() ?? '';
    const password = data.get('password')?.toString() ?? '';
    if (!validate(checkEmail, email, '이메일 형식을 지켜주세요!')) {
      return;
    }
    if (!validate(checkPassword, password, '패스워드 형식을 지켜주세요!')) {
      return;
    }
    if (submitType === 'login') {
      authMutation.mutate({ email, password, url: '/users/login' });
      return;
    }
    if (submitType === 'signUp') {
      authMutation.mutate({ email, password, url: '/users/create' });
      return;
    }
  };

  //머테리얼 ui 참고 : https://github.com/mui/material-ui/blob/v5.11.0/docs/data/material/getting-started/templates/sign-in/SignIn.tsx
  return (
    <Box sx={{ maxWidth: 440 }}>
      <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs>
            <Button
              value="login"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mb: 2 }}
              onClick={() => setSubmitType('login')}
            >
              Log In
            </Button>
          </Grid>
          <Grid item xs>
            <Button
              value="signUp"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mb: 2 }}
              onClick={() => setSubmitType('signUp')}
            >
              Sign In
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
export default Auth;
