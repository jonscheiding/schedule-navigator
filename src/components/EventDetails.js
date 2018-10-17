import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
      </div>
    );
  }
}

EventDetails.propTypes = {
  event: PropTypes.object,
  className: PropTypes.string,
  style: PropTypes.any
};

export default EventDetails;