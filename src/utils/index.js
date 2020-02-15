export const sortByfavorite = (a, b) =>
  Boolean(b.isFavorite) === Boolean(a.isFavorite)
    ? 0
    : Boolean(b.isFavorite)
    ? 1
    : -1;
