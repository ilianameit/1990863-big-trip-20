import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const DATE_FORMAT = 'MMM DD';
const TIME_FORMAT = 'HH:mm';
const DATE_HTML_ATTR = 'YYYY-MM-DD';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}
function getRandomPrice() {
  return Math.floor(Math.random() * 100);
}

function humanizeDateFormat(format, date) {
  return date ? dayjs(date).format(format) : '';
}
function humanizeDate(date){
  return humanizeDateFormat(DATE_FORMAT, date);
}
function humanizeTime(date){
  return humanizeDateFormat(TIME_FORMAT, date);
}

function formatToHtmlAttr(date){
  return humanizeDateFormat(DATE_HTML_ATTR, date);
}


export {getRandomArrayElement, getRandomPrice, humanizeDate, humanizeTime, formatToHtmlAttr};
