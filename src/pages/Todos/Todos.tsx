import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

function Todos() {
  const navigate = useNavigate();
  const authToken = localStorage.getItem('authtoken');

  useEffect(() => {
    if (!authToken) {
      alert('로그인을 해주세요!'); // 이 alert가 두번 뜬다.... 왜 그럴까?
      navigate('/auth');
      return;
    }
  });

  // Todo 목록
  // 등록 버튼
  // 상세 클릭하면 route push
  return (
    <div>
      Todo 목록 화면입니다.
      <div>
        목록 영역
        <ul>
          {/* todo 클릭 시 상세영역 보기모드 open */}
          <li>todo1</li>
          <li>todo2</li>
        </ul>
        <button>추가버튼</button>
      </div>
      <Outlet></Outlet>
    </div>
  );
}
export default Todos;
