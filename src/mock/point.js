
import { nanoid } from 'nanoid';
import {getRandomArrayElement, getRandomPrice} from '../utils/common.js';
import { destinations } from './destinations.js';

const points = [
  {
    basePrice: getRandomPrice(),
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: getRandomArrayElement(destinations).id,
    isFavorite: false,
    offers: [1,2],
    type: 'taxi'
  },
  {
    basePrice: getRandomPrice(),
    dateFrom: '2020-05-10T22:55:56.845Z',
    dateTo: '2020-06-11T11:22:13.375Z',
    destination: getRandomArrayElement(destinations).id,
    isFavorite: true,
    offers: [2,4],
    type: 'bus'
  },
  {
    basePrice: getRandomPrice(),
    dateFrom: '2020-03-01T10:00:00.845Z',
    dateTo: '2026-03-01T11:30:13.375Z',
    destination: getRandomArrayElement(destinations).id,
    isFavorite: true,
    offers: [2,4],
    type: 'bus'
  },
  {
    basePrice: getRandomPrice(),
    dateFrom: '2020-04-10T10:00:00.845Z',
    dateTo: '2020-04-11T10:00:13.375Z',
    destination: getRandomArrayElement(destinations).id,
    isFavorite: false,
    offers: [3, 4],
    type: 'train'
  },
  {
    basePrice: getRandomPrice(),
    dateFrom: '2021-01-11T10:00:00.845Z',
    dateTo: '2021-01-13T10:00:13.375Z',
    destination: getRandomArrayElement(destinations).id,
    isFavorite: false,
    offers: [3],
    type: 'ship'
  },
  {
    basePrice: getRandomPrice(),
    dateFrom: '2026-01-11T10:00:00.845Z',
    dateTo: '2026-01-13T10:00:13.375Z',
    destination: getRandomArrayElement(destinations).id,
    isFavorite: true,
    offers: [3,4,5],
    type: 'drive'
  },
  {
    basePrice: getRandomPrice(),
    dateFrom: '2023-05-11T12:00:00.845Z',
    dateTo: '2023-05-11T12:30:13.375Z',
    destination: getRandomArrayElement(destinations).id,
    isFavorite: true,
    offers: [1,4],
    type: 'flight'
  },
  {
    basePrice: getRandomPrice(),
    dateFrom: '2023-06-11T12:00:00.845Z',
    dateTo: '2023-06-13T12:30:13.375Z',
    destination: getRandomArrayElement(destinations).id,
    isFavorite: false,
    offers: [2],
    type: 'check-in'
  },
  {
    basePrice: getRandomPrice(),
    dateFrom: '2022-09-11T12:00:00.845Z',
    dateTo: '2022-09-11T12:30:13.375Z',
    destination: getRandomArrayElement(destinations).id,
    isFavorite: false,
    offers: [2,4],
    type: 'sightseeing'
  },
  {
    basePrice: getRandomPrice(),
    dateFrom: '2022-07-05T12:00:00.845Z',
    dateTo: '2022-07-10T12:30:13.375Z',
    destination: getRandomArrayElement(destinations).id,
    isFavorite: false,
    offers: [1,2],
    type: 'restaurant'
  },

];

function getRandomPoint(){
  return {
    id: nanoid(),
    ...getRandomArrayElement(points)
  };
}
export {getRandomPoint};
