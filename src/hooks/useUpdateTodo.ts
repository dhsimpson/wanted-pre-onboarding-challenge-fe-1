import { useSetRecoilState } from 'recoil';
import { updateTodoState } from 'atom/todoDetail';
import { useState } from 'react';
import { Todo } from 'api/todoApi';
import useTodo from 'hooks/useTodo';
import { useUpdateTodoParams } from 'utils/createUseTodoParams';
import { UseFormHandleSubmit, FieldValues } from 'react-hook-form';

const useUpdateTodo = (todo: Todo | undefined, handleSubmit: UseFormHandleSubmit<FieldValues>) => {
  const setIsUpdateTodo = useSetRecoilState(updateTodoState);

  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleClickOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleSubmit(data => {
      setTitle(data.title);
      setContent(data.content);
    })();
    setOpenModal(true);
  };
  const { mutationApi, onSuccess, onError, commitMutationFunction, commitMutationParam } = useUpdateTodoParams(
    setIsUpdateTodo,
    title,
    content,
    todo,
  );
  const [commitUpdate] = useTodo(mutationApi, onSuccess, onError, commitMutationFunction, commitMutationParam);

  const commitNo = () => {
    return;
  };

  return [handleClickOpen, openModal, setOpenModal, commitUpdate, commitNo];
};

export default useUpdateTodo;
