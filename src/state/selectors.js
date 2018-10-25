import { createSelector } from 'reselect';

import eventRepository from '../EventRepository';
import colorHelper from '../ColorHelper';

export const getFilters = state => state.filters;
export const getQuery = state => state.query;
export const getOptions = state => state.options;

export const getMatchingEvents = createSelector(
  [getFilters, getQuery],
  (filters, query) => eventRepository.getMatchingEvents(filters, query)
);

export const getColoredEvents = createSelector(
  [getOptions, getMatchingEvents],
  (options, events) => colorHelper.colorEvents(events, options.colorBy)
);

export const getRange = state => state.range;
export const getColors = state => state.colors;
export const getDefaults = state => state.defaults;

const createFilterSelectors = (filterKeys) => {
  return filterKeys.toObject(
    filterKey => createSelector(
      [getFilters, getOptions, getColors],
      (filters, options, colors) => Object.keys(filters[filterKey])
        .sort()
        .map(value => {
          if(filterKey === options.colorBy) {
            return {
              ...filters[filterKey][value],
              color: colors[filterKey][value]
            };
          }
          return filters[filterKey][value];
        })     
    )
  );
};

const filterSelectors = createFilterSelectors(['location', 'type', 'topic']);

export const getFilter = (state, props) => filterSelectors[props.filterKey](state);
