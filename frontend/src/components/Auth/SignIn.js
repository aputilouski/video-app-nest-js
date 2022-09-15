import React from 'react';
import { Avatar, Button, TextField, Box, Typography, Container, Link as MaterialLink } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import api from '../../api';
import { useAuth } from '../ProvideAuth';

const SignIn = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  const { mutate, isLoading, isError, error } = useMutation(api.signIn, {
    onSuccess: data => {
      setAuth(data.data);
      navigate('/video');
    },
  });

  const onSubmit = React.useCallback(
    event => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const form = {
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
          Sign In
        </Typography>

        <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
          <TextField //
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField //
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

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
            Sign In
          </Button>

          <Box sx={{ textAlign: 'center' }}>
            <MaterialLink to="signup" variant="body2" component={Link}>
              Don't have an account? Sign Up
            </MaterialLink>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default SignIn;
