import { AxiosResponse } from 'axios';
import { useMutation } from 'react-query';

const useTodo = (
  handleClickOpen: (e: React.MouseEvent<HTMLButtonElement>) => void,
  mutationApi: (req: any) => Promise<AxiosResponse<any, any>>, // any vs Generic??
  onSuccess: () => void,
  onError: (e: unknown) => void,
  commitMutationFunction: () => void,
  commitMutationParam: any,
  commitNothing: () => void,
): [(e: React.MouseEvent<HTMLButtonElement>) => void, () => void, () => void] => {
  const todoMutation = useMutation(mutationApi, {
    onSuccess: data => {
      onSuccess();
    },
    onError: e => {
      onError(e);
    },
  });

  const commitMutation = () => {
    commitMutationFunction();
    todoMutation.mutate(commitMutationParam);
  };

  return [handleClickOpen, commitMutation, commitNothing];
};

export default useTodo;
