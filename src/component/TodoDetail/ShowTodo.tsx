import { Box, TextField, Button } from '@mui/material';
import { Todo } from 'api/todoApi';
import { useSetRecoilState } from 'recoil';
import { updateTodoState } from 'atom/todoDetail';

interface Props {
  todo: Todo;
}

function ShowTodo({ todo }: Props) {
  const setIsUpdateTodo = useSetRecoilState(updateTodoState);

  return (
    <Box>
      <TextField disabled label="제목" multiline rows={1} value={todo!.title} />
      <TextField disabled label="내용" multiline rows={3} value={todo!.content} />
      <Button variant="contained" sx={{ mb: 2 }} onClick={() => setIsUpdateTodo(true)}>
        수정하기
      </Button>
    </Box>
  );
}
export default ShowTodo;
