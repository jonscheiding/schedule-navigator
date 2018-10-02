import randomColor from 'randomcolor';

import events from './events.json';

for(const event of events) {
  event.start = new Date(Date.parse(event.start));
  event.end = new Date(Date.parse(event.end));
}

export default class EventsStore {
  constructor() {
    this.events = events.filter(e => e.title.startsWith('A'));

    this.topics = this._createMap(e => e.topic, 'topic');
    this.locations = this._createMap(e => e.sessionLocation, 'location');
    this.colorBy = 'location';
  }

  getFilteredList() {
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

  _createMap(fn, type) {
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
}