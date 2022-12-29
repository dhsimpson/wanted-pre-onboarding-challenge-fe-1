import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Todo, todoApi } from '../../../api/todoApi';
function TodoDetail() {
  const { id } = useParams();
  const authToken = localStorage.getItem('authtoken');

  const { data, isLoading, error } = useQuery(['todo', id], () => todoApi(authToken ?? '', id ?? ''));

  const todo: Todo | undefined = data?.data?.data ?? undefined;
  console.log(todo);
  //TODO : error 시에 alert 및 뒤로가기
  return (
    <div>
      {isLoading && todo != undefined ? (
        <div>로딩중</div>
      ) : (
        <>
          <div>
            <p>{todo!.title}</p>
            <p>{todo!.content}</p>
          </div>
          {/* 보기모드일 때 */}
          <div>선택된 Todo 보기</div>
          <button>수정모드</button>
          {/* 수정모드일 때 */}
          <button>수정내용 제출</button>
          <button>삭제</button>
        </>
      )}
    </div>
  );
}

export default TodoDetail;
