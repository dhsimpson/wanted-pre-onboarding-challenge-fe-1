import { Box, TextField, Button } from '@mui/material';
import { useSetRecoilState } from 'recoil';
import { updateTodoState } from 'atom/todoDetail';
import useTodoDetail from 'hooks/useTodoDetail';

interface Props {
  id: string;
}

function ShowTodo({ id }: Props) {
  const setIsUpdateTodo = useSetRecoilState(updateTodoState);

  const { data } = useTodoDetail(id);
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
