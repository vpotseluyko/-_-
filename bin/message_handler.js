/**
 * Created by vpotseluyko on 6/12/17.
 */

const bot = require('./bot');
const db = require('./db');
const redis = db.redis;
const {complete} = require('./telegram');


const validate_email = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email)) {
        throw new Error("Это не email");
    }
};


const message_handler = async (msg) => {
    try {
        if (msg.text[0] === '/') { // service tg message
            return;
        }
        const progress = await redis.get(msg.chat.id);
        const text = msg.text;
        switch (progress) {
            case "series":
                const validate_series = (text) => {
                    if (isNaN(parseInt(text)) || text.length !== 4 || parseInt(text) < 0) {
                        throw new Error("Серия паспорта - 4 цифры");
                    }
                };
                validate_series(text);
                await db.save_series(text, msg.chat.id);
                await redis.set(msg.chat.id, "number");
                await bot.sendMessage(msg.chat.id, "А номер?");
                break;
            case "number":
                const validate_number = (text) => {
                    if (isNaN(parseInt(text)) || text.length !== 6 || parseInt(text) < 0) {
                        throw new Error("Номер паспорта - 6 цифр");
                    }
                };
                validate_number(text);
                await db.save_number(text, msg.chat.id);
                await redis.set(msg.chat.id, "mail");
                await bot.sendMessage(msg.chat.id, "Отлично, " +
                    "теперь я отправлю тебе результаты, как только они появятся. " +
                    "Если ты хочешь, чтобы я отправил тебе письмо о появлении результатов ещё и на почту, " +
                    "скинь ответным сообщением свой email.\n" +
                    "Если нет - жми /complete\n");
                break;
            case "mail":
                validate_email(text);
                await db.save_email(text, msg.chat.id);
                await complete(msg);
                break;
            default:
                await bot.sendMessage(msg.chat.id, "Привет\n" +
                    "Я пока учусь, и не понимаю тебя. Может быть, это проблема.\n" +
                    "Напиши моему создателю: @vpotseluyko - он обязательно тебе поможет!\n" +
                    "Спасибо!");
                break;
        }
    } catch (err) {
        bot.sendMessage(msg.chat.id, err.message)
            .catch(console.log);
    }
};

module.exports = message_handler;