import RefreshIcon from '@mui/icons-material/Refresh';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';

interface NetworkError extends Error {
  //이 타입과 같은 사전정의 된 타입은 없을까?? AxiosError 라는 타입은 탈락!
  error: {
    response?: AxiosResponse;
  };
}

function ErrorFallback(error: NetworkError) {
  const navigate = useNavigate();
  useEffect(() => {
    if (error?.error.response) {
      if (error?.error?.response?.status === 400) {
        navigate(-1);
      }
    }
  }, [error]);
  return <RefreshIcon></RefreshIcon>;
}

export default ErrorFallback;
