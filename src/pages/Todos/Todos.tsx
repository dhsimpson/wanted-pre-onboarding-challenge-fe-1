import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { Outlet, useNavigate } from 'react-router-dom';
import { Todo, todosApi } from 'api/todoApi';
import AddTodo from 'component/TodoDetail/AddTodo';
import TodoItem from 'component/TodoDetail/TodoItem';
import { List } from '@mui/material';

function Todos() {
  const navigate = useNavigate();
  let authToken: string | null = localStorage.getItem('authtoken');

  const { data, isLoading, error } = useQuery(['todos'], () => todosApi(authToken ?? ''));
  //TODO : error 시에 alert 및 뒤로가기

  let todoList: Todo[] = data?.data?.data ?? [];

  useEffect(() => {
    if (!authToken) {
      alert('로그인을 해주세요!');
      navigate('/auth');
      return;
    }
    return () => {
      authToken = null;
      todoList = [];
    };
  }, [todoList]);

  return (
    <div>
      <div>
        목록 영역
        {isLoading ? (
          <div>loading</div>
        ) : (
          <>
            {todoList.map((todo, idx) => (
              <List key={idx}>
                <TodoItem todo={todo}></TodoItem>
              </List>
            ))}
          </>
        )}
        <AddTodo />
      </div>
      <Outlet></Outlet>
    </div>
  );
}
export default Todos;
