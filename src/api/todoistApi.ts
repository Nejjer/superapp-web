import type { Task } from '@doist/todoist-api-typescript';

import { axiosInstance } from './axiosInstance.ts'; // axios instance

export class TodoistApi {
  /** Получить все активные задачи */
  public async getActiveTasks(): Promise<Task[]> {
    return (await axiosInstance.get<Task[]>('todo/tasks/active')).data;
  }

  /** Получить все выполненные задачи */
  public async getCompletedTasks(): Promise<Task[]> {
    return (await axiosInstance.get<Task[]>('todo/tasks/completed')).data;
  }

  /** Получить все задачи (активные + возможно завершённые) */
  public async getAllTasks(): Promise<Task[]> {
    return (await axiosInstance.get<Task[]>('todo/tasks')).data;
  }

  /** Пометить задачу выполненной */
  public async completeTask(id: string): Promise<void> {
    await axiosInstance.post(`todo/tasks/${id}/complete`);
  }

  /** Создать новую задачу */
  public async createTask(payload: {
    content: string;
    dueString?: string;
  }): Promise<Task> {
    return (await axiosInstance.post<Task>('todo/tasks', payload)).data;
  }
}

export const todoistApi = new TodoistApi();
