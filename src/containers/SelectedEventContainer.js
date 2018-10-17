import { connect } from 'react-redux';

import EventDetails from '../components/EventDetails';

const mapStateToProps = (state) => ({
  event: state.selectedEvent
});

export default connect(mapStateToProps)(EventDetails);
