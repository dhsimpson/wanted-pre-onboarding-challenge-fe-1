import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Todo, todoApi } from 'api/todoApi';
import { useState, useEffect } from 'react';
import UpdateTodo from './UpdateTodo';
import ShowTodo from './ShowTodo';
import { Link } from 'react-router-dom';
function TodoDetail() {
  const { id } = useParams();
  let authToken: string | null = localStorage.getItem('authtoken');

  const { data, isLoading, error } = useQuery(['todo', id], () => todoApi(authToken ?? '', id ?? ''));

  const [isUpdate, setIsUpdate] = useState(false);

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
      {isLoading && todo == undefined ? (
        <div>로딩중</div>
      ) : (
        <>
          <Link to="/todos">접기</Link>
          {!isUpdate ? (
            <ShowTodo todo={todo!} setIsUpdate={setIsUpdate}></ShowTodo>
          ) : (
            <UpdateTodo todo={todo!} setIsUpdate={setIsUpdate}></UpdateTodo>
          )}
        </>
      )}
    </div>
  );
}

export default TodoDetail;
