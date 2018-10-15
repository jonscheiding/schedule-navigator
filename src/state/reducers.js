import { combineReducers } from 'redux';
import { CHANGE_FILTER, CHANGE_ALL_FILTERS } from './actions';

const filterReducer = (filterKey) => (state = {}, action) => {
  switch(action.type) {
    case CHANGE_FILTER:
      if(action.filterKey !== filterKey) return state;

      return {
        ...state,
        [action.value]: {
          value: action.value,
          isSelected: action.isSelected
        }
      };

    case CHANGE_ALL_FILTERS:
      if(action.filterKey !== filterKey) return state;

      return Object.keys(state).toObject(
        value => ({value, isSelected: action.isSelected}));

    default: return state;
  }
};

const filtersReducer = combineReducers({
  location: filterReducer('location'),
  topic: filterReducer('topic'),
  type: filterReducer('type')
});

export default combineReducers({
  events: (state = []) => state,
  range: (state = {}) => state,
  filters: filtersReducer
});
