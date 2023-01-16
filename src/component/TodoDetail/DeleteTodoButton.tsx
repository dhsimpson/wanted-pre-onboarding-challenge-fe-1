import YesNoModal from 'component/modal/YesNoModal';
import { useNavigate } from 'react-router-dom';
import { deleteTodoApi } from 'api/todoApi';
import { useMutation } from 'react-query';
import { Todo } from 'api/todoApi';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { useSetRecoilState } from 'recoil';
import { updateTodoState } from 'atom/todoDetail';

interface Props {
  todo: Todo;
}

function DeleteTodoButton({ todo }: Props) {
  let authToken: string | null = localStorage.getItem('authtoken');
  const setIsUpdateTodo = useSetRecoilState(updateTodoState);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const navigate = useNavigate();

  const todoDeleteMutation = useMutation(deleteTodoApi, {
    onSuccess: data => {
      alert('삭제 완료!');
      setIsUpdateTodo(false);
      navigate('/todos');
    },
    onError: e => {
      console.error(e);
      alert('삭제 실패!');
    },
  });

  useEffect(() => {
    return () => {
      authToken = null;
    };
  });

  const commitDelete = () => {
    todoDeleteMutation.mutate({
      id: todo!.id,
    });
  };

  const commitNothing = () => {
    return;
  };

  return (
    <>
      <Button variant="contained" sx={{ mb: 2 }} onClick={handleClickOpen}>
        삭제하기
      </Button>
      <YesNoModal
        open={open}
        setOpen={setOpen}
        message="정말로 삭제하시겠습니까?"
        clickYesCallback={commitDelete}
        clickNoCallback={commitNothing}
      />
    </>
  );
}

export default DeleteTodoButton;
