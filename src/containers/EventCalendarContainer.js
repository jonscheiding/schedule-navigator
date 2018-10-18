import { connect } from 'react-redux';

import { getFilteredEvents, getRange, getDefaults } from '../state/selectors';
import EventCalendar from '../components/EventCalendar';
import { CHANGE_DATE, CHANGE_VIEW, SELECT_EVENT } from '../state/actions';

const mapStateToProps = 
  state => ({
    events: getFilteredEvents(state),
    range: getRange(state),
    defaults: getDefaults(state)
  });

const mapDispatchToProps = 
  dispatch => ({
    onChangeDate: (date) => dispatch({type: CHANGE_DATE, date}),
    onChangeView: (view) => dispatch({type: CHANGE_VIEW, view}),
    onSelectEvent: (event) => dispatch({type: SELECT_EVENT, event})
  });

export default connect(mapStateToProps, mapDispatchToProps)(EventCalendar);
