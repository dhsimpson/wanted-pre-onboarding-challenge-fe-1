import './App.css';
import { Routes, Route } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import Main from 'pages/main/Main';
import Auth from 'pages/Auth/Auth';
import Todos from 'pages/Todos/Todos';
import TodoDetail from 'pages/Todos/TodoDetail/TodoDetail';
import Navigation from 'component/nav/Navigation';

import customHistory from 'utils/history';
import CustomRouter from 'component/common/CustomRouter';
// import ErrorBoundary from 'component/common/ErrorBoundary';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      //   useErrorBoundary: true,
    },
  },
});

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        {/* TODO : 공통영역에 회원정보표기, 로그아웃 버튼을 위한 nav bar 추가 */}
        <CustomRouter history={customHistory}>
          <Navigation />
          <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="/auth" element={<Auth />}></Route>
            <Route path="/todos" element={<Todos />}>
              <Route path=":id" element={<TodoDetail />}></Route>
            </Route>
          </Routes>
        </CustomRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
