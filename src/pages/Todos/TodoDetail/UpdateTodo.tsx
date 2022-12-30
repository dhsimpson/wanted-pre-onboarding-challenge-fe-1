import { useRef } from 'react';
import { updateTodoApi, Todo } from '../../../api/todoApi';
import { useMutation } from 'react-query';

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
      console.log(data);
      alert('업데이트 완료!');
      setIsUpdate(false);
    },
    onError: e => {
      console.error(e);
      alert('업데이트 실패!');
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
    </div>
  );
}
export default UpdateTodo;
