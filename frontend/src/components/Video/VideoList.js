import * as React from 'react';
import { Container, Typography, Card, CardActionArea, CardContent, CardMedia, Grid, LinearProgress, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../../api';

export default function VideoList() {
  const { data: videos, isError, error, isLoading } = useQuery(['videos'], api.getVideos);
  const navigate = useNavigate();
  return (
    <Container>
      <Grid container spacing={2} marginTop={2}>
        {isLoading && (
          <Box width={1}>
            <LinearProgress color="secondary" />
          </Box>
        )}

        {isError && (
          <Typography component="p" variant="p" color="red">
            {error?.response.data.message}
          </Typography>
        )}

        {videos?.map(video => (
          <Grid item xs={12} md={4} key={video._id}>
            <Card>
              <CardActionArea onClick={() => navigate(`/video/${video._id}`)}>
                <CardContent sx={{ flex: 1 }}>
                  <Typography component="h2" variant="h5">
                    {video.title}
                  </Typography>

                  <Typography variant="subtitle2" color="secondary">
                    {video.uploadDate}
                  </Typography>
                </CardContent>

                <CardMedia //
                  component="img"
                  sx={{ width: '100%', maxHeight: 200, display: { xs: 'none', sm: 'block' }, margin: '0 auto' }}
                  image={`/${video.coverImage}`}
                  alt="alt"
                />
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
