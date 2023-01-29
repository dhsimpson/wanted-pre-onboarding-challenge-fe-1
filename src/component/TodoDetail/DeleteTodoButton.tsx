import YesNoModal from 'component/modal/YesNoModal';
import { Todo } from 'api/todoApi';
import { Dispatch, SetStateAction } from 'react';
import Button from '@mui/material/Button';
import useDeleteTodo from 'hooks/useDeleteTodo';

interface Props {
  todo?: Todo;
}

function DeleteTodoButton({ todo }: Props) {
  const [handleClickOpen, openModal, setOpenModal, commitDelete, commitNo] = useDeleteTodo(todo);

  return (
    <>
      <Button
        variant="contained"
        sx={{ mb: 2 }}
        onClick={handleClickOpen as (e: React.MouseEvent<HTMLButtonElement>) => void}
      >
        삭제하기
      </Button>
      <YesNoModal
        openModal={openModal as boolean}
        setOpenModal={setOpenModal as Dispatch<SetStateAction<boolean>>}
        message="정말로 삭제하시겠습니까?"
        clickYesCallback={commitDelete as () => void}
        clickNoCallback={commitNo as () => void}
      />
    </>
  );
}

export default DeleteTodoButton;
