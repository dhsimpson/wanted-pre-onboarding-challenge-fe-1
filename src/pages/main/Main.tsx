import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Main() {
  const navigate = useNavigate();
  const authToken = localStorage.getItem('authtoken');
  useEffect(() => {
    if (!authToken) {
      console.log('oh no!!');
      alert('로그인을 해주세요!'); // 이 alert가 두번 뜬다.... 왜 그럴까?
      //TODO : 토큰으로 로그인 실행하고 토큰 유효 여부 판단 및 login 페이지 리다이렉트
      navigate('/auth');
      return;
    }
  });

  return <div>Main 화면입니다.</div>;
}
export default Main;
