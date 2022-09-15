import * as React from 'react';
import { Avatar, AppBar, Box, Toolbar, Typography, Button, Modal, TextField, Paper } from '@mui/material';
import { useAuth } from '../ProvideAuth';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../api';

const Header = () => {
  const navigate = useNavigate();
  const [auth] = useAuth();

  const [open, setOpen] = React.useState(false);

  const queryClient = useQueryClient();

  const { mutate, isLoading, isError, error } = useMutation(api.createVideo, {
    onSuccess: () => {
      queryClient.invalidateQueries(['videos']);
      setOpen(false);
      navigate('/video');
    },
  });

  const onSubmit = React.useCallback(
    event => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      mutate(formData);
    },
    [mutate]
  );

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
          Streamly
        </Typography>

        {auth && (
          <>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>

            <Button variant="contained" onClick={() => setOpen(true)}>
              Add New
            </Button>

            <Modal open={open} onClose={() => setOpen(false)}>
              <Box component={Paper} maxWidth={600} py={5} px={3} mx="auto" mt={12}>
                <Box component="form" onSubmit={onSubmit}>
                  <label>Video Title:</label>
                  <TextField //
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    name="title"
                    autoFocus
                  />
                  <label>Select Video:</label>
                  <TextField //
                    margin="normal"
                    required
                    fullWidth
                    id="video"
                    name="video"
                    type="file"
                  />
                  <label>Select Cover Image:</label>
                  <TextField //
                    margin="normal"
                    required
                    fullWidth
                    name="cover"
                    type="file"
                    id="cover"
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
                    Upload
                  </Button>
                </Box>
              </Box>
            </Modal>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
