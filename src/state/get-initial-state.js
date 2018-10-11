import moment from 'moment';

const PST_OFFSET_HOURS = 8;

function parseDateIntoEventLocalTime(dateString) {
  const date = new Date(Date.parse(dateString));
  const adjustment = (PST_OFFSET_HOURS * 60) - date.getTimezoneOffset();
  return moment(date).subtract({ minutes: adjustment }).toDate();
}

function cleanupEvents(events) {
  for(const event of events) {
    event.start = parseDateIntoEventLocalTime(event.start);
    event.end = parseDateIntoEventLocalTime(event.end);
  }
}

function getTimeComparisonValue(date) {
  return parseInt(moment(date).format("HHmmss"));
}

function compareTimes(a, b) {
  return getTimeComparisonValue(a) - getTimeComparisonValue(b);
}

function compareDates(a, b) {
  return a - b;
}

function adjustDateToDay(date, dayDate) {
  return moment(date)
    .dayOfYear(moment(dayDate).dayOfYear())
    .toDate();
}

function determineCalendarRange(events) {
  const allDates = 
    events.map(e => e.start)
    .concat(events.map(e => e.end));

  const datesByTimeOfDay = allDates.slice(0).sort(compareTimes);
  const datesByDate = allDates.slice(0).sort(compareDates);

  const start = adjustDateToDay(datesByTimeOfDay[0], datesByDate[0]);
  const end = adjustDateToDay(
    datesByTimeOfDay[datesByTimeOfDay.length - 1],
    datesByDate[datesByDate.length - 1]);

  return { start, end };
}

export default function() {
  const events = require('../data/events.json');
  cleanupEvents(events);

  const calendarSettings = {
    range: determineCalendarRange(events)
  };
  
  return { events, calendarSettings };
}
