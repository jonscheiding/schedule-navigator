import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LabeledInput from './LabeledInput';

class EventDetails extends Component {
  render() {
    const { event, className, style } = this.props;

    if(event === null) {
      return null;
    }

    return (
      <div className={className} style={style}>
        <div><b>{event.abbreviation} {event.title}</b></div>
        <div>{event.abstract}</div>
        <div>
          <LabeledInput type='checkbox' 
            checked={event.interested} onChange={this.handleInterestedChanged}>
            Interested
          </LabeledInput>
        </div>
      </div>
    );
  }

  handleInterestedChanged = (e) => {
    this.props.onSetInterested(this.props.event, e.target.checked);
  }
}

EventDetails.propTypes = {
  event: PropTypes.object,
  className: PropTypes.string,
  style: PropTypes.any,
  onSetInterested: PropTypes.func
};

EventDetails.defaultProps = {
  onSetInterested: () => {}
};

export default EventDetails;