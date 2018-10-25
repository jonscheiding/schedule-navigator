export const FILTER_KEYS = ['location', 'topic', 'type'];
export const QUERY_KEYS = ['abbreviation', 'title', 'abstract'];

export class EventRepository {
  constructor() {
    this.events = require('./data/events.json');
  }

  getEvents() {
    return this.events;
  }

  getMatchingEvents(filtersByKey, query) {
    return this.events.filter(e =>
      this.matchesFilters(filtersByKey, e) &&
      this.matchesQuery(query, e));
  }

  matchesQuery(query, event) {
    for(const queryKey of QUERY_KEYS) {
      const value = event[queryKey];
      if(value.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
        return true;
      }
    }
    return false;
  }

  matchesFilters(filtersByKey, event) {
    for(const key of FILTER_KEYS) {
      if(!this.matchesFilter(filtersByKey, key, event)) {
        return false;
      }
    }
    return true;
  }

  matchesFilter(filtersByKey, filterKey, event) {
    const filter = filtersByKey[filterKey];
    const filterValue = filter[event[filterKey]];
    return filterValue.isSelected; 
  }

  buildFilter(filterKey) {
    return this.events.toObject(
      event => event[filterKey],
      event => ({
        value: event[filterKey],
        isSelected: true
      })
    );
  }

  buildFiltersByKey() {
    return FILTER_KEYS.toObject(
      key => this.buildFilter(key)
    );
  }
}

export default new EventRepository();
