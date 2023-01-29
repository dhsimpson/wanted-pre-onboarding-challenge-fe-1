import { AxiosResponse } from 'axios';
import { useMutation } from 'react-query';

const useTodo = (
  mutationApi: (req: any) => Promise<AxiosResponse<any, any>>, // any vs Generic??
  onSuccess: () => void,
  onError: (e: unknown) => void,
  commitMutationFunction: () => void,
  commitMutationParam: any,
): [() => void] => {
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

  return [commitMutation];
};

export default useTodo;
