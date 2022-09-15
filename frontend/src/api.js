import axios from 'axios';

// const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
const API_ENDPOINT = 'http://localhost:3002';

axios.defaults.baseURL = API_ENDPOINT;

axios.interceptors.response.use(
  response => {
    if (response.data.message) console.log(response.data.message);
    return response;
  },
  error => {
    let message = 'A Problem has occurred please try later.';
    if (error.response?.data) {
      const dataType = typeof error.response.data;
      if (dataType === 'string') message = error.response.data;
      else if (dataType === 'object') message = error.response.data.message;
    }
    console.error(message);
    throw error;
  }
);

const api = {
  API_ENDPOINT,
  signIn: form => axios.post('/api/v1/user/signin', form),
  signUp: form => axios.post('/api/v1/user/signup', form),
  getVideos: () => axios.get('/api/v1/video').then(res => res.data),
  getVideo: id => axios.get(`/api/v1/video?id=${id}`).then(res => res.data),
  createVideo: form => axios.post('/api/v1/video', form),
};

export default api;
