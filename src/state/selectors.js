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

const createFilterSelectors = (filterKeys) => {
  const selectors = {};
  for(const filterKey of filterKeys) {
    selectors[filterKey] = createSelector(
      [getFilters],
      filters => Object.keys(filters[filterKey])
        .sort()
        .map(value => filters[filterKey][value])
    );
  }
  return selectors;
};

const filterSelectors = createFilterSelectors(['location', 'type', 'topic']);

export const getFilter = (state, props) => filterSelectors[props.filterKey](state);

export const getFilteredEvents = createSelector(
  [getEvents, getFilters],
  (events, filters) => events.filter(e => filtersMatch(filters, e))
);
