import randomColor from 'randomcolor';

import events from './events.json';
import colors from './colors.json';

for(const event of events) {
  event.start = new Date(Date.parse(event.start));
  event.end = new Date(Date.parse(event.end));

  switch(event.location) {
    case 'Aria East':
    case 'Aria West':
      event.location = 'Aria';
      break;
  }
}

export const COLOR_BY_OPTIONS = [ 'location', 'topic', 'type' ];

export default class EventsStore {
  constructor() {
    this.events = events;
    this.colors = colors;

    this.topics = this._createFilterMap(e => e.topic, 'topic');
    this.locations = this._createFilterMap(e => e.location, 'location');
    this.types = this._createFilterMap(e => e.type, 'type');
    this.interested = this._createInterestedMap();
    this.colorBy = 'location';
    this.searchText = null;
    this.alwaysShowInterested = false;
    this.hideNotInterested = false;
  }

  getFilteredList() {
    return this.events
      .filter(e => 
        (this.interested[e.id] && this.alwaysShowInterested) ||
        (
          this.topics[e.topic].isIncluded && 
          this.locations[e.location].isIncluded &&
          this.types[e.type].isIncluded &&
          (this.interested[e.id] || !this.hideNotInterested) &&
          (this._matchesSearchText(e))
        ))
      .map(e => ({
        ...e,
        color: this._getColor(e)
      }))
      ;
  }

  updateInterested(event, value) {
    this.interested[event.id] = value;
    localStorage.setItem(`${event.id}/isInterested`, this.interested[event.id]);
  }

  updateIncluded(choice, isIncluded) {
    choice.isIncluded = isIncluded;
    localStorage.setItem(`${choice.type}/${choice.value}/isIncluded`, isIncluded);
  }

  _matchesSearchText(e) {
    if(this.searchText === null || this.searchText === '') {
      return true;
    }

    const searchText = this.searchText.toLowerCase();
    for(const field of [e.title, e.abbreviation]) {
      if(!field) { continue; }
      if(field.toLowerCase().indexOf(searchText) === -1) {
        continue;
      }

      return true;
    }

    return false;
  }

  _getColor(e) {
    switch(this.colorBy) {
      case 'location':
        return this.locations[e.location].color;
      case 'topic':
        return this.topics[e.topic].color;
      case 'type':
        return this.types[e.type].color;
      default: 
        return undefined;
    }
  }

  _createFilterMap(fn, type) {
    var uniqueValues = Array.from(new Set(this.events.map(e => fn(e))));
    var map = {};

    for(const value of uniqueValues) {
      const isIncluded = localStorage.getItem(`${type}/${value}/isIncluded`);

      let color;
      if(this.colors[type] && this.colors[type][value]) {
        color = this.colors[type][value];
      } else {
        color = randomColor();
      }

      map[value] = {
        value: value,
        type: type,
        color: color,
        isIncluded: isIncluded !== 'false'
      }
    }

    return map;
  }

  _createInterestedMap() {
    const map = {};
    for(const event of this.events) {
      const isInterested = localStorage.getItem(`${event.id}/isInterested`);
      map[event.id] = isInterested === 'true';
    }
    return map;
  }
}
