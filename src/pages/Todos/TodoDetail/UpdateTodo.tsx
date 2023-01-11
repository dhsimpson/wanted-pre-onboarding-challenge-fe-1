import { useEffect } from 'react';
import { Todo } from 'api/todoApi';
import { Box, Button, TextField } from '@mui/material';
import DeleteTodoButton from './DeleteTodoButton';
import UpdateTodoButton from './UpdateTodoButton';
import { useRecoilState } from 'recoil';
import { updateTodoState } from 'atom/todoDetail';
interface Props {
  todo: Todo;
}

function UpdateTodo({ todo }: Props) {
  let authToken: string | null = localStorage.getItem('authtoken');
  const [isUpdateTodo, setIsUpdateTodo] = useRecoilState(updateTodoState);

  useEffect(() => {
    return () => {
      authToken = null;
    };
  });

  return (
    <Box component="form" id="updateTodo">
      <TextField defaultValue={todo!.title} label="제목" name="title" />
      <TextField defaultValue={todo!.content} label="내용" name="content" />
      <UpdateTodoButton todo={todo} />
      <Button variant="contained" sx={{ mb: 2 }} onClick={() => setIsUpdateTodo(false)}>
        취소하기
      </Button>
      <DeleteTodoButton todo={todo} />
    </Box>
  );
}
export default UpdateTodo;
