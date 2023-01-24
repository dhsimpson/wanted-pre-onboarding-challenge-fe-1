import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { Outlet } from 'react-router-dom';
import { Todo, todosApi } from 'api/todoApi';
import AddTodo from 'component/TodoDetail/AddTodo';
import TodoItem from 'component/TodoDetail/TodoItem';
import { List } from '@mui/material';
import { queryDefaultCacheOptions } from 'consts/time';

function Todos() {
  const { data, isLoading, error } = useQuery(['todos'], () => todosApi(), queryDefaultCacheOptions);
  //TODO : error 시에 alert 및 뒤로가기

  let todoList: Todo[] = data?.data?.data ?? [];

  useEffect(() => {
    return () => {
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
