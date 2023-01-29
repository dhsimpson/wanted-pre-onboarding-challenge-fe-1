import RefreshIcon from '@mui/icons-material/Refresh';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
interface NetworkError extends Error {
  //이 타입과 같은 사전정의 된 타입은 없을까?? AxiosError 라는 타입은 탈락!
  response: any;
  error: {
    response: {
      status: number;
    };
  };
}

function ErrorFallback(error: NetworkError) {
  const navigate = useNavigate();
  useEffect(() => {
    if (error.error.response.status === 400) {
      console.log('navigate!');
      navigate(-1);
    }
  }, [error]);
  return <RefreshIcon></RefreshIcon>;
}

export default ErrorFallback;
