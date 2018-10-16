import { createSelector } from 'reselect';

const filtersMatch = (filters, event) => {
  for(let filterKey of Object.keys(filters)) {
    if(!filters[filterKey][event[filterKey]].isSelected) {
      return false;
    }
  }
  return true;
};

const contains = (values, query) => {
  for(const value of values) {
    if(value.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
      return true;
    }
  }
  return false;
};

const queryMatches = (query, event) =>
  contains([event.abbreviation, event.title, event.abstract], query);

export const getEvents = state => state.events;
export const getRange = state => state.range;
export const getQuery = state => state.query;
export const getColors = state => state.colors;
export const getFilters = state => state.filters;
export const getDefaults = state => state.defaults;
export const getOptions = state => state.options;

const createFilterSelectors = (filterKeys) => {
  return filterKeys.toObject(
    filterKey => createSelector(
      [getFilters],
      filters => Object.keys(filters[filterKey])
        .sort()
        .map(value => filters[filterKey][value])     
    )
  );
};

const filterSelectors = createFilterSelectors(['location', 'type', 'topic']);

const getEventColor = (event, colors, colorBy) => {
  return colors[colorBy][event[colorBy]];
};

export const getFilter = (state, props) => filterSelectors[props.filterKey](state);

export const getEventsColored = createSelector(
  [getEvents, getColors, getOptions],
  (events, colors, options) => events.map(event => ({
    ...event,
    color: getEventColor(event, colors, options.colorBy)
  }))
);

export const getFilteredEvents = createSelector(
  [getEventsColored, getFilters, getQuery],
  (events, filters, query) => events.filter(e => 
    filtersMatch(filters, e) &&
    queryMatches(query, e))
);
