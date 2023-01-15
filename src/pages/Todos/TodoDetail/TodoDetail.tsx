import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Todo, todoApi } from 'api/todoApi';
import { useEffect } from 'react';
import UpdateTodo from 'component/TodoDetail/UpdateTodo';
import ShowTodo from 'component/TodoDetail/ShowTodo';
import { Link } from 'react-router-dom';
import { Button, Divider } from '@mui/material';
import { updateTodoState } from 'atom/todoDetail';
import { useRecoilState } from 'recoil';

function TodoDetail() {
  const { id } = useParams();
  let authToken: string | null = localStorage.getItem('authtoken');

  const { data, isLoading, error } = useQuery(['todo', id], () => todoApi(authToken ?? '', id ?? ''));
  const [isUpdateTodo, setIsUpdateTodo] = useRecoilState(updateTodoState);

  let todo: Todo | undefined = data?.data?.data ?? undefined;

  useEffect(() => {
    return () => {
      authToken = null;
      todo = undefined;
    };
  });

  //TODO : error 시에 alert 및 뒤로가기
  return (
    <div>
      <Divider sx={{ py: 2 }}>TODO 상세</Divider>
      {isLoading && todo == undefined ? (
        <div>로딩중</div>
      ) : (
        <>
          <Link to="/todos" style={{ textDecoration: 'none' }}>
            <Button variant="contained" sx={{ mb: 2 }}>
              접기
            </Button>
          </Link>
          {!isUpdateTodo ? <ShowTodo todo={todo!}></ShowTodo> : <UpdateTodo todo={todo!}></UpdateTodo>}
        </>
      )}
    </div>
  );
}

export default TodoDetail;
