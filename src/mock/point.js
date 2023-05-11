import {getRandomArrayElement, getRandomPrice} from '../utils.js';
import { destination } from './destination.js';

const points = [
  {
    id: '01',
    basePrice: getRandomPrice(),
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: getRandomArrayElement(destination).id,
    isFavorite: false,
    offers: [1,2],
    type: 'taxi'
  },
  {
    id: '02',
    basePrice: getRandomPrice(),
    dateFrom: '2020-05-10T22:55:56.845Z',
    dateTo: '2020-06-11T11:22:13.375Z',
    destination: getRandomArrayElement(destination).id,
    isFavorite: true,
    offers: [2,4],
    type: 'bus'
  },
  {
    id: '03',
    basePrice: getRandomPrice(),
    dateFrom: '2020-03-01T10:00:00.845Z',
    dateTo: '2026-03-01T11:30:13.375Z',
    destination: getRandomArrayElement(destination).id,
    isFavorite: true,
    offers: [2,4],
    type: 'bus'
  },
  {
    id: '04',
    basePrice: getRandomPrice(),
    dateFrom: '2020-04-10T10:00:00.845Z',
    dateTo: '2020-04-11T10:00:13.375Z',
    destination: getRandomArrayElement(destination).id,
    isFavorite: false,
    offers: [3, 4],
    type: 'train'
  },
  {
    id: '05',
    basePrice: getRandomPrice(),
    dateFrom: '2021-01-11T10:00:00.845Z',
    dateTo: '2021-01-13T10:00:13.375Z',
    destination: getRandomArrayElement(destination).id,
    isFavorite: false,
    offers: [3],
    type: 'ship'
  },
  {
    id: '06',
    basePrice: getRandomPrice(),
    dateFrom: '2026-01-11T10:00:00.845Z',
    dateTo: '2026-01-13T10:00:13.375Z',
    destination: getRandomArrayElement(destination).id,
    isFavorite: true,
    offers: [3,4,5],
    type: 'drive'
  },
  {
    id: '07',
    basePrice: getRandomPrice(),
    dateFrom: '2023-05-11T12:00:00.845Z',
    dateTo: '2023-05-11T12:30:13.375Z',
    destination: getRandomArrayElement(destination).id,
    isFavorite: true,
    offers: [1,4],
    type: 'flight'
  },
  {
    id: '08',
    basePrice: getRandomPrice(),
    dateFrom: '2023-06-11T12:00:00.845Z',
    dateTo: '2023-06-13T12:30:13.375Z',
    destination: getRandomArrayElement(destination).id,
    isFavorite: false,
    offers: [2],
    type: 'check-in'
  },
  {
    id: '09',
    basePrice: getRandomPrice(),
    dateFrom: '2022-09-11T12:00:00.845Z',
    dateTo: '2022-09-11T12:30:13.375Z',
    destination: getRandomArrayElement(destination).id,
    isFavorite: false,
    offers: [2,4],
    type: 'sightseeing'
  },
  {
    id: '10',
    basePrice: getRandomPrice(),
    dateFrom: '2022-07-05T12:00:00.845Z',
    dateTo: '2022-07-10T12:30:13.375Z',
    destination: getRandomArrayElement(destination).id,
    isFavorite: false,
    offers: [1,2],
    type: 'restaurant'
  },

];

function getRandomPoint(){
  return getRandomArrayElement(points);
}
export {getRandomPoint};
