import { connect } from 'react-redux';

import { getFilter } from '../state/selectors';
import { CHANGE_FILTER, CHANGE_ALL_FILTERS } from '../state/actions';
import Filter from '../components/Filter';

const mapStateToProps = (state, props) => ({
  filter: getFilter(state, props)
});

const mapDispatchToProps = (dispatch, props) => ({
  onFilterChange: (value, isSelected) => dispatch({
    type: CHANGE_FILTER, 
    filterKey: props.filterKey,
    value, isSelected
  }),
  onAllFiltersChange: (isSelected) => dispatch({
    type: CHANGE_ALL_FILTERS,
    filterKey: props.filterKey,
    isSelected
  })
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
