import { useEffect, useState, useRef } from 'react';
import { useQuery, useMutation } from 'react-query';
import { Link } from 'react-router-dom';
import { Outlet, useNavigate } from 'react-router-dom';
import { Todo, todosApi, todoCreateApi } from 'api/todoApi';
import AddTodo from './TodoDetail/AddTodo';

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
        <AddTodo />
      </div>
      <Outlet></Outlet>
    </div>
  );
}
export default Todos;
