-- phpMyAdmin SQL Dump
-- version 4.6.6
-- https://www.phpmyadmin.net/
--
-- Хост: localhost
-- Время создания: Июн 12 2017 г., 18:48
-- Версия сервера: 5.7.18
-- Версия PHP: 7.0.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `bot_user`
--

-- --------------------------------------------------------

--
-- Структура таблицы `data`
--

CREATE TABLE `data` (
  `id` int(11) NOT NULL,
  `chatid` int(20) NOT NULL,
  `mail` text,
  `series_enc` varbinary(200) DEFAULT NULL,
  `number_enc` varbinary(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `data`
--

INSERT INTO `data` (`id`, `chatid`, `mail`, `series_enc`, `number_enc`) VALUES
(140, 155078683, 'vyacheslav.potseluyko@gmail.com', 0x9d5908765328ad74e8e0d331407f1256, 0x08fc8861a34fe974d6100bfb2ce30948),
(145, 144245345, NULL, 0x9d5908765328ad74e8e0d331407f1256, 0x7f8b7375129fdfd2431871abdd362060),
(146, 162331117, NULL, 0x9d5908765328ad74e8e0d331407f1256, 0xcb6350c3ad0f3e2dd7e79bc398ce51f1),
(147, 107245509, NULL, 0xca9256ee27d7c84bdbaaa39db5158801, 0x0958f8d1e0b2cbc22f5e264d9c23608b),
(148, 319691552, NULL, 0xca9256ee27d7c84bdbaaa39db5158801, 0xb9e62dfde6d17ad710ece4e0c942c758),
(149, 267701195, NULL, 0x9d5908765328ad74e8e0d331407f1256, 0x20f64c529fa17af89498ae5bda83887a),
(150, 177616049, NULL, 0x9d5908765328ad74e8e0d331407f1256, 0x506d738d9ae4dbcad19e03fc14e600a8),
(151, 31391851, NULL, 0x875b82afd3c5b9114f861b6f84cfd702, 0x9628f219101125e276147f6d24687246),
(152, 28175077, NULL, NULL, NULL),
(153, 154486254, NULL, NULL, NULL),
(154, 70410657, 'katerina1106@gmail.com', 0x9d5908765328ad74e8e0d331407f1256, 0x341271140a0aa711f885571646b19e16),
(155, 309615507, NULL, 0xc37d5dc5bd36c37822166075b3712c31, 0xf27fc5f045c586eb0913d3f324a753dd);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `data`
--
ALTER TABLE `data`
  ADD UNIQUE KEY `id_3` (`id`),
  ADD KEY `id` (`id`),
  ADD KEY `id_2` (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `data`
--
ALTER TABLE `data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=156;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
