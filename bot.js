require('dotenv').config();
const api = require('covid19-api');
const { Telegraf, Markup } = require('telegraf');
const countryList = require('./constant');

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((msg) =>
  msg.reply(
    `Доброго времени бытия ${msg.message.from.first_name}`,
    Markup.keyboard([
      ['US', 'Russia'],
      ['Belarus', 'Ukraine'],
    ])
  )
);
bot.help((msg) => msg.reply(countryList));
bot.on('sticker', (msg) => msg.reply('👍'));
bot.on('text', async (msg) => {
  try {
    const data = await api.getReportsByCountries(msg.message.text);
    const formatData = `
Страна: ${data[0][0].country}
Случаи: ${data[0][0].cases}
Смертей: ${data[0][0].deaths}
Вылечились: ${data[0][0].recovered}`;
    msg.reply(formatData);
  } catch (err) {
    msg.reply(msg.message.text);
  }
});
bot.hears('hi', (msg) => msg.reply('Hey there'));
bot.launch();
