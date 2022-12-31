import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { Todo, todosApi } from 'api/todoApi';
import AddTodo from './TodoDetail/AddTodo';
import TodoItem from './TodoDetail/TodoItem';
import { Button, List } from '@mui/material';

function Todos() {
  const navigate = useNavigate();
  let authToken: string | null = localStorage.getItem('authtoken');

  const { data, isLoading, error } = useQuery(['todos'], () => todosApi(authToken ?? ''));
  //TODO : error 시에 alert 및 뒤로가기

  let todoList: Todo[] = data?.data?.data ?? [];

  useEffect(() => {
    if (!authToken) {
      alert('로그인을 해주세요!'); // 이 alert가 두번 뜬다.... 왜 그럴까?
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
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Button variant="contained" sx={{ mb: 2 }}>
          Main화면으로 돌아가기
        </Button>
      </Link>
      <div>
        목록 영역
        {isLoading ? (
          <div>loading</div>
        ) : (
          <List>
            {todoList.map((todo, idx) => (
              <TodoItem todo={todo} key={idx}></TodoItem>
            ))}
          </List>
        )}
        <AddTodo />
      </div>
      <Outlet></Outlet>
    </div>
  );
}
export default Todos;
