import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import AddTodo from 'component/TodoDetail/AddTodo';
import ErrorBoundary from 'component/common/ErrorBoundary';
const TodoList = lazy(() => import('component/Todos/TodoList'));

function Todos() {
  return (
    <div>
      <div>
        목록 영역
        <ErrorBoundary>
          <Suspense fallback={<div>로딩중</div>}>
            <TodoList />
          </Suspense>
          <AddTodo />
        </ErrorBoundary>
      </div>
      <Outlet></Outlet>
    </div>
  );
}
export default Todos;
