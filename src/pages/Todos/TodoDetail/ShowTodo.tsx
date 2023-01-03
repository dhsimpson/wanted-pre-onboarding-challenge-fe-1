import { Box, TextField, Button } from '@mui/material';
import { Todo } from 'api/todoApi';

interface Props {
  todo: Todo;
  setIsUpdate: (state: boolean) => void;
}

function ShowTodo({ todo, setIsUpdate }: Props) {
  return (
    <Box>
      <TextField disabled label="제목" multiline rows={1} value={todo!.title} />
      <TextField disabled label="내용" multiline rows={3} value={todo!.content} />
      <Button variant="contained" sx={{ mb: 2 }} onClick={() => setIsUpdate(true)}>
        수정하기
      </Button>
    </Box>
  );
}
export default ShowTodo;
