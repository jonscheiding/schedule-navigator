import { combineReducers } from 'redux';
import { CHANGE_FILTER, CHANGE_ALL_FILTERS, CHANGE_DATE, CHANGE_VIEW, CHANGE_QUERY } from './actions';

const defaultsReducer = (state = {}, action) => {
  switch(action.type) {
    case CHANGE_DATE:
      return { ...state, date: action.date };
    case CHANGE_VIEW:
      return { ...state, view: action.view };
    default:
      return state;
  }
};

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

const queryReducer = (state = '', action) => {
  switch(action.type) {
    case CHANGE_QUERY:
      return action.query;
    default:
      return state;
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
  colors: (state = {}) => state,
  defaults: defaultsReducer,
  filters: filtersReducer,
  query: queryReducer
});
