import { SetterOrUpdater } from 'recoil';
import { NavigateFunction } from 'react-router-dom';
import { deleteTodoApi } from 'api/todoApi';
import { Todo } from 'api/todoApi';

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
