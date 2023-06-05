import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(duration);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const Format = {
  DATE : 'MMM DD',
  TIME : 'HH:mm',
  HTML_ATTR: 'YYYY-MM-DD',
  MONTH : 'MMM',
  DAY : 'D',
  EDIT_DATE : 'DD/MM/YY',
};

function humanizeDateFormat(format, date) {
  return date ? dayjs(date).format(format) : '';
}
function humanizeDate(date) {
  return humanizeDateFormat(Format.DATE, date);
}
function humanizeTime(date) {
  return humanizeDateFormat(Format.TIME, date);
}

function formatToHtmlAttr(date) {
  return humanizeDateFormat(Format.HTML_ATTR, date);
}

function humanizeEditTime(date) {
  return humanizeDateFormat(Format.EDIT_DATE, date);
}

function differenceTime(timeFrom, timeTo) {
  const xFrom = dayjs(timeFrom);
  const xTo = dayjs(timeTo);
  const dif = dayjs.duration(xTo.diff(xFrom)).$d;
  const countDay = dif.months || dif.years ? xTo.diff(xFrom, 'day') : dif.days;
  return (
    `${countDay ? `${countDay }D ` : ''}` +
    `${dif.hours ? `${dif.hours }H ` : '00H '}` +
    `${dif.minutes ? `${dif.minutes }M` : '00M'}`
  );
}

function returnOfferType(type, allOffers) {
  if (!type) {
    return allOffers;
  } else {
    return allOffers.find((offer) => offer.type === type).offers;
  }
}

function returnCurrentOffers(type, arrayCurrentOffers, offers) {
  const typeObj = returnOfferType(type, offers);
  const currentOffers = typeObj.filter((offer) =>
    arrayCurrentOffers.includes(offer.id)
  );
  return currentOffers;
}

function getAllDestinations(destinations) {
  return destinations.map(({name}) => name);
}

function returnDestination(idDestination, allDestinations) {
  if (!idDestination) {
    return '';
  } else {
    return allDestinations.find(({id}) => id === idDestination);
  }
}

function isPointFuture(dateFrom) {
  return dayjs(dateFrom).isAfter(dayjs());
}

function isPointPresent(dateFrom, dateTo) {
  const isFromBefore = dayjs(dateFrom).isSameOrBefore(dayjs());
  const isToAfter = dayjs(dateTo).isSameOrAfter(dayjs());
  return (isFromBefore && isToAfter === true);
}

function isPointPast(dateTo) {
  return dayjs(dateTo).isBefore(dayjs());
}

function calculatePrice(points, allOffers) {
  return points.reduce((accumulator, point) => {
    const offersCurrent = returnCurrentOffers(point.type, point.offers, allOffers);
    const prices = offersCurrent.reduce((accumulatorPrice, {price}) => accumulatorPrice + price, 0);

    return accumulator + point.basePrice + prices;
  }, 0);
}

function returnUniqDestinations(points, destinations) {
  const uniqDestinations = new Set();
  points.map(({destination}) => uniqDestinations.add(returnDestination(destination, destinations).name));
  return Array.from(uniqDestinations.keys());
}

function durationDates(dateA, dateB) {
  return dayjs.duration(dayjs(dateB).diff(dayjs(dateA))).$ms;
}

export {
  Format,
  humanizeDateFormat,
  humanizeDate,
  humanizeTime,
  formatToHtmlAttr,
  differenceTime,
  returnOfferType,
  returnCurrentOffers,
  getAllDestinations,
  humanizeEditTime,
  returnDestination,
  isPointFuture,
  isPointPresent,
  isPointPast,
  calculatePrice,
  returnUniqDestinations,
  durationDates
};
