import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import Main from 'pages/main/Main';
import Auth from 'pages/Auth/Auth';
import Todos from 'pages/Todos/Todos';
import TodoDetail from 'pages/Todos/TodoDetail/TodoDetail';
import Navigation from 'nav/Navigation';

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        {/* TODO : 공통영역에 회원정보표기, 로그아웃 버튼을 위한 nav bar 추가 */}
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="/auth" element={<Auth />}></Route>
            <Route path="/todos" element={<Todos />}>
              <Route path=":id" element={<TodoDetail />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
