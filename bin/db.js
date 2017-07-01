/**
 * Created by vpotseluyko on 6/8/17.
 */


const mysql_constructor = require('mysql');
const {promisify} = require('util');
const key = ';qZ5[Kj7N4g%cu/g';
const redis = require('redis');
const client = redis.createClient();



const mysql = mysql_constructor.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user     : 'bot_user',
    password : '123456',
    database: "bot_user",
    multipleStatements: true
});


mysql.query = promisify(mysql.query);


client.set = promisify(client.set);
client.get = promisify(client.get);


const save_series = async (text, id) => {
    try {
        await mysql.query('update data set series_enc=AES_ENCRYPT(?, \'' + key + '\') where chatid=?', [text, id]);
    } catch (err) {
        throw err;
    }
};
const save_number = async (text, id) => {
    try {
        await mysql.query('update data set number_enc=AES_ENCRYPT(?, \'' + key + '\') where chatid=?', [text, id]);
    } catch (err) {
        throw err;
    }
};
const save_email = async (text, id) => {
    try {
        await mysql.query('update data set mail=? where chatid=?', [text, id]);
    } catch (err) {
        throw err;
    }
};


module.exports.mysql = mysql;
module.exports.redis = client;

module.exports.save_series = save_series;
module.exports.save_number = save_number;
module.exports.save_email = save_email;

module.exports.key = key;