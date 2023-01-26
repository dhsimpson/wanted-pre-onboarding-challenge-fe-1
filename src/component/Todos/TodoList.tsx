import { useQuery } from 'react-query';
import { Todo, todosApi } from 'api/todoApi';
import { queryDefaultCacheOptions } from 'consts/time';
import { List } from '@mui/material';
import TodoItem from 'component/TodoDetail/TodoItem';

function TodoList() {
  const { data } = useQuery(['todos'], () => todosApi(), { ...queryDefaultCacheOptions, retry: 1 });
  const todoList: Todo[] = data?.data?.data ?? [];
  return (
    <>
      {todoList.map((todo, idx) => (
        <List key={idx}>
          <TodoItem todo={todo}></TodoItem>
        </List>
      ))}
    </>
  );
}

export default TodoList;
