// Import the framework and instantiate it
import * as path from 'node:path';

import fastifyCors from '@fastify/cors';
import { fastifyStatic } from '@fastify/static';
import Fastify from 'fastify';
import storage from 'node-persist';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fastify = Fastify({
  logger: true,
});

fastify.register(fastifyCors);
fastify.register(fastifyStatic, {
  root: path.join(__dirname, '../dist'),
  prefix: '/app',
});

storage.init({});
// Declare a route
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
