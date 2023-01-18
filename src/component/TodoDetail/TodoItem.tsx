import { Todo } from 'api/todoApi';
import { Link } from 'react-router-dom';
import { Box, Button, ListItem, TextField } from '@mui/material';

interface Props {
  todo: Todo;
}

function TodoItem({ todo }: Props) {
  return (
    <ListItem>
      <Box>
        <TextField disabled label="제목" multiline rows={1} value={todo.title} />
        <TextField disabled label="내용" multiline rows={3} value={todo.content} />
      </Box>
      <Link to={`${todo.id}`} style={{ textDecoration: 'none' }}>
        <Button variant="contained" sx={{ mb: 2 }}>
          자세히보기
        </Button>
      </Link>
    </ListItem>
  );
}
export default TodoItem;
