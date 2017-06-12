const service = require('./bin/telegram');
const message_handler = require('./bin/message_handler');
const bot = require('./bin/bot');
const cron = require('./bin/cron');



try {
    bot.onText(/\/start/, service.start);
    bot.onText(/\/complete/, service.complete);
    bot.onText(/\/results/, service.results);
    bot.on('message', message_handler);
    setInterval(cron.minute, 60 * 1000);
    setInterval(cron.day, 24 * 60 * 60 * 1000);
} catch (err) {
    console.log(err);
}


