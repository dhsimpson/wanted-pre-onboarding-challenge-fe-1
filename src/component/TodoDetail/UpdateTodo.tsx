import { Box, Button, TextField } from '@mui/material';
import DeleteTodoButton from './DeleteTodoButton';
import UpdateTodoButton from './UpdateTodoButton';
import { useSetRecoilState } from 'recoil';
import { updateTodoState } from 'atom/todoDetail';
import useTodoDetail from 'hooks/useTodoDetail';
import { useParams } from 'react-router-dom';

function UpdateTodo() {
  const setIsUpdateTodo = useSetRecoilState(updateTodoState);
  const { id } = useParams();
  const { data } = useTodoDetail(id as string);

  return (
    <Box component="form" id="updateTodo">
      <TextField defaultValue={data?.data?.data.title} label="제목" name="title" />
      <TextField defaultValue={data?.data?.data.content} label="내용" name="content" />
      <UpdateTodoButton todo={data?.data?.data} />
      <Button variant="contained" sx={{ mb: 2 }} onClick={() => setIsUpdateTodo(false)}>
        취소하기
      </Button>
      <DeleteTodoButton todo={data?.data?.data} />
    </Box>
  );
}
export default UpdateTodo;
