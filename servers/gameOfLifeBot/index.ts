import 'dotenv/config';

import { Markup, Telegraf } from 'telegraf';

import { logger } from './logger.ts';
import { todoManager } from './todoManager.ts';

const bot = new Telegraf(process.env.BOT_TOKEN || '');
logger.info('Bot started');
// Состояние пользователей
const userStates = new Map<
  number,
  { step: 'title' | 'description' | null; title?: string }
>();

bot.start((ctx) => {
  ctx.reply(
    'Привет! Что хочешь сделать?',
    Markup.keyboard([['Создать TODO'], ['Посмотреть все TODO']]).resize()
  );
});

// ====== Создание TODO ======
bot.hears('Создать TODO', (ctx) => {
  userStates.set(ctx.from.id, { step: 'title' });
  ctx.reply('Отправь заголовок для TODO');
});

bot.on('text', (ctx) => {
  const state = userStates.get(ctx.from.id);
  if (!state) return;

  if (state.step === 'title') {
    state.title = ctx.message.text;
    state.step = 'description';
    ctx.reply('Теперь отправь описание для TODO');
    return;
  }

  if (state.step === 'description') {
    const { title } = state;
    const description = ctx.message.text;
    todoManager.createTodo(title!, description);
    userStates.delete(ctx.from.id);
    ctx.reply(
      '✅ TODO создан!',
      Markup.keyboard([['Создать TODO'], ['Посмотреть все TODO']]).resize()
    );
  }
});

// ====== Просмотр всех TODO ======
bot.hears('Посмотреть все TODO', (ctx) => {
  const todos = todoManager.getAllTodos();
  logger.info(todos);

  if (todos.length === 0) {
    ctx.reply('Список TODO пуст 🌚');
    return;
  }

  todos.forEach((todo) => {
    const text = `📝 <b>${todo.title}</b>\n${todo.description}\nСтатус: <i>${todo.status}</i>`;
    const buttons = [];

    if (todo.status === 'New') {
      buttons.push(
        Markup.button.callback('✅ Завершить', `complete_${todo.id}`)
      );
    }

    ctx.replyWithHTML(text, Markup.inlineKeyboard(buttons));
  });
});

// ====== Завершение TODO ======
bot.action(/complete_(.+)/, (ctx) => {
  const id = ctx.match[1];
  todoManager.markAsCompleted(id);
  ctx.answerCbQuery('Завершено!');
  ctx.editMessageText('✅ TODO завершено!');
});

// ====== Запуск ======
bot.launch();
logger.info('Bot started');
