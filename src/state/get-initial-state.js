import moment from 'moment';

const PST_OFFSET_HOURS = 8;

function parseDateIntoEventLocalTime(dateString) {
  const date = new Date(Date.parse(dateString));
  const adjustment = (PST_OFFSET_HOURS * 60) - date.getTimezoneOffset();
  return moment(date).subtract({ minutes: adjustment }).toDate();
}

function cleanupEvents(events) {
  for(const event of events) {
    cleanupDates(event);
  }
}

function cleanupRange(range) {
  cleanupDates(range);
  range.end = moment(range.end).subtract({seconds: 1}).toDate();
}

function cleanupDates(dates) {
  dates.start = parseDateIntoEventLocalTime(dates.start);
  dates.end = parseDateIntoEventLocalTime(dates.end);
}

function buildFilters(events, filterKeys) {
  return filterKeys.toObject(
    filterKey => events.toObject(
      event => event[filterKey],
      event => ({
        value: event[filterKey],
        isSelected: true
      })
    )
  );
}

export default function() {
  const events = require('../data/events.json');
  const range = require('../data/range.json');

  cleanupEvents(events);
  cleanupRange(range);

  const filters = buildFilters(events, ['location', 'type', 'topic']);
  
  const defaults = {
    view: 'day',
    date: range.start
  };

  return { events, range, filters, defaults };
}
