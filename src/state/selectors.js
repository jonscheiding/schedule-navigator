import { createSelector } from 'reselect';

const filtersMatch = (filters, event) => {
  for(let filterKey of Object.keys(filters)) {
    if(!filters[filterKey][event[filterKey]].isSelected) {
      return false;
    }
  }
  return true;
};

export const getEvents = state => state.events;
export const getRange = state => state.range;
export const getFilters = state => state.filters;

export const getFilteredEvents = createSelector(
  [getEvents, getFilters],
  (events, filters) => events.filter(e => filtersMatch(filters, e))
);
