import YesNoModal from 'component/modal/YesNoModal';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { updateTodoApi, Todo } from 'api/todoApi';
import { useSetRecoilState } from 'recoil';
import { updateTodoState } from 'atom/todoDetail';
import { validateNewTodo } from 'utils/validate';
import { getFormInputData } from 'utils/formData';
import useTodo from 'hooks/useTodo';

interface Props {
  todo?: Todo;
}

function UpdateTodoButton({ todo }: Props) {
  const setIsUpdateTodo = useSetRecoilState(updateTodoState);

  const [openModal, setOpenModal] = useState(false);
  const [formRef, setFormRef] = useState({} as HTMLFormElement);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (formRef instanceof HTMLFormElement) {
      const data = new FormData(formRef as HTMLFormElement);

      setTitle(getFormInputData(data, 'title'));
      setContent(getFormInputData(data, 'content'));
    }
  }, [formRef, title, content]);

  const [handleClickOpen, commitUpdate, commitNothing] = useTodo(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const t = e.target as HTMLFormElement;
      setFormRef(t.form);
      setOpenModal(true);
    },
    updateTodoApi,
    () => {
      alert('업데이트 완료!');
      setIsUpdateTodo(false);
    },
    (e: unknown) => {
      console.error(e);
      alert('업데이트 실패!');
    },
    () => {
      if (!validateNewTodo(title, '제목을 적어 주세요!')) {
        return;
      }
      if (!validateNewTodo(content, '내용을 적어 주세요!')) {
        return;
      }
    },
    {
      id: todo!.id,
      title,
      content,
    },
    () => {
      return;
    },
  );

  return (
    <>
      <Button onClick={handleClickOpen} form="updateTodo" value="signUp" variant="contained" sx={{ mb: 2, mr: 0.5 }}>
        수정완료
      </Button>
      <YesNoModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        message="정말로 수정하시겠습니까?"
        clickYesCallback={commitUpdate}
        clickNoCallback={commitNothing}
      />
    </>
  );
}

export default UpdateTodoButton;
