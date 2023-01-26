import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import AddTodo from 'component/TodoDetail/AddTodo';
import ErrorBoundary from 'component/common/ErrorBoundary';
import Error from 'component/common/Error';
const TodoList = lazy(() => import('component/Todos/TodoList'));

function Todos() {
  console.log('todos');

  return (
    <div>
      <div>
        목록 영역
        <ErrorBoundary fallback={Error}>
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
