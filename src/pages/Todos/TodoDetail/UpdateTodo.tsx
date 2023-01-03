import { useEffect } from 'react';
import { updateTodoApi, deleteTodoApi, Todo } from 'api/todoApi';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField } from '@mui/material';
interface Props {
  todo: Todo;
  setIsUpdate: (state: boolean) => void;
}

function UpdateTodo({ todo, setIsUpdate }: Props) {
  let authToken: string | null = localStorage.getItem('authtoken');

  const todoUpdateMutation = useMutation(updateTodoApi, {
    onSuccess: data => {
      alert('업데이트 완료!');
      setIsUpdate(false);
    },
    onError: e => {
      console.error(e);
      alert('업데이트 실패!');
    },
  });

  const navigate = useNavigate();

  const todoDeleteMutation = useMutation(deleteTodoApi, {
    onSuccess: data => {
      alert('삭제 완료!');
      setIsUpdate(false);
      navigate('/todos');
    },
    onError: e => {
      console.error(e);
      alert('삭제 실패!');
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const title = data.get('title')?.toString() ?? '';
    const content = data.get('content')?.toString() ?? '';

    if (title.length == 0) {
      alert('제목을 적어 주세요!');
      return;
    }

    if (content.length == 0) {
      alert('내용을 적어 주세요!');
      return;
    }
    todoUpdateMutation.mutate({
      authToken: authToken!,
      id: todo!.id,
      title,
      content,
    });
  };

  useEffect(() => {
    return () => {
      authToken = null;
    };
  });

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField defaultValue={todo!.title} label="제목" name="title" />
      <TextField defaultValue={todo!.content} label="내용" name="content" />
      <Button value="signUp" type="submit" variant="contained" sx={{ mb: 2, mr: 0.5 }}>
        수정완료
      </Button>
      <Button variant="contained" sx={{ mb: 2 }} onClick={() => setIsUpdate(false)}>
        취소하기
      </Button>
      <Button
        variant="contained"
        sx={{ mb: 2 }}
        onClick={() => {
          todoDeleteMutation.mutate({
            authToken: authToken!,
            id: todo!.id,
          });
        }}
      >
        삭제하기
      </Button>
    </Box>
  );
}
export default UpdateTodo;
