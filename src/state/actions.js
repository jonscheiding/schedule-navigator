export const CHANGE_FILTER = 'CHANGE_FILTER';

export const changeFilter = (filterKey, value, isSelected) => 
  ({type: CHANGE_FILTER, filterKey, value, isSelected});
