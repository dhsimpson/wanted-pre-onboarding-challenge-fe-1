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
  title: string;
  content: string;
}
export interface UpdateTodoRequest {
  id: string;
  title: string;
  content: string;
}

interface DeleteTodoRequest {
  id: string;
}

export const todosApi = () => axiosClient.get<any, TodosResponse>('/todos');

export const todoApi = (id: string) => axiosClient.get<any, TodoResponse>(`/todos/${id}`);

export const todoCreateApi = (req: CreateTodoRequest) =>
  axiosClient.post(`/todos`, {
    title: req.title,
    content: req.content,
  });

export const updateTodoApi = (req: UpdateTodoRequest) =>
  axiosClient.put(`/todos/${req.id}`, {
    title: req.title,
    content: req.content,
  });

export const deleteTodoApi = (req: DeleteTodoRequest) => axiosClient.delete(`/todos/${req.id}`);
