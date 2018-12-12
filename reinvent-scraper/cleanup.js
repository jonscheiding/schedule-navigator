const fs = require('fs');

const sessionsMap = require('./raw.json');
const topicMap = require('./topics.json');

const sessions = Object.keys(sessionsMap)
  .map(id => sessionsMap[id]);

function getTopic(session) {
  var topicKey = session.abbreviation.replace(/\d+.*$/, '');
  return topicMap[topicKey];
}

function getLocation(session) {
  switch(session.sessionLocation) {
    case 'Aria East':
    case 'Aria West':
      return 'Aria';
    default:
      return session.sessionLocation;
  }
}

function adjustDate(date) {
  var date = new Date(Date.parse(date));
  date.setTime(date.getTime() + (60 * 60 * 1000));
  date.setFullYear(date.getFullYear() + 17);
  
  return date;
}

function cleanupAbstract(abstract) {
  return abstract.replace(/ View Less$/, '');
}

for(const session of sessions) {
  session.topic = getTopic(session);
  session.location = getLocation(session);
  session.start = adjustDate(session.start);
  session.end = adjustDate(session.end);
  session.abstract = cleanupAbstract(session.abstract);
}

fs.writeFileSync('./cleaned.json', JSON.stringify(sessions, null, '  '));
