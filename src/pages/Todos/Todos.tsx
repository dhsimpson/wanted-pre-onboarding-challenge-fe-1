import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { Outlet, useNavigate } from 'react-router-dom';
import { Todo, todosApi } from 'api/todoApi';
import AddTodo from './TodoDetail/AddTodo';
import TodoItem from './TodoDetail/TodoItem';

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
              <TodoItem todo={todo} key={idx}></TodoItem>
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
