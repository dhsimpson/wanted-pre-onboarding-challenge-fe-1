import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import AddTodo from 'component/TodoDetail/AddTodo';
import ErrorBoundary from 'component/common/ErrorBoundary';
import Error from 'component/common/Error';
const TodoList = lazy(() => import('component/Todos/TodoList'));

function Todos() {
  return (
    <ErrorBoundary fallback={Error}>
      <div>
        <div>
          목록 영역
          <Suspense fallback={<div>로딩중</div>}>
            <TodoList />
          </Suspense>
          <AddTodo />
        </div>
        <Outlet></Outlet>
      </div>
    </ErrorBoundary>
  );
}
export default Todos;
