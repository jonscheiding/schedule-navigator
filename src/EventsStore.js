import randomColor from 'randomcolor';

import events from './events.json';
import colors from './colors.json';

for(const event of events) {
  event.start = new Date(Date.parse(event.start));
  event.end = new Date(Date.parse(event.end));
}

export default class EventsStore {
  constructor() {
    this.events = events;
    this.colors = colors;

    this.topics = this._createFilterMap(e => e.topic, 'topic');
    this.locations = this._createFilterMap(e => e.sessionLocation, 'location');
    this.interested = this._createInterestedMap();
    this.colorBy = 'location';
    this.alwaysShowInterested = true;
  }

  getFilteredList() {
    return this.events
      .filter(e => 
        (this.interested[e.id] && this.alwaysShowInterested) ||
        (this.topics[e.topic].isIncluded && this.locations[e.sessionLocation].isIncluded))
      .map(e => ({
        ...e,
        color: this._getColor(e)
      }))
      ;
  }

  colorByLocation() {
    this.colorBy = 'location';
  }

  colorByTopic() {
    this.colorBy = 'topic';
  }

  updateInterested(event, value) {
    this.interested[event.id] = value;
    localStorage.setItem(`${event.id}/isInterested`, this.interested[event.id]);
  }

  updateIncluded(choice, isIncluded) {
    choice.isIncluded = isIncluded;
    localStorage.setItem(`${choice.type}/${choice.value}/isIncluded`, isIncluded);
  }

  _getColor(e) {
    switch(this.colorBy) {
      case 'location':
        return this.locations[e.sessionLocation].color;
      case 'topic':
        return this.topics[e.topic].color;
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
