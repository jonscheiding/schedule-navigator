import React, { Component } from 'react';
import Calendar from 'react-big-calendar';
import moment from 'moment';

import 'react-big-calendar/lib/css/react-big-calendar.css';

import './App.css'
import events from './events.json';

for(const event of events) {
  event.start = new Date(Date.parse(event.start));
  event.end = new Date(Date.parse(event.end));
}

const localizer = Calendar.momentLocalizer(moment);

class App extends Component {
  render() {
    const someEvents = events.filter(e => e.type === 'Demo Session');

    return (
      <div className='main container'>
        <div className='controls'>
          <div className='vertical container'>
            <div className='topics scrollable'>TOPICS</div>
            <div className='locations scrollable'>LOCATIONS</div>
          </div>
        </div>
        <div className='calendar scrollable'>
          <Calendar
            defaultDate={new Date(2018, 10, 25)}
            defaultView="week"
            views={['day', 'week']}
            events={someEvents}
            localizer={localizer}
            style={{ height: "200%" }} 
            titleAccessor={e => e.abbreviation + ' - ' + e.title}
            elementProps={{ style: { height: '200%' }}}
            min={new Date(2018, 10, 25, 9, 0)}
            max={new Date(2018, 10, 25, 21, 0)}
            />
        </div>
      </div>
    );
  }
}

export default App;
