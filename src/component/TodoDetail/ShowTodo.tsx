import { Box, TextField, Button } from '@mui/material';
import { useSetRecoilState } from 'recoil';
import { updateTodoState } from 'atom/todoDetail';
import useTodoDetail from 'hooks/useTodoDetail';
import { useParams } from 'react-router-dom';

function ShowTodo() {
  const { id } = useParams();
  const { data } = useTodoDetail(id as string);
  const setIsUpdateTodo = useSetRecoilState(updateTodoState);

  return (
    <Box>
      <TextField disabled label="제목" multiline rows={1} value={data?.data?.data.title} />
      <TextField disabled label="내용" multiline rows={3} value={data?.data?.data.content} />
      <Button variant="contained" sx={{ mb: 2 }} onClick={() => setIsUpdateTodo(true)}>
        수정하기
      </Button>
    </Box>
  );
}
export default ShowTodo;
