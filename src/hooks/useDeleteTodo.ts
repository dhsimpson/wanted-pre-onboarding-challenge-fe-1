import { updateTodoState } from 'atom/todoDetail';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import useTodo from 'hooks/useTodo';
import { Todo } from 'api/todoApi';
import { useState } from 'react';
import { useDeleteTodoParams } from 'utils/createUseTodoParams';

const useDeleteTodo = (todo?: Todo) => {
  const setIsUpdateTodo = useSetRecoilState(updateTodoState);
  const [openModal, setOpenModal] = useState(false);
  const handleClickOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOpenModal(true);
  };

  const navigate = useNavigate();
  const { mutationApi, onSuccess, onError, commitMutationFunction, commitMutationParam } = useDeleteTodoParams(
    setIsUpdateTodo,
    navigate,
    todo,
  );
  const [commitDelete] = useTodo(mutationApi, onSuccess, onError, commitMutationFunction, commitMutationParam);

  const commitNo = () => {
    return;
  };

  return [handleClickOpen, openModal, setOpenModal, commitDelete, commitNo];
};
export default useDeleteTodo;
