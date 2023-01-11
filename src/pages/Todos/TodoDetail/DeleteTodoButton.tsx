import YesNoModal from 'modal/YesNoModal';
import { useNavigate } from 'react-router-dom';
import { deleteTodoApi } from 'api/todoApi';
import { useMutation } from 'react-query';
import { Todo } from 'api/todoApi';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';

interface Props {
  todo: Todo;
  setIsUpdate: (state: boolean) => void;
}

function DeleteTodoButton({ todo, setIsUpdate }: Props) {
  let authToken: string | null = localStorage.getItem('authtoken');
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

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

  useEffect(() => {
    return () => {
      authToken = null;
    };
  });

  const commitDelete = () => {
    todoDeleteMutation.mutate({
      authToken: authToken!,
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
