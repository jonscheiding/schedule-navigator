import React, { Component } from 'react';
import { DebounceInput } from 'react-debounce-input';
import Calendar from 'react-big-calendar';
import moment from 'moment';
import shortId from 'shortid';
import cx from 'classnames';
import { desaturate, darken, transparentize } from 'polished';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import './App.css'

import EventsStore, { COLOR_BY_OPTIONS } from './EventsStore';

const PST_OFFSET = 8 * 60;

const InputWithLabel = ({id, children, inline, ...props}) => {
  if(!id) {
    id = shortId();
  }

  return (
    <div className={cx('checkbox', { 'block' : !inline })}>
      <input id={id} {...props} />
      <label htmlFor={id}>{children}</label>
    </div>
  )
}

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
            <div className='topics filter scrollable'>
              {this.renderChooser(this.state.topics, 'topic')}
            </div>
            <div className='types filter'>
              {this.renderChooser(this.state.types, 'type')}
            </div>
            <div className='locations filter'>
              {this.renderChooser(this.state.locations, 'location')}
            </div>
            <div className='search filter'>
              {this.renderSearch()}
            </div>
            <div className='options filter'>
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
    const accessors = {
      startAccessor: e => this.convertToEventLocalTime(e.start),
      endAccessor: e => this.convertToEventLocalTime(e.end),
      titleAccessor: e => e.abbreviation + ' ' + e.title,
      tooltipAccessor: e => e.abbreviation + ' ' + e.title
    };

    const handlers = {
      onDoubleClickEvent: this.handleEventDoubleClick,
      onSelectEvent: this.handleEventSelect
    };

    const settings = {
      min: new Date(2018, 10, 25, 8, 0),
      max: new Date(2018, 10, 25, 21, 59, 59),
      step: 30,
      timeslots: 1,
      defaultDate: new Date(2018, 10, 26),
      defaultView: 'day',
      views: ['day', 'week', 'agenda'],
      localizer: Calendar.momentLocalizer(moment)
    };

    return (
      <Calendar
        events={this.state.events}
        eventPropGetter={this.getEventProps}
        selected={this.state.selectedEvent}
        {...settings}
        {...handlers}
        {...accessors}
        />
    );
  }

  renderCurrentEvent() {
    if(!this.state.selectedEvent) {
      return null;
    }

    const event = this.state.selectedEvent;

    return (
      <div className='container event-details'>
        <div className='event-meta'>
          <div><b>{event.abbreviation} {event.title}</b></div>
          <div>{event.topic}</div>
          <div><i>{event.type}</i></div>
          <div>
            {moment(this.convertToEventLocalTime(event.start)).format('h:mm a')} -
            {moment(this.convertToEventLocalTime(event.end)).format('h:mm a')}
          </div>
          <div className='interested'>
            <InputWithLabel type='checkbox'
              checked={this.state.interested[event.id]} 
              onChange={e => this.handleInterestedCheckboxChange(e, event)}>
              Interested
            </InputWithLabel>
          </div>
        </div>
        <div className='event-abstract'>
          <p>{event.abstract}</p>
        </div>
      </div>
    )
  }

  renderOptions() {
    return (
      <div>
        <div className='title'><b>Options</b></div>
        <div>
          <InputWithLabel type='checkbox'
            checked={this.eventStore.alwaysShowInterested}
            onChange={this.handleAlwaysShowInterestedCheckboxChange}>
            Show all events that are marked as "interested", regardless of filters
          </InputWithLabel>
        </div>
        <div>
          <InputWithLabel type='checkbox'
            checked={this.eventStore.hideNotInterested}
            onChange={this.handleHideNotInterestedCheckboxChange}>
            Hide events that are not marked as "interested"
          </InputWithLabel>
        </div>
        <div>
          <div>Color By:</div>
          {COLOR_BY_OPTIONS.map(option => (
            <InputWithLabel type='radio' inline
              radioGroup='color-by' value={option} key={option}
              checked={this.eventStore.colorBy === option}
              onChange={this.handleColorByRadioButtonChange}
              >
              <span className='title-case'>{option}</span>
            </InputWithLabel>
          ))}          
        </div>
      </div>
    )
  }

  renderSearch() {
    return (
      <div>
        <div className='title'>
          <b>Search</b>
        </div>
        <DebounceInput debounceTimeout={250}
          value={this.eventStore.searchText}
          onChange={this.handleSearchTextChange} />
      </div>
    );
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
    return (
      <div key={choice.value}>
        <InputWithLabel type='checkbox' 
          checked={choice.isIncluded}
          onChange={e => this.handleFilterCheckboxChange(e, choice)}>
          { this.state.colorBy === title
            ? <span className='color-label' style={{backgroundColor: choice.color}} />
            : null
          }
          {choice.value || <i>Unknown</i>}
        </InputWithLabel>
      </div>
    );
  }

  handleSearchTextChange = (e) => {
    this.eventStore.searchText = e.target.value;
    this.setStateFromStore();
  }

  handleColorByRadioButtonChange = (e) => {
    this.eventStore.colorBy = e.target.value;
    this.setStateFromStore();
  }

  handleAlwaysShowInterestedCheckboxChange = (e) => {
    this.eventStore.alwaysShowInterested = e.target.checked;
    this.setStateFromStore();
  }

  handleHideNotInterestedCheckboxChange = (e) => {
    this.eventStore.hideNotInterested = e.target.checked;
    this.setStateFromStore();
  }

  handleInterestedCheckboxChange = (e, event) => {
    this.eventStore.updateInterested(event, e.target.checked);
    this.setStateFromStore();
  }

  handleFilterCheckboxChange = (e, choice) => {
    this.eventStore.updateIncluded(choice, e.target.checked);
    this.setStateFromStore();
  }

  handleSelectAllOrNoneClick = (e, choices) => {
    for(const key of Object.keys(choices)) {
      this.eventStore.updateIncluded(choices[key], e.target.value === 'true');
    }
    this.setStateFromStore();
  }

  handleEventSelect = (event) => {
    this.setState({selectedEvent: event});
  }

  handleEventDoubleClick = (event) => {
    this.eventStore.updateInterested(event, !this.state.interested[event.id]);
    this.setStateFromStore();
    return false;
  }

  convertToEventLocalTime = (date) => {
    if(!(date instanceof Date)) { return date; }
    
    const adjustment = PST_OFFSET - date.getTimezoneOffset();

    return moment(date).subtract({minutes: adjustment}).toDate();
  }

  getEventProps = (e, start, end, isSelected) => {
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
