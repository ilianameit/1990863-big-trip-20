import { returnCurrentOffers, returnDestination } from './point';

function calculatePrice(points, allOffers) {
  return points.reduce((accumulator, point) => {
    const offersCurrent = returnCurrentOffers(point.type, point.offers, allOffers);
    const prices = offersCurrent.reduce((accumulatorPrice, {price}) => accumulatorPrice + price, 0);

    return accumulator + point.basePrice + prices;
  }, 0);
}

function returnTripDestinations(points, destinations) {
  const destinationsTrip = [];
  points.map(({destination}) => destinationsTrip.push(returnDestination(destination, destinations).name));
  return destinationsTrip;
}

function returnUniqDestinations(points, destinations) {
  const uniqDestinations = new Set();
  points.map(({destination}) => uniqDestinations.add(returnDestination(destination, destinations).name));
  return Array.from(uniqDestinations.keys());
}
export {
  calculatePrice,
  returnTripDestinations,
  returnUniqDestinations,
};
