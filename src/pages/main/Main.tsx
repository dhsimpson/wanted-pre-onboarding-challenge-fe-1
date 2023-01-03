import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Main() {
  const navigate = useNavigate();
  let authToken: string | null = localStorage.getItem('authtoken');

  useEffect(() => {
    if (!authToken) {
      alert('로그인을 해주세요!');
      navigate('/auth');
      return;
    }
    return () => {
      authToken = null;
    };
  });

  return <div>Main 화면입니다.</div>;
}
export default Main;
