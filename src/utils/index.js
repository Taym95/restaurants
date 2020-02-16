export const sortByfavorite = (a, b) =>
  Boolean(b.isFavorite) === Boolean(a.isFavorite)
    ? 0
    : Boolean(b.isFavorite)
    ? 1
    : -1;

const statusToValues = { open: 1, "order ahead": 2, closed: 3 };

export const sortByStatus = (a, b) => {
  var statusA = statusToValues[a.status];
  var statusB = statusToValues[b.status];
  if (statusA < statusB) {
    return -1;
  }
  if (statusA > statusB) {
    return 1;
  }
};

export const sortBySortingValues = (a, b, value) => {
  if (value) {
    var valueA = a.sortingValues[value];
    var valueB = b.sortingValues[value];
    if (valueA < valueB) {
      return 1;
    }
    if (valueA > valueB) {
      return -1;
    }
  }
};

export const searchFilter = (restaurant, searchValue) => {
  if (searchValue !== null && searchValue.length !== 0) {
    return restaurant.name.includes(searchValue);
  }
  return restaurant;
};