import { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import { todoCreateApi } from 'api/todoApi';
import { Box, Button, TextField, Divider } from '@mui/material';

function AddTodo() {
  let authToken: string | null = localStorage.getItem('authtoken');

  const [isAdd, setIsAdd] = useState(false);

  const todoCreateMutation = useMutation(todoCreateApi, {
    onSuccess: data => {
      alert('추가 완료!');
      setIsAdd(false);
    },
    onError: e => {
      console.error(e);
      alert('추가 실패!');
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
    todoCreateMutation.mutate({
      authToken: authToken!,
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
    <>
      <Divider sx={{ py: 2 }}>새로운 TODO 추가</Divider>
      {isAdd ? (
        <Box component="form" onSubmit={handleSubmit}>
          <TextField label="제목" name="title" />
          <TextField label="내용" name="content" />
          <Button type="submit" variant="contained" sx={{ mb: 2, mr: 0.5 }}>
            추가하기
          </Button>
          <Button variant="contained" sx={{ mb: 2 }} onClick={() => setIsAdd(false)}>
            취소
          </Button>
        </Box>
      ) : (
        <Button onClick={() => setIsAdd(true)} variant="contained" sx={{ mb: 2 }}>
          추가버튼
        </Button>
      )}
    </>
  );
}
export default AddTodo;
