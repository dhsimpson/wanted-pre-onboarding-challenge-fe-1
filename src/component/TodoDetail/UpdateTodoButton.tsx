import YesNoModal from 'component/modal/YesNoModal';
import { Button } from '@mui/material';
import { Todo } from 'api/todoApi';
import useUpdateTodo from 'hooks/useUpdateTodo';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  todo?: Todo;
}

function UpdateTodoButton({ todo }: Props) {
  const [handleClickOpen, openModal, setOpenModal, commitUpdate, commitNo] = useUpdateTodo(todo);
  return (
    <>
      <Button
        onClick={handleClickOpen as (e: React.MouseEvent<HTMLButtonElement>) => void}
        form="updateTodo"
        value="signUp"
        variant="contained"
        sx={{ mb: 2, mr: 0.5 }}
      >
        수정완료
      </Button>
      <YesNoModal
        openModal={openModal as boolean}
        setOpenModal={setOpenModal as Dispatch<SetStateAction<boolean>>}
        message="정말로 수정하시겠습니까?"
        clickYesCallback={commitUpdate as () => void}
        clickNoCallback={commitNo as () => void}
      />
    </>
  );
}

export default UpdateTodoButton;
