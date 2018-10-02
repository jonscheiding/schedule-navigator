import React, { Component } from 'react';
import Calendar from 'react-big-calendar';
import moment from 'moment';
import randomId from 'randomid';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import './App.css'

import EventsStore from './EventsStore';

class App extends Component {
  constructor() { super(); 
    this.eventStore = new EventsStore();
    this.state = this.createStateFromStore();
  }

  setStateFromStore() {
    this.setState(this.createStateFromStore());
  }

  createStateFromStore() {
    return {
      events: this.eventStore.getFilteredList(),
      topics: this.eventStore.topics,
      locations: this.eventStore.locations,
      colorBy: this.eventStore.colorBy
    }
  }

  render() {
    return (
      <div className='main container'>
        <div className='controls'>
          <div className='vertical container'>
            <div className='topics chooser scrollable'>
              {this.renderChooser(this.state.topics, 'topic')}
            </div>
            <div className='locations chooser scrollable'>
              {this.renderChooser(this.state.locations, 'location')}
            </div>
          </div>
        </div>
        <div className='calendar scrollable'>
          <Calendar
            defaultDate={new Date(2018, 10, 25)}
            defaultView="week"
            views={['day', 'week']}
            events={this.state.events}
            localizer={Calendar.momentLocalizer(moment)}
            style={{ height: "100%" }} 
            eventPropGetter={e => ({ style: { backgroundColor: e.color, color: 'black' } })}
            titleAccessor={e => e.abbreviation + ' - ' + e.title}
            min={new Date(2018, 10, 25, 10, 0)}
            max={new Date(2018, 10, 25, 22, 0)}
            />
        </div>
      </div>
    );
  }

  renderChooser(choices, title) {
    const keys = Object.keys(choices).sort();

    return (
      <div>
        <div className='title'>
          <b>{title}</b>
          <button onClick={() => this.updateAllIncluded(choices, false)}>NONE</button>
          <button onClick={() => this.updateAllIncluded(choices, true)}>ALL</button>
        </div>
        {keys.map(key => this.renderChoice(choices[key], title))}
      </div>
    );
  }

  renderChoice(choice, title) {
    const id = randomId();

    return (
      <div key={choice.value}>
        <input type='checkbox' id={id}
          checked={choice.isIncluded} 
          onChange={e => this.updateIncluded(choice, e.target.checked)} />
        <label htmlFor={id}>
          { this.state.colorBy === title
            ? <span className='color-label' style={{backgroundColor: choice.color}} />
            : null
          }
          {choice.value || <i>Unknown</i>}
        </label>
      </div>
    );
  }

  updateIncluded(choice, isIncluded) {
    this.eventStore.updateIncluded(choice, isIncluded);
    this.setStateFromStore();
  }

  updateAllIncluded(choices, isIncluded) {
    for(const key of Object.keys(choices)) {
      this.eventStore.updateIncluded(choices[key], isIncluded);
    }
    this.setStateFromStore();
  }
}

export default App;
