import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ProvideAuth, AuthController } from './components/ProvideAuth';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import Header from './components/Navbar/Header';
import VideoList from './components/Video/VideoList';
import Video from './components/Video/Video';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const theme = createTheme();

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <QueryClientProvider client={queryClient}>
      <ProvideAuth>
        <BrowserRouter>
          <Header />

          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/video" element={<AuthController />}>
              <Route index element={<VideoList />} />
              <Route path=":id" element={<Video />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ProvideAuth>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
