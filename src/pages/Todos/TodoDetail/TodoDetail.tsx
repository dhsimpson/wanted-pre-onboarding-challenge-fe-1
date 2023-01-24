import { useParams } from 'react-router-dom';
import { Suspense, lazy } from 'react';
const UpdateTodo = lazy(() => import('component/TodoDetail/UpdateTodo'));
const ShowTodo = lazy(() => import('component/TodoDetail/ShowTodo'));
import { Link } from 'react-router-dom';
import { Button, Divider } from '@mui/material';
import { updateTodoState } from 'atom/todoDetail';
import { useRecoilValue } from 'recoil';
import ErrorBoundary from 'component/common/ErrorBoundary';

function TodoDetail() {
  const { id } = useParams();
  const isUpdateTodo = useRecoilValue(updateTodoState);

  return (
    <div>
      <Divider sx={{ py: 2 }}>TODO 상세</Divider>
      <Link to="/todos" style={{ textDecoration: 'none' }}>
        <Button variant="contained" sx={{ mb: 2 }}>
          접기
        </Button>
      </Link>
      <ErrorBoundary>
        <Suspense fallback={<div>로딩중</div>}>
          {!isUpdateTodo ? <ShowTodo id={id}></ShowTodo> : <UpdateTodo id={id}></UpdateTodo>}
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default TodoDetail;
