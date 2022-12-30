import { useEffect, useState, useRef } from 'react';
import { useQuery, useMutation } from 'react-query';
import { Link } from 'react-router-dom';
import { Outlet, useNavigate } from 'react-router-dom';
import { Todo, todosApi, todoCreateApi } from 'api/todoApi';

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

  const { data, isLoading, error } = useQuery(['todos'], () => todosApi(authToken ?? ''));
  //TODO : error 시에 alert 및 뒤로가기

  const todoList: Todo[] = data?.data?.data ?? [];

  const [isAdd, setIsAdd] = useState(false);

  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLInputElement>(null);

  const todoCreateMutation = useMutation(todoCreateApi, {
    onSuccess: data => {
      alert('추가 완료!');
      setIsAdd(false);
    },
    onError: e => {
      console.error(e);
      alert('추가 실패!');
    },
  });

  // Todo 목록
  // 등록 버튼
  // 상세 클릭하면 route push
  return (
    <div>
      Todo 목록 화면입니다.
      <div>
        목록 영역
        {isLoading ? (
          <div>loading</div>
        ) : (
          <ul>
            {todoList.map((todo, idx) => (
              <li key={idx} style={{ display: 'flex' }}>
                <div>
                  <p>{todo.title}</p>
                  <p>{todo.content}</p>
                </div>
                <Link to={`${todo.id}`}>
                  <button>자세히보기</button>
                </Link>
              </li>
            ))}
          </ul>
        )}
        {isAdd ? (
          <>
            <input type="text" ref={titleRef} />
            <input type="text" ref={contentRef} />
            <button
              onClick={() => {
                const title = titleRef.current!.value;
                if (title.length == 0) {
                  alert('제목을 적어 주세요!');
                  return;
                }
                const content = contentRef.current!.value;

                if (content.length == 0) {
                  alert('내용을 적어 주세요!');
                  return;
                }

                todoCreateMutation.mutate({
                  authToken: authToken!,
                  title,
                  content,
                });
              }}
            >
              추가하기
            </button>
            <button onClick={() => setIsAdd(false)}>취소</button>
          </>
        ) : (
          <button onClick={() => setIsAdd(true)}>추가버튼</button>
        )}
      </div>
      <Outlet></Outlet>
    </div>
  );
}
export default Todos;
