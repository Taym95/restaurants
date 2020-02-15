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
