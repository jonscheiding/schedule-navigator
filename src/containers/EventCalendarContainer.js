import { connect } from 'react-redux';

import { getEvents, getRange } from '../state/selectors';
import EventCalendar from '../components/EventCalendar';

const mapStateToProps = 
  state => ({
    events: getEvents(state),
    range: getRange(state)
  });

export default connect(mapStateToProps)(EventCalendar);
