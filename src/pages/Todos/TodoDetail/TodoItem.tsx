import { Todo } from 'api/todoApi';
import { Link } from 'react-router-dom';

interface Props {
  todo: Todo;
}

function TodoItem({ todo }: Props) {
  return (
    <li style={{ display: 'flex' }}>
      <div>
        <p>{todo.title}</p>
        <p>{todo.content}</p>
      </div>
      <Link to={`${todo.id}`}>
        <button>자세히보기</button>
      </Link>
    </li>
  );
}
export default TodoItem;
