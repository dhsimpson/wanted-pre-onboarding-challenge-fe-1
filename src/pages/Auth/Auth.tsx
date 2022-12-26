import { TextField, Button, Box, Grid } from '@mui/material';
import { useState } from 'react';

function Auth() {
  const [submitType, setSubmitType] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log(submitType);
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });
    // submitType 에 따라 분기처리 (이제부턴 react-query를 이용)
    // react-query 이용해서, 쿼리 결과에 따라 토큰값 들어 오면 루트 화면으로 이동.
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
