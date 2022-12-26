import { TextField, Button, Box, Grid } from '@mui/material';

function Auth() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
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
            <Button type="submit" fullWidth variant="contained" sx={{ mb: 2 }}>
              Log In
            </Button>
          </Grid>
          <Grid item xs>
            <Button type="submit" fullWidth variant="contained" sx={{ mb: 2 }}>
              Sign In
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
export default Auth;
