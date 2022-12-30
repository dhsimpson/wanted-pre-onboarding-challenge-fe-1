import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Todo, todoApi } from '../../../api/todoApi';
import { useState } from 'react';
function TodoDetail() {
  const { id } = useParams();
  const authToken = localStorage.getItem('authtoken');

  const { data, isLoading, error } = useQuery(['todo', id], () => todoApi(authToken ?? '', id ?? ''));

  const [isModify, setIsModify] = useState(false);

  const todo: Todo | undefined = data?.data?.data ?? undefined;

  //TODO : error 시에 alert 및 뒤로가기
  return (
    <div>
      {isLoading && todo != undefined ? (
        <div>로딩중</div>
      ) : (
        <>
          {!isModify ? (
            <div>
              <p>{todo!.title}</p>
              <p>{todo!.content}</p>
              <button onClick={() => setIsModify(true)}>수정하기</button>
            </div>
          ) : (
            <div>
              수정모드
              <button onClick={() => setIsModify(false)}>수정완료</button>
              <button onClick={() => setIsModify(false)}>취소하기</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default TodoDetail;
