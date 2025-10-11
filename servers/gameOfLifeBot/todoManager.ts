import { v4 as uuidv4 } from 'uuid';

import { dbManager } from './dbManager.ts';

class TodoManager {
  createTodo(title: string, description: string) {
    const todos = dbManager.getData('todos') || [];

    todos.push({
      title,
      description,
      status: 'New',
      id: uuidv4(),
    });

    dbManager.setData('todos', todos);
  }

  getAllTodos() {
    return dbManager.getData('todos');
  }

  markAsCompleted(title: string) {
    //Implemitation
  }
}

export const todoManager = new TodoManager();
