/**
 * Created by vpotseluyko on 6/12/17.
 */



const {mysql} = require('./db');
const bot = require('./bot');


const init = async () => {
    try {
        console.log('here');
        const ids = await mysql.query('select * from data');
        console.log(ids);
        ids.forEach(async gui => {
            try {
                await bot.sendMessage(gui.chatid, "Хэй\nМне страшно представить, как вас задолбал спам от бота про резалты:)\n" +
                    "Больше такого не будет, бот переехал на сервер и материться, радуя Вас, больше просто так не будет\n" +
                    "Всем удачи)");
            } catch (err) {
                    console.log(err);
                    //await mysql.query('delete from data where ?', {id: gui.id});
            }
        });
    } catch (err) {
        console.log(err);
    }
};


module.exports = init;