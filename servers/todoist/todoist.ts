import { TodoistApi } from '@doist/todoist-api-typescript';
import { FastifyPluginAsync } from 'fastify';

const todoistApi = new TodoistApi(process.env.TODOIST_TOKEN || '');

export const todoistRoutes: FastifyPluginAsync = async (fastify) => {
  // Получить все активные задачи
  fastify.get('/tasks', async () => {
    const tasks = await todoistApi.getTasks();
    return tasks;
  });

  // Получить только невыполненные (активные)
  fastify.get('/tasks/active', async () => {
    const tasks = await todoistApi.getTasks();
    return tasks.results.filter((task) => !task.checked);
  });

  // // Получить выполненные задачи (через completed items API)
  // fastify.get('/tasks/completed', async () => {
  //   const completed = await todoistApi.;
  //   return completed.items;
  // });

  // Пометить задачу как выполненную
  fastify.post('/tasks/:id/complete', async (request, reply) => {
    const { id } = request.params as { id: string };
    try {
      await todoistApi.closeTask(id);
      return { success: true, message: `Task ${id} marked as completed` };
    } catch (err) {
      fastify.log.error(err);
      reply
        .status(500)
        .send({ success: false, error: 'Failed to complete task' });
    }
  });
};
