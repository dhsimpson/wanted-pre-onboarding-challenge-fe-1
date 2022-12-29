import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
      <div>
        상세 영역
        {/* 보기모드일 때 */}
        <div>선택된 Todo 보기</div>
        <button>수정모드</button>
        {/* 수정모드일 때, */}
        <button>수정내용 제출</button>
        <button>삭제</button>
      </div>
    </div>
  );
}
export default Todos;
