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
    this.handleEventDoubleClick = this.handleEventDoubleClick.bind(this);
    this.handleEventSelect = this.handleEventSelect.bind(this);
    this.handleAlwaysShowInterestedCheckboxChange = this.handleAlwaysShowInterestedCheckboxChange.bind(this);
  }

  setStateFromStore() {
    this.setState(this.createStateFromStore());
  }

  createStateFromStore() {
    return {
      events: this.eventStore.getFilteredList(),
      topics: this.eventStore.topics,
      locations: this.eventStore.locations,
      types: this.eventStore.types,
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
            <div className='types chooser'>
              {this.renderChooser(this.state.types, 'types')}
            </div>
            <div className='locations chooser'>
              {this.renderChooser(this.state.locations, 'location')}
            </div>
            <div className='options chooser'>
              {this.renderOptions()}
            </div>
          </div>
        </div>
        <div className='events'>
          <div className='vertical container'>
            <div className='calendar scrollable'>
              {this.renderCalendar()}
            </div>
            <div className='current-event scrollable'>
              {this.renderCurrentEvent()}
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderCalendar() {
    return (
      <Calendar
        defaultDate={new Date(2018, 10, 26)}
        defaultView="day"
        views={['day', 'week', 'agenda']}
        events={this.state.events}
        localizer={Calendar.momentLocalizer(moment)}
        style={{ height: "100%" }} 
        eventPropGetter={this.getEventProps}
        titleAccessor={e => e.abbreviation + ' ' + e.title}
        tooltipAccessor={e => e.abbreviation + ' ' + e.title}
        onDoubleClickEvent={this.handleEventDoubleClick}
        onSelectEvent={this.handleEventSelect}
        selected={this.state.selectedEvent}
        min={new Date(2018, 10, 25, 10, 0)}
        max={new Date(2018, 10, 25, 22, 0)}
        />
    );
  }

  renderCurrentEvent() {
    if(!this.state.selectedEvent) {
      return null;
    }

    const event = this.state.selectedEvent;
    const id = 'interested-' + randomId;

    return (
      <div className='container event-details'>
        <div className='event-meta'>
          <div><b>{event.abbreviation} {event.title}</b></div>
          <div>{event.topic}</div>
          <div><i>{event.type}</i></div>
          <div>
            {moment(event.start).format('h:mm a')} -
            {moment(event.end).format('h:mm a')}
          </div>
          <div className='interested'>
            <input type='checkbox' id={id} 
              checked={this.state.interested[event.id]} 
              onChange={e => this.handleInterestedCheckboxChange(e, event)}
              />
            <label htmlFor={id}>Interested</label>
          </div>
        </div>
        <div className='event-abstract'>
          <p>{event.abstract}</p>
        </div>
      </div>
    )
  }

  renderOptions() {
    const id = 'always-interested-' + randomId();

    return (
      <div>
        <div className='title'><b>Options</b></div>
        <input type='checkbox' id={id}
          checked={this.eventStore.alwaysShowInterested}
          onChange={this.handleAlwaysShowInterestedCheckboxChange} />
        <label htmlFor={id}>Always show interested events</label>
      </div>
    )
  }

  renderChooser(choices, title) {
    const keys = Object.keys(choices).sort();

    return (
      <div>
        <div className='title'>
          <b>{title}</b>
          <button onClick={e => this.handleSelectAllOrNoneClick(e, choices)} value={false}>NONE</button>
          <button onClick={e => this.handleSelectAllOrNoneClick(e, choices)} value={true}>ALL</button>
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
          onChange={e => this.handleFilterCheckboxChange(e, choice)} />
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

  handleAlwaysShowInterestedCheckboxChange(e) {
    this.eventStore.alwaysShowInterested = e.target.checked;
    this.setStateFromStore();
  }

  handleInterestedCheckboxChange(e, event) {
    this.eventStore.updateInterested(event, e.target.checked);
    this.setStateFromStore();
  }

  handleFilterCheckboxChange(e, choice) {
    this.eventStore.updateIncluded(choice, e.target.checked);
    this.setStateFromStore();
  }

  handleSelectAllOrNoneClick(e, choices) {
    for(const key of Object.keys(choices)) {
      this.eventStore.updateIncluded(choices[key], e.target.value === 'true');
    }
    this.setStateFromStore();
  }

  handleEventSelect(event) {
    this.setState({selectedEvent: event});
  }

  handleEventDoubleClick(event) {
    this.eventStore.updateInterested(event, !this.state.interested[event.id]);
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
