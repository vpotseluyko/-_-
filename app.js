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

const {mysql} = require('./bin/db');

mysql.query('select * from data')
    .then((res) => {
        res.forEach(async item => {
            const message = "Добрый вечер!\nВ 00:00 субд будет очищена. " +
                "Убедиться в этом Вы сможете по неработающему боту. " +
                "Других гарантий дать не могу физически. \n---" +
                "Спасибо за сервер - @kbsx32 . Без него проект был бы невозможен\n" +
                "Всем удачи, пусть Ваши мечты сбудутся\n" +
                "@vpotseluyko";
            await bot.sendMessage(item.chatid, message);
        })
    })
    .catch(console.log);
