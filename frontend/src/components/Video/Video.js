import * as React from 'react';
import { Typography, Container, Grid, Box, LinearProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../../api';

export default function VideoList() {
  const { id } = useParams();
  const { data: video, isError, error, isLoading } = useQuery([`video-${id}`], () => api.getVideo(id));
  return (
    <Container>
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

      {video && (
        <>
          <Box marginTop={2}>
            <video autoPlay controls width="100%">
              <source src={`/api/v1/video/${id}`} type="video/mp4" />
            </video>
          </Box>

          <Grid container spacing={2} marginTop={2}>
            <Grid item xs={12} md={12}>
              <Typography variant="h5">{video.title}</Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" color="primary">
                Created by:{video.createdBy.fullname}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" color="primary">
                Created: {video.uploadDate}
              </Typography>
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
}
