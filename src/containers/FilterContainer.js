import { connect } from 'react-redux';

import { getFilter } from '../state/selectors';
import { changeFilter, changeAllFilters } from '../state/actions';
import Filter from '../components/Filter';

const mapStateToProps = (state, props) => ({
  filter: getFilter(state, props)
});

const mapDispatchToProps = (dispatch, props) => ({
  onFilterChange: (value, isSelected) => dispatch(
    changeFilter(props.filterKey, value, isSelected)),
  onAllFiltersChange: (isSelected) => dispatch(
    changeAllFilters(props.filterKey, isSelected))
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
