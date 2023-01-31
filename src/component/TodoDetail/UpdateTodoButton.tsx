import YesNoModal from 'component/modal/YesNoModal';
import { Button } from '@mui/material';
import useUpdateTodo from 'hooks/useUpdateTodo';
import { Dispatch, SetStateAction } from 'react';
import { UseFormHandleSubmit, FieldValues } from 'react-hook-form';
import { Todo } from 'api/todoApi';

interface Props {
  todo?: Todo;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
}

function UpdateTodoButton({ todo, handleSubmit }: Props) {
  const [handleClickOpen, openModal, setOpenModal, commitUpdate, commitNo] = useUpdateTodo(todo, handleSubmit);

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
