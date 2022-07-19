import { MAX_SHORTS_DURATION } from '../constants/constants';

export default function searchFilter(array, query, short) {
  if (!array) {
    return [];
  }

  let filtered = [...array];

  if (query) {
    filtered = filtered.filter((element) => element.nameRU
      .toLowerCase()
      .includes(query.toLowerCase()));
  }

  if (short) {
    return filtered.filter((element) => element.duration <= MAX_SHORTS_DURATION);
  }

  return filtered;
}
