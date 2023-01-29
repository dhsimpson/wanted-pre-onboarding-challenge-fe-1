import { useParams } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { Button, Divider } from '@mui/material';
import { updateTodoState } from 'atom/todoDetail';
import { useRecoilValue } from 'recoil';
import ErrorBoundary from 'component/common/ErrorBoundary';
import ErrorFallback from 'component/common/ErrorFallback';
const ShowTodo = lazy(() => import('component/TodoDetail/ShowTodo'));
const UpdateTodo = lazy(() => import('component/TodoDetail/UpdateTodo'));

function TodoDetail() {
  const { id } = useParams();
  const isUpdateTodo = useRecoilValue(updateTodoState);
  // useParams 가 id 를 무조건 string | undefined 로 리턴 하므로 해당 조건문을 추가함.
  if (!id) {
    // path params 이기에 이 컴포넌트는 id 값이 있을 때에만 렌더링 된다.
    // 그러므로 사실 이 throw 도 무의미 하지 않을까.
    throw new Error('no id');
  }

  return (
    <div>
      <Divider sx={{ py: 2 }}>TODO 상세</Divider>
      <Link to="/todos" style={{ textDecoration: 'none' }}>
        <Button variant="contained" sx={{ mb: 2 }}>
          접기
        </Button>
      </Link>
      <ErrorBoundary fallback={ErrorFallback} id={id}>
        <Suspense fallback={<div>로딩중</div>}>{!isUpdateTodo ? <ShowTodo /> : <UpdateTodo />}</Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default TodoDetail;
