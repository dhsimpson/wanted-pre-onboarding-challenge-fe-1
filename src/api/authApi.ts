import axios from 'axios';

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

export const authApi = (params: AuthMutationParams) =>
  axios.post<any, AuthMutationResponse>(`http://localhost:8080${params.url}`, {
    email: params.email,
    password: params.password,
  });
