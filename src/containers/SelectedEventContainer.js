import { connect } from 'react-redux';

import EventDetails from '../components/EventDetails';
import { SET_INTERESTED } from '../state/actions';
import { getSelectedEvent } from '../state/selectors';

const mapStateToProps = (state) => ({
  event: getSelectedEvent(state)
});

const mapDispatchToProps = (dispatch) => ({
  onSetInterested: (event, interested) => dispatch({
    type: SET_INTERESTED, event, interested
  })
});

export default connect(mapStateToProps, mapDispatchToProps)(EventDetails);
