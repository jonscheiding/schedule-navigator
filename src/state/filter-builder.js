export const FILTER_PROPERTIES = ['location', 'topic', 'type'];

export class FilterBuilder {
  constructor(filterKey) {
    this.filterKey = filterKey;
  }

  buildFilter(events) {
    return events.toObject(
      event => event[filterKey],
      event => ({
        value: event[filterKey],
        isSelected: true
      })
    );
  }
}

export default FILTER_BUILDERS = FILTER_PROPERTIES.toObject(
  key => new FilterBuilder(key)
);
