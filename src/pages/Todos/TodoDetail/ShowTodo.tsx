import { Todo } from 'api/todoApi';

interface Props {
  todo: Todo;
  setIsUpdate: (state: boolean) => void;
}

function ShowTodo({ todo, setIsUpdate }: Props) {
  return (
    <div>
      <p>{todo!.title}</p>
      <p>{todo!.content}</p>
      <button onClick={() => setIsUpdate(true)}>수정하기</button>
    </div>
  );
}
export default ShowTodo;
