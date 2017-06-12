/**
 * Created by vpotseluyko on 6/12/17.
 */

const bot = require('./bot');

const db = require('./db');
const request = require('./request');
const mysql = db.mysql;
const redis = db.redis;

const start = async (msg) => {
    try {
        let message = "Привет!\n";
        message += "Я бот, который умеет проверять результаты ЕГЭ.\n\n";
        message += "Для того, чтобы проверять твои результаты, нам нужны номер и серия твоего паспорта." +
            " Все данные передаются по протоколу HTTPS, а у нас хранятся в зашифрованном виде, " +
            "поэтому можешь не волноваться — они в безопасности.\n" +
            "Так или иначе, используя этого бота ты даёшь полное согласие на обработку" +
            " и использование твоих данных";
        await bot.sendMessage(msg.chat.id, message);
        const result = await mysql.query('select * from data where ?', {chatid: msg.chat.id});
        if (result.length === 0) {
            await mysql.query('insert into data set chatid=?', msg.chat.id);
        }
        await redis.set(msg.chat.id, 'series');
        await bot.sendMessage(msg.chat.id, "Какая у тебя серия паспорта?");
    } catch (err) {
        console.log(err);
    }
};

module.exports.start = start;


const complete = async (msg) => {
    try {
        const result = await mysql.query('select AES_DECRYPT(`series_enc`, \'' + db.key + '\') as series, ' +
            'AES_DECRYPT(`number_enc`, \'' + db.key + '\') as number, mail ' +
            ' from data where ?', {chatid: msg.chat.id});
        let message = "Вот что я знаю о тебе:\n";
        message += "Серия паспорта - " + result[0].series + "\n";
        message += "Номер паспорта - " + result[0].number + "\n";
        message += (result[0].mail === null) ? "На почту результаты не отправлять"
            : "Написать о результатах на " + result[0].mail;
        message += "\nУдачи тебе!";
        message += "\nИсправить - /start\n" +
            "Рекомендую проверить, что все в порядке, проверив свои текущие результаты - /results";
        const results = await request(result[0].series, result[0].number);
        await redis.set(msg.chat.id + "_res", results.length);
        await redis.set(msg.chat.id, 'finish');
        await bot.sendMessage(msg.chat.id, message);
    } catch (err) {
        bot.sendMessage(bot.owner_id, JSON.stringify(err))
            .catch(console.log);
    }
};

module.exports.complete = complete;

const results = async (msg) => {
    try {
        bot.sendMessage(msg.chat.id, "Привет, я принял твой запрос. Пожалуйста, подожди");
        const result = await mysql.query('select AES_DECRYPT(`series_enc`, \'' + db.key + '\') as series, ' +
            'AES_DECRYPT(`number_enc`, \'' + db.key + '\') as number, mail ' +
            ' from data where ?', {chatid: msg.chat.id});
        const exams = await request(result[0].series, result[0].number);
        exams.forEach(item => {
            bot.sendMessage(msg.chat.id, item.name + ':  ' + item.result)
                .catch(console.log);
        });
    } catch (err) {
        bot.sendMessage(bot.owner_id, JSON.stringify(err))
            .catch(console.log);
    }
};

module.exports.results = results;

const notify = async (id, exams) => {
    try {
        await bot.sendMessage(id, "Привет, тут результаты появились. Сейчас отправлю.\n" +
            "Возможно, это ложное сообщение - не переживай, это было в первый и последний раз:)");
        exams.forEach(item => {
            bot.sendMessage(id, item.name + ':  ' + item.result)
                .catch(console.log);
        });
    } catch (err) {
        console.log(err);
    }
};

module.exports.notify = notify;