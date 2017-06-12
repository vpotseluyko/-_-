/**
 * Created by vpotseluyko on 6/12/17.
 */

const db = require('./db');
const mysql = db.mysql;
const redis = db.redis;
const request = require('./request');
const service = require('./telegram');


const minute_cron = async () => {
    try {
        const result = await mysql.query('select chatid, AES_DECRYPT(`series_enc`, \'' + db.key + '\') as series, ' +
            'AES_DECRYPT(`number_enc`, \'' + db.key + '\') as number, mail ' +
            ' from data');
        result.forEach(async (res) => {
            try {
                const exams = await request(res.series, res.number);
                const previous = await redis.get(res.chatid + '_res');
                if (exams.length !== +previous) {
                    console.log('send message to ' + res.chatid);
                    console.log(JSON.stringify(exams));
                    await service.notify(res.chatid, exams);
                    await redis.set(res.chatid + '_res', exams.length);
                }
            } catch (err) {
                throw err;
            }
        });
    } catch (err) {
        console.log(err);
    }
};

module.exports.minute = minute_cron;

const day_cron = async () => {
    try {
        await mysql.query("delete from data where series_enc is null or number_enc is null");
    } catch (err) {
        console.log(err);
    }
};


module.exports.day = day_cron;