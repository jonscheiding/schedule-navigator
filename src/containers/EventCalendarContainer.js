import { connect } from 'react-redux';

import EventCalendar from '../components/EventCalendar';

const mapStateToProps = state => ({
  events: state.events,
  range: state.calendarSettings.range
});

export default connect(mapStateToProps)(EventCalendar);
