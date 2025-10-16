import type { Task } from '@doist/todoist-api-typescript';
import { makeAutoObservable, runInAction } from 'mobx';

import { todoistApi } from '../api/todoistApi.ts';

export class TodoistStore {
  tasks: Task[] = [];
  completedTasks: Task[] = [];
  loading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setError(error: string | null) {
    this.error = error;
  }

  setLoading(state: boolean) {
    this.loading = state;
  }

  async loadActive(withoutLoader: boolean = false) {
    !withoutLoader && this.setLoading(true);
    try {
      const tasks = await todoistApi.getActiveTasks();
      runInAction(() => {
        this.tasks = tasks;
      });
    } catch (err: any) {
      runInAction(() => this.setError(err.message));
    } finally {
      !withoutLoader && runInAction(() => this.setLoading(false));
    }
  }

  async loadCompleted() {
    this.setLoading(true);
    try {
      const tasks = await todoistApi.getCompletedTasks();
      runInAction(() => {
        this.completedTasks = tasks;
      });
    } catch (err: any) {
      runInAction(() => this.setError(err.message));
    } finally {
      runInAction(() => this.setLoading(false));
    }
  }

  async loadAll() {
    this.setLoading(true);
    try {
      const tasks = await todoistApi.getAllTasks();
      runInAction(() => {
        this.tasks = tasks;
      });
    } catch (err: any) {
      runInAction(() => this.setError(err.message));
    } finally {
      runInAction(() => this.setLoading(false));
    }
  }

  async completeTask(id: string) {
    try {
      this.tasks = this.tasks.map((task) =>
        task.id === id ? { ...task, checked: true } : task
      );
      await todoistApi.completeTask(id);
      await this.loadActive(true);
    } catch (err: any) {
      runInAction(() => this.setError(err.message));
    } finally {
      runInAction(() => this.setLoading(false));
    }
  }

  async addTask(payload: { content: string; dueString?: string }) {
    this.setLoading(true);
    try {
      const newTask = await todoistApi.createTask(payload);
      runInAction(() => {
        this.tasks.push(newTask);
      });
    } catch (err: any) {
      runInAction(() => this.setError(err.message));
    } finally {
      runInAction(() => this.setLoading(false));
    }
  }
}
