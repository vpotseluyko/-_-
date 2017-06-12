/**
 * Created by vpotseluyko on 6/12/17.
 */

const encode_utf8 = {
    "А": "&#x410;", "а": "&#x430;",
    "Б": "&#x411;", "б": "&#x431;",
    "В": "&#x412;", "в": "&#x432;",
    "Г": "&#x413;", "г": "&#x433;",
    "Д": "&#x414;", "д": "&#x434;",
    "Е": "&#x415;", "е": "&#x435;",
    "Ё": "&#x401;", "ё": "&#x451;",
    "Ж": "&#x416;", "ж": "&#x436;",
    "З": "&#x417;", "з": "&#x437;",
    "И": "&#x418;", "и": "&#x438;",
    "Й": "&#x419;", "й": "&#x439;",
    "К": "&#x41A;", "к": "&#x43A;",
    "Л": "&#x41B;", "л": "&#x43B;",
    "М": "&#x41C;", "м": "&#x43C;",
    "Н": "&#x41D;", "н": "&#x43D;",
    "О": "&#x41E;", "о": "&#x43E;",
    "П": "&#x41F;", "п": "&#x43F;",
    "Р": "&#x420;", "р": "&#x440;",
    "С": "&#x421;", "с": "&#x441;",
    "Т": "&#x422;", "т": "&#x442;",
    "У": "&#x423;", "у": "&#x443;",
    "Ф": "&#x424;", "ф": "&#x444;",
    "Х": "&#x425;", "х": "&#x445;",
    "Ц": "&#x426;", "ц": "&#x446;",
    "Ч": "&#x427;", "ч": "&#x447;",
    "Ш": "&#x428;", "ш": "&#x448;",
    "Щ": "&#x429;", "щ": "&#x449;",
    "Ъ": "&#x42A;", "ъ": "&#x44A;",
    "Ы": "&#x42B;", "ы": "&#x44B;",
    "Ь": "&#x42C;", "ь": "&#x44C;",
    "Э": "&#x42D;", "э": "&#x44D;",
    "Ю": "&#x42E;", "ю": "&#x44E;",
    "Я": "&#x42F;", "я": "&#x44F;",
};

String.prototype.replaceAll = function(search, replacement) {
    const target = this;
    return target.split(search).join(replacement);
};

const convert = (string) => {
    Object.keys(encode_utf8).map(key => {
        const value = encode_utf8[key];
        string = string.replaceAll(value, key);
    });
    string = string.replaceAll('\n', '');
    string = string.replaceAll('\t', '');
    return string;
};

module.exports = convert;