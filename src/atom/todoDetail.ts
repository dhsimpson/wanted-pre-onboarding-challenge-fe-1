import { atom } from 'recoil';

const updateTodoState = atom({
  key: 'updateTodoState',
  default: false,
});

export { updateTodoState };
