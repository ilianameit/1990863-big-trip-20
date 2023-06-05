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

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT', //событие обновление задачи
  ADD_POINT: 'ADD_POINT',//событие добавление задачи
  DELETE_POINT: 'DELETE_POINT',//событие удаление задачи
};
const UpdateType = { //изменения маленькие. большие
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export {
  offersType,
  FilterType,
  SortType,
  UserAction,
  UpdateType
};
