import React, { Component } from 'react';
import Calendar from 'react-big-calendar';
import moment from 'moment';
import randomId from 'random-id';
import cx from 'classnames';
import { desaturate, darken, transparentize } from 'polished';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import './App.css'

import EventsStore from './EventsStore';

class App extends Component {
  constructor() { super(); 
    this.eventStore = new EventsStore();
    this.state = this.createStateFromStore();

    this.getEventProps = this.getEventProps.bind(this);
    this.eventDoubleClicked = this.eventDoubleClicked.bind(this);
  }

  setStateFromStore() {
    this.setState(this.createStateFromStore());
  }

  createStateFromStore() {
    return {
      events: this.eventStore.getFilteredList(),
      topics: this.eventStore.topics,
      locations: this.eventStore.locations,
      interested: this.eventStore.interested,
      colorBy: this.eventStore.colorBy,
      excludeNotInterested: this.eventStore.excludeNotInterested
    };
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
            <div className='options chooser'>
              {this.renderOptions()}
            </div>
          </div>
        </div>
        <div className='calendar scrollable'>
          {this.renderCalendar()}
        </div>
      </div>
    );
  }

  renderOptions() {
    const id = 'option-' + randomId();

    return (
      <div>
        <div className='title'><b>Options</b></div>
        <div>
          <input type='checkbox' id={id}
            checked={this.state.excludeNotInterested}
            onChange={e => this.updateExcludeNotInterested(e.target.checked)} />
          <label htmlFor={id}>Only Interested</label>
        </div>
      </div>
    );
  }

  renderCalendar() {
    return (
      <Calendar
        defaultDate={new Date(2018, 10, 26)}
        defaultView="day"
        views={['day', 'week']}
        events={this.state.events}
        localizer={Calendar.momentLocalizer(moment)}
        style={{ height: "100%" }} 
        eventPropGetter={this.getEventProps}
        titleAccessor={e => e.abbreviation + ' - ' + e.title}
        tooltipAccessor={e => e.title + ': ' + e.abstract}
        onDoubleClickEvent={this.eventDoubleClicked}
        min={new Date(2018, 10, 25, 10, 0)}
        max={new Date(2018, 10, 25, 22, 0)}
        />
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
    const id = 'title-' + randomId(16);

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

  updateExcludeNotInterested(value) {
    this.eventStore.updateExcludeNotInterested(value);
    this.setStateFromStore();
  }

  eventDoubleClicked(event) {
    this.eventStore.toggleInterested(event);
    this.setStateFromStore();
    return false;
  }

  getEventProps(e, start, end, isSelected) {
    let backgroundColor = desaturate(0.25, e.color);
    let borderColor = darken(0.2, backgroundColor);
    
    if(!isSelected) {
      backgroundColor = transparentize(0.1, backgroundColor);
    }

    return {
      className: cx('event', {
        'selected': isSelected,
        'interested': this.state.interested[e.id]
      }),
      style: {
        backgroundColor: backgroundColor,
        borderColor: borderColor,
      }
    };
  }
}

export default App;
