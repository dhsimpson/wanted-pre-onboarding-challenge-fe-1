import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Todo, todoApi } from 'api/todoApi';
import { useState } from 'react';
import UpdateTodo from './UpdateTodo';
import ShowTodo from './ShowTodo';
function TodoDetail() {
  const { id } = useParams();
  const authToken = localStorage.getItem('authtoken');

  const { data, isLoading, error } = useQuery(['todo', id], () => todoApi(authToken ?? '', id ?? ''));

  const [isUpdate, setIsUpdate] = useState(false);

  const todo: Todo | undefined = data?.data?.data ?? undefined;
  //todo 추가하기 기능
  //   useMutation()

  //TODO : error 시에 alert 및 뒤로가기
  return (
    <div>
      {isLoading && todo == undefined ? (
        <div>로딩중</div>
      ) : (
        <>
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
