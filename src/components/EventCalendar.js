import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Calendar from 'react-big-calendar';
import moment from 'moment';

import 'react-big-calendar/lib/css/react-big-calendar.css';

class EventCalendar extends Component {
  render() {
    const { events, range, defaults, className, style } = this.props;

    const localizer = Calendar.momentLocalizer(moment);
    return (
      <div className={className} style={style}>
        <Calendar 
          localizer={localizer}
          events={events} 
          min={range.start} max={range.end} defaultDate={defaults.date}
          views={['week', 'day', 'agenda']} defaultView={defaults.view}
          onNavigate={this.handleNavigate} onView={this.handleView}
          />
      </div>
    );
  }

  handleNavigate = (e) => {
    this.props.onChangeDate(e);
  }

  handleView = (e) => {
    this.props.onChangeView(e);
  }
}

EventCalendar.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object),
  range: PropTypes.shape({
    start: PropTypes.instanceOf(Date).isRequired,
    end: PropTypes.instanceOf(Date).isRequired
  }).isRequired,
  defaults: PropTypes.shape({
    date: PropTypes.instanceOf(Date).isRequired,
    view: PropTypes.string.isRequired
  }),
  className: PropTypes.string,
  style: PropTypes.string,
  onChangeDate: PropTypes.func,
  onChangeView: PropTypes.func
};

EventCalendar.defaultProps = {
  events: [],
  onChangeDate: () => {},
  onChangeView: () => {}
};

export default EventCalendar;