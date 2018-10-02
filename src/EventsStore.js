import randomColor from 'randomcolor';

import events from './events.json';

for(const event of events) {
  event.start = new Date(Date.parse(event.start));
  event.end = new Date(Date.parse(event.end));
}

export default class EventsStore {
  constructor() {
    this.events = events.filter(e => e.title.startsWith('A'));

    this.topics = this._createFilterMap(e => e.topic, 'topic');
    this.locations = this._createFilterMap(e => e.sessionLocation, 'location');
    this.interested = this._createInterestedMap();
    this.colorBy = 'location';
    this.excludeNotInterested = false;
  }

  getFilteredList() {
    return this.events
      .filter(e =>
        this.topics[e.topic].isIncluded &&
        this.locations[e.sessionLocation].isIncluded &&
        (this.interested[e.id] || !this.excludeNotInterested))
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

  toggleInterested(event) {
    this.interested[event.id] = !this.interested[event.id];
    localStorage.setItem(`${event.id}/isInterested`, this.interested[event.id]);
  }

  updateIncluded(choice, isIncluded) {
    choice.isIncluded = isIncluded;
    localStorage.setItem(`${choice.type}/${choice.value}/isIncluded`, isIncluded);
  }

  updateExcludeNotInterested(value) {
    this.excludeNotInterested = value;
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

      map[value] = {
        value: value,
        type: type,
        color: randomColor({luminosity: 'light'}),
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