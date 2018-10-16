export const CHANGE_FILTER = 'CHANGE_FILTER';
export const CHANGE_ALL_FILTERS = 'CHANGE_ALL_FILTERS';
export const CHANGE_QUERY = 'CHANGE_QUERY';
export const CHANGE_DATE = 'CHANGE_DATE';
export const CHANGE_VIEW = 'CHANGE_VIEW';
export const CHANGE_OPTIONS = 'CHANGE_OPTIONS';

export const changeFilter = (filterKey, value, isSelected) => 
  ({type: CHANGE_FILTER, filterKey, value, isSelected});

export const changeAllFilters = (filterKey, isSelected) => 
  ({type: CHANGE_ALL_FILTERS, filterKey, isSelected});

export const changeDate = (date) => 
  ({type: CHANGE_DATE, date});

export const changeView = (view) =>
  ({type: CHANGE_VIEW, view});

export const changeQuery = (query) => 
  ({type: CHANGE_QUERY, query});

export const changeOptions = (options) =>
  ({type: CHANGE_OPTIONS, options});
