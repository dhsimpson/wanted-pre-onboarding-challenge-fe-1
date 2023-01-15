import axios from 'axios';
import axiosClient from 'utils/axiosClient';
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

interface TodoResponse {
  data: {
    data: Todo;
  };
}

interface CreateTodoRequest {
  authToken: string;
  title: string;
  content: string;
}
export interface UpdateTodoRequest {
  authToken: string;
  id: string;
  title: string;
  content: string;
}

interface DeleteTodoRequest {
  authToken: string;
  id: string;
}

export const todosApi = (authToken: string) => axiosClient.get<any, TodosResponse>('/todos');

export const todoApi = (authToken: string, id: string) =>
  axios.get<any, TodoResponse>(`http://localhost:8080/todos/${id}`, { headers: { Authorization: authToken } });

export const todoCreateApi = (req: CreateTodoRequest) =>
  axios.post(
    `http://localhost:8080/todos`,
    {
      title: req.title,
      content: req.content,
    },
    { headers: { Authorization: req.authToken } },
  );

export const updateTodoApi = (req: UpdateTodoRequest) =>
  axios.put(
    `http://localhost:8080/todos/${req.id}`,
    {
      title: req.title,
      content: req.content,
    },
    { headers: { Authorization: req.authToken } },
  );

export const deleteTodoApi = (req: DeleteTodoRequest) =>
  axios.delete(`http://localhost:8080/todos/${req.id}`, { headers: { Authorization: req.authToken } });
