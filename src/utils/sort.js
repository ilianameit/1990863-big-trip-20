
import dayjs from 'dayjs';
import { durationDates } from './point.js';

function sortPointsDay(pointA, pointB) {
  return dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
}

function sortPointsTime(pointA, pointB) {
  const durationA = durationDates(pointA.dateFrom, pointA.dateTo);
  const durationB = durationDates(pointB.dateFrom, pointB.dateTo);
  return durationB - durationA;
}

function sortPointsPrice(pointA, pointB) {
  return pointB.basePrice - pointA.basePrice;
}

export {
  sortPointsDay,
  sortPointsTime,
  sortPointsPrice,
};
