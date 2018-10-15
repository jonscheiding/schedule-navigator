import { connect } from 'react-redux';

import { getFilteredEvents, getRange, getDefaults } from '../state/selectors';
import EventCalendar from '../components/EventCalendar';
import { changeDate, changeView } from '../state/actions';

const mapStateToProps = 
  state => ({
    events: getFilteredEvents(state),
    range: getRange(state),
    defaults: getDefaults(state)
  });

const mapDispatchToProps = 
  dispatch => ({
    onChangeDate: (date) => dispatch(changeDate(date)),
    onChangeView: (view) => dispatch(changeView(view))
  });

export default connect(mapStateToProps, mapDispatchToProps)(EventCalendar);
