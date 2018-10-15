import { connect } from 'react-redux';

import { getFilteredEvents, getRange } from '../state/selectors';
import EventCalendar from '../components/EventCalendar';

const mapStateToProps = 
  state => ({
    events: getFilteredEvents(state),
    range: getRange(state)
  });

export default connect(mapStateToProps)(EventCalendar);
