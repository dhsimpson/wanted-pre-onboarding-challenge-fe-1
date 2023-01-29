import { SetterOrUpdater } from 'recoil';
import { NavigateFunction } from 'react-router-dom';
import { deleteTodoApi, updateTodoApi, Todo } from 'api/todoApi';
import { validateNewTodo } from 'utils/validate';

export const useDeleteTodoParams = (
  setIsUpdateTodo: SetterOrUpdater<boolean>,
  navigate: NavigateFunction,
  todo?: Todo,
) => {
  return {
    mutationApi: deleteTodoApi,
    onSuccess: () => {
      alert('삭제 완료!');
      setIsUpdateTodo(false);
      navigate('/todos');
    },
    onError: (e: unknown) => {
      console.error(e);
      alert('삭제 실패!');
    },
    commitMutationFunction: () => {
      return;
    },
    commitMutationParam: {
      id: todo!.id,
    },
  };
};

export const useUpdateTodoParams = (
  setIsUpdateTodo: SetterOrUpdater<boolean>,
  title: string,
  content: string,
  todo?: Todo,
) => {
  return {
    mutationApi: updateTodoApi,
    onSuccess: () => {
      alert('업데이트 완료!');
      setIsUpdateTodo(false);
    },
    onError: (e: unknown) => {
      console.error(e);
      alert('업데이트 실패!');
    },
    commitMutationFunction: () => {
      if (!validateNewTodo(title, '제목을 적어 주세요!')) {
        return;
      }
      if (!validateNewTodo(content, '내용을 적어 주세요!')) {
        return;
      }
    },
    commitMutationParam: {
      id: todo!.id,
      title,
      content,
    },
  };
};
