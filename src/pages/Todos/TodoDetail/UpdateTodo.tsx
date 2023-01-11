import { useEffect } from 'react';
import { Todo } from 'api/todoApi';
import { Box, Button, TextField } from '@mui/material';
import DeleteTodoButton from './DeleteTodoButton';
import UpdateTodoButton from './UpdateTodoButton';
interface Props {
  todo: Todo;
  setIsUpdate: (state: boolean) => void;
}

function UpdateTodo({ todo, setIsUpdate }: Props) {
  let authToken: string | null = localStorage.getItem('authtoken');

  useEffect(() => {
    return () => {
      authToken = null;
    };
  });

  return (
    <Box component="form" id="updateTodo">
      <TextField defaultValue={todo!.title} label="제목" name="title" />
      <TextField defaultValue={todo!.content} label="내용" name="content" />
      <UpdateTodoButton todo={todo} setIsUpdate={setIsUpdate} />
      <Button variant="contained" sx={{ mb: 2 }} onClick={() => setIsUpdate(false)}>
        취소하기
      </Button>
      <DeleteTodoButton todo={todo} setIsUpdate={setIsUpdate} />
    </Box>
  );
}
export default UpdateTodo;
