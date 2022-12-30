import { useRef } from 'react';
import { updateTodoApi, deleteTodoApi, Todo } from 'api/todoApi';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
interface Props {
  todo: Todo;
  setIsUpdate: (state: boolean) => void;
}

function UpdateTodo({ todo, setIsUpdate }: Props) {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLInputElement>(null);
  const authToken = localStorage.getItem('authtoken');

  const todoUpdateMutation = useMutation(updateTodoApi, {
    onSuccess: data => {
      alert('업데이트 완료!');
      setIsUpdate(false);
    },
    onError: e => {
      console.error(e);
      alert('업데이트 실패!');
    },
  });

  const navigate = useNavigate();

  const todoDeleteMutation = useMutation(deleteTodoApi, {
    onSuccess: data => {
      alert('삭제 완료!');
      setIsUpdate(false);
      navigate('/todos');
    },
    onError: e => {
      console.error(e);
      alert('삭제 실패!');
    },
  });

  return (
    <div>
      <input type="text" defaultValue={todo!.title} ref={titleRef} />
      <input type="text" defaultValue={todo!.content} ref={contentRef} />
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
      <button
        onClick={() => {
          todoDeleteMutation.mutate({
            authToken: authToken!,
            id: todo!.id,
          });
        }}
      >
        삭제하기
      </button>
    </div>
  );
}
export default UpdateTodo;
