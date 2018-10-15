import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Calendar from 'react-big-calendar';
import moment from 'moment';

import 'react-big-calendar/lib/css/react-big-calendar.css';

class EventCalendar extends Component {
  render() {
    const { events, range, className, style } = this.props;

    const localizer = Calendar.momentLocalizer(moment);
    return (
      <div className={className} style={style}>
        <Calendar 
          localizer={localizer}
          events={events} 
          min={range.start} max={range.end} defaultDate={range.start}
          views={['week', 'day', 'agenda']} defaultView='week'
          />
      </div>
    );
  }
}

EventCalendar.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object),
  range: PropTypes.shape({
    start: PropTypes.instanceOf(Date).isRequired,
    end: PropTypes.instanceOf(Date).isRequired
  }).isRequired,
  className: PropTypes.string,
  style: PropTypes.string
};

EventCalendar.defaultProps = {
  events: []
};

export default EventCalendar;
