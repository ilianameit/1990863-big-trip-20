const offersType = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const FilterType = {
  EVERYTHING: 'everything', // ALL
  FUTURE : 'future', //, у которых дата начала события больше текущей даты;
  PRESENT: 'present', //у которых дата начала события меньше (или равна) текущей даты, а дата окончания больше (или равна) текущей даты;
  PAST: 'past' //точек у которых дата окончания маршрута меньше, чем текущая.
};

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers'
};

export {
  offersType,
  FilterType,
  SortType
};
