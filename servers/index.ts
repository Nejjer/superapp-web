import fastifyCors from '@fastify/cors';
import fastifyStatic from '@fastify/static';
import Fastify from 'fastify';
import storage from 'node-persist';
import path from 'path';

import { todoistRoutes } from './todoist/todoist.js';

const fastify = Fastify({
  logger: true,
});

fastify.register(fastifyCors);
fastify.register(fastifyStatic, {
  root: path.join(import.meta.dirname, '../../dist'),
  maxAge: '30d',
  immutable: true,
});
fastify.get('/', function (req, reply) {
  // index.html should never be cached
  reply.sendFile('index.html', { maxAge: 0, immutable: false });
});
// ⚡️ Обработка всех маршрутов SPA (fallback на index.html)
fastify.setNotFoundHandler((req, reply) => {
  if (req.raw.url?.startsWith('/api')) {
    // Если у тебя есть API, не надо отдавать index.html
    reply.status(404).send({ error: 'Not Found' });
  } else {
    reply.sendFile('index.html', {
      maxAge: 0,
      immutable: false,
    });
  }
});
storage.init({});

// Declare a route
fastify.register(todoistRoutes, { prefix: '/todo' });

fastify.post('/planByTagId', async function handler(request) {
  await storage.setItem('planByTagId', JSON.stringify(request.body));
  return;
});
fastify.get('/planByTagId', async function handler() {
  return (await storage.getItem('planByTagId')) || {};
});

fastify.post('/categorizedTagIds', async function handler(request) {
  await storage.setItem('categorizedTagIds', JSON.stringify(request.body));
  return;
});
fastify.get('/categorizedTagIds', async function handler() {
  return (await storage.getItem('categorizedTagIds')) || {};
});

fastify.post('/podushka', async function handler(request) {
  await storage.setItem('podushka', JSON.stringify(request.body));
  return;
});
fastify.get('/podushka', async function handler(_, reply) {
  return reply.send(await storage.getItem('podushka'));
});

// Run the server!
try {
  await fastify.listen({ port: 5000, host: '0.0.0.0' });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
