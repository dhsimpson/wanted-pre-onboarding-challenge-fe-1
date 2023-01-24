import YesNoModal from 'component/modal/YesNoModal';
import { useNavigate } from 'react-router-dom';
import { deleteTodoApi } from 'api/todoApi';
import { Todo } from 'api/todoApi';
import { useState } from 'react';
import Button from '@mui/material/Button';
import { useSetRecoilState } from 'recoil';
import { updateTodoState } from 'atom/todoDetail';
import useTodo from 'hooks/useTodo';

interface Props {
  todo?: Todo;
}

function DeleteTodoButton({ todo }: Props) {
  // 이 코드와 updateTodoButton 의 어떤 코드가 useTodo hooks 로 빼줄 수 있는 것인지 한참을 고민했다.
  // 함수 body 에 공통된 로직 중 hooks 로 빼줄 수 있는 부분이 굉장히 많았다!!
  // 내가 처음 볼 땐 나무만 봤는데, 숲을 보고 어떤 부분들을 hooks로 빼주면 될 지 알게 됐다.
  const setIsUpdateTodo = useSetRecoilState(updateTodoState);

  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();

  const [handleClickOpen, commitDelete, commitNothing] = useTodo(
    //c.f. 이거 파라미터들을 hooksParamGenerator.ts 같은 util 함수를 만들어주는 게 나으려나?
    (e: React.MouseEvent<HTMLButtonElement>) => {
      setOpenModal(true);
    },
    deleteTodoApi,
    () => {
      alert('삭제 완료!');
      setIsUpdateTodo(false);
      navigate('/todos');
    },
    (e: unknown) => {
      console.error(e);
      alert('삭제 실패!');
    },
    () => {
      return;
    },
    {
      id: todo!.id,
    },
    () => {
      return;
    },
  );

  return (
    <>
      <Button variant="contained" sx={{ mb: 2 }} onClick={handleClickOpen}>
        삭제하기
      </Button>
      <YesNoModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        message="정말로 삭제하시겠습니까?"
        clickYesCallback={commitDelete}
        clickNoCallback={commitNothing}
      />
    </>
  );
}

export default DeleteTodoButton;
