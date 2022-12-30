import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { Todo, todoApi, updateTodoApi } from '../../../api/todoApi';
import { useRef, useState } from 'react';
function TodoDetail() {
  const { id } = useParams();
  const authToken = localStorage.getItem('authtoken');

  const { data, isLoading, error } = useQuery(['todo', id], () => todoApi(authToken ?? '', id ?? ''));

  const [isUpdate, setIsUpdate] = useState(false);

  const todo: Todo | undefined = data?.data?.data ?? undefined;
  //todo 추가하기
  //   useMutation()

  //TODO : 수정하기 영역은 컴포넌트화 하고 수정 useMutate 하는 코드도 같이 컴포넌트화
  //   interface

  //todo 수정하기
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLInputElement>(null);

  const todoUpdateMutation = useMutation(updateTodoApi, {
    onSuccess: data => {
      console.log(data);
      alert('업데이트 완료!');
    },
    onError: e => {
      console.error(e);
      alert('업데이트 실패!');
    },
  });

  //TODO : error 시에 alert 및 뒤로가기
  return (
    <div>
      {isLoading && todo == undefined ? (
        <div>로딩중</div>
      ) : (
        <>
          {!isUpdate ? (
            <div>
              <p>{todo!.title}</p>
              <p>{todo!.content}</p>
              <button onClick={() => setIsUpdate(true)}>수정하기</button>
            </div>
          ) : (
            <div>
              <input type="text" defaultValue={todo!.title} ref={titleRef} />
              <input type="text" defaultValue={todo!.content} ref={contentRef} />
              수정모드
              <button
                onClick={() => {
                  todoUpdateMutation.mutate({
                    authToken: authToken!,
                    id: todo!.id,
                    title: titleRef.current!.value,
                    content: contentRef.current!.value,
                  });
                }}
              >
                수정완료
              </button>
              <button onClick={() => setIsUpdate(false)}>취소하기</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default TodoDetail;
