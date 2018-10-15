export const CHANGE_FILTER = 'CHANGE_FILTER';
export const CHANGE_ALL_FILTERS = 'CHANGE_ALL_FILTERS';

export const changeFilter = (filterKey, value, isSelected) => 
  ({type: CHANGE_FILTER, filterKey, value, isSelected});

export const changeAllFilters = (filterKey, isSelected) => 
  ({type: CHANGE_ALL_FILTERS, filterKey, isSelected});
