import { useSetRecoilState } from 'recoil';
import { updateTodoState } from 'atom/todoDetail';
import { useEffect, useState } from 'react';
import { getFormInputData } from 'utils/formData';
import { Todo } from 'api/todoApi';
import useTodo from 'hooks/useTodo';
import { useUpdateTodoParams } from 'utils/createUseTodoParams';

const useUpdateTodo = (todo?: Todo) => {
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
  const handleClickOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    const t = e.target as HTMLFormElement;
    setFormRef(t.form);
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
