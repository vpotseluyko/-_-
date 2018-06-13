/**
 * Created by vpotseluyko on 6/12/17.
 */


const request = require('request');
const cheerio = require('cheerio');
const Iconv = require('iconv').Iconv;
const Buffer = require('buffer').Buffer;
const {promisify} = require('util');
const iconv = new Iconv('windows-1251', 'utf-8');
const utf8 = require('utf8');
const convert = require('./utf8');

request.post = promisify(request.post);

const send_request = async (series, number) => {
    try {

        const options = {
            url: "http://www.ege.spb.ru/result/index.php?mode=ege2018&wave=1",
            encoding: 'binary',
            form: {
                Series: series,
                Number: number,
                Login: "Показать результаты"
            }
        };

        const result = await request.post(options);
        result.body = new Buffer(result.body, 'binary');
        result.body = iconv.convert(result.body).toString();
        const $ = cheerio.load(result.body);
        const names = $('.exam-title');
        const exams = [];
        let i = 0;
        Object.keys(names).map(key => {
            const value = names[key];
            if (typeof value.children !== "undefined" && typeof value.children[0] !== "undefined") {
                exams[i] = {};
                exams[i++].name = convert(value.children[0].data);
            }
        });
        const results = $('.exam-result-z, .exam-result');
        let maxi = i;
        i = 0;
        Object.keys(results).map(key => {
            const value = results[key];
            if (i <= maxi && typeof value.children !== "undefined" && typeof value.children[0] !== "undefined") {
                exams[i++].result = convert(value.children[0].data);
            }
        });
        if (exams.length === 0) {
            exams.push(
                {
                    name: "Результатов",
                    result: "нет"
                }
            );
        }
        return exams;
    } catch (err) {
        console.log(err);
    }
};

module.exports = send_request;