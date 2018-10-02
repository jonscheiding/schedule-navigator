import randomColor from 'randomcolor';

import events from './events.json';

for(const event of events) {
  event.start = new Date(Date.parse(event.start));
  event.end = new Date(Date.parse(event.end));
}

export default class EventsStore {
  constructor() {
    this.events = events.filter(e => e.title.startsWith('A'));

    this.topics = this._createMap(e => e.topic);
    this.locations = this._createMap(e => e.sessionLocation);
    this.colorBy = 'location';
  }

  getFilteredList() {
    console.log(this);
    return this.events
      .filter(e =>
        this.topics[e.topic].isIncluded &&
        this.locations[e.sessionLocation].isIncluded)
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

  setLocationIncluded(key, isIncluded) {
    this.locations[key].isIncluded = true;
  }

  _getColor(e) {
    switch(this.colorBy) {
      case 'location':
        return this.locations[e.sessionLocation].color;
      case 'topic':
        return this.topics[e.topic].color;
    }
  }

  _createMap(fn) {
    var uniqueValues = Array.from(new Set(this.events.map(e => fn(e))));
    var map = {};

    for(const value of uniqueValues) {
      map[value] = {
        value: value,
        color: randomColor({luminosity: 'light'}),
        isIncluded: true
      }
    }

    return map;
  }
}