import axios from 'axios';

export interface Todo {
  title: string;
  content: string;
  id: string;
}
interface TodosResponse {
  data: {
    data: Array<Todo>;
  };
}

export const todosApi = (authToken: string) =>
  axios.get<any, TodosResponse>('http://localhost:8080/todos', { headers: { Authorization: authToken } });
