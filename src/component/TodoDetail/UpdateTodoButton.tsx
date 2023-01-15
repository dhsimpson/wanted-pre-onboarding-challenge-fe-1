import YesNoModal from 'component/modal/YesNoModal';
import { useMutation } from 'react-query';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { updateTodoApi, Todo } from 'api/todoApi';
import { useRecoilState } from 'recoil';
import { updateTodoState } from 'atom/todoDetail';

interface Props {
  todo: Todo;
}

function UpdateTodoButton({ todo }: Props) {
  let authToken: string | null = localStorage.getItem('authtoken');
  const [isUpdateTodo, setIsUpdateTodo] = useRecoilState(updateTodoState);

  const [open, setOpen] = useState(false);
  const [formRef, setFormRef] = useState({} as HTMLFormElement);

  const handleClickOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    const t = e.target as HTMLFormElement;
    setFormRef(t.form);
    setOpen(true);
  };

  useEffect(() => {
    return () => {
      authToken = null;
    };
  });

  const todoUpdateMutation = useMutation(updateTodoApi, {
    onSuccess: data => {
      alert('업데이트 완료!');
      setIsUpdateTodo(false);
    },
    onError: e => {
      console.error(e);
      alert('업데이트 실패!');
    },
  });

  const commitUpdate = () => {
    const data = new FormData(formRef as HTMLFormElement);

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

  const commitNothing = () => {
    return;
  };

  return (
    <>
      <Button onClick={handleClickOpen} form="updateTodo" value="signUp" variant="contained" sx={{ mb: 2, mr: 0.5 }}>
        수정완료
      </Button>
      <YesNoModal
        open={open}
        setOpen={setOpen}
        message="정말로 수정하시겠습니까?"
        clickYesCallback={commitUpdate}
        clickNoCallback={commitNothing}
      />
    </>
  );
}

export default UpdateTodoButton;