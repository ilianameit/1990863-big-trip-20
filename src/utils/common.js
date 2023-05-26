function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomPrice() {
  return Math.floor(Math.random() * 100);
}

function upperFirstCase(word){
  return (word[0].toUpperCase() + word.slice(1));
}

function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}

export {
  getRandomArrayElement,
  getRandomPrice,
  upperFirstCase,
  updateItem
};
