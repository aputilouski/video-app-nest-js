import * as React from 'react';
import { Avatar, Button, TextField, Grid, Box, Typography, Container, Link as MaterialLink } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import api from '../../api';

const Copyright = props => (
  <Typography variant="body2" color="text.secondary" align="center" {...props}>
    {'Copyright © '}
    <Link color="inherit" href="https://mui.com/">
      Your Website
    </Link>{' '}
    {new Date().getFullYear()}
    {'.'}
  </Typography>
);

export default function SignUp() {
  const navigate = useNavigate();

  const { mutate, isLoading, isError, error } = useMutation(api.signUp, { onSuccess: () => navigate('/') });

  const onSubmit = React.useCallback(
    event => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const form = {
        fullname: formData.get('fname') + ' ' + formData.get('lname'),
        email: formData.get('email'),
        password: formData.get('password'),
      };
      mutate(form);
    },
    [mutate]
  );

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} />

        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>

        <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField //
                autoComplete="given-name"
                name="fname"
                required
                fullWidth
                id="fname"
                label="Fullname"
                autoFocus
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField //
                required
                fullWidth
                id="lname"
                label="Last Name"
                name="lname"
                autoComplete="family-name"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField //
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField //
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>

          {isError && (
            <Typography component="p" variant="p" color="red">
              {error?.response.data.message}
            </Typography>
          )}

          <Button //
            disabled={isLoading}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>

          <Box sx={{ textAlign: 'center' }}>
            <MaterialLink to="/" variant="body2" component={Link}>
              Already have an account? Sign In
            </MaterialLink>
          </Box>
        </Box>
      </Box>

      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
