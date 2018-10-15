import { combineReducers } from 'redux';
import { CHANGE_FILTER } from './actions';

const filterReducer = (filterKey) => (state = {}, action) => {
  switch(action.type) {
    case CHANGE_FILTER:
      if(action.filterKey !== filterKey) {
        return state;
      }

      return {
        ...state,
        [action.value]: {
          value: action.value,
          isSelected: action.isSelected
        }
      };

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
