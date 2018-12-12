$(function() {
  const html = $(`
    <div style='position: absolute; right: 20px; top: 220px; font-size: 16px'>
      <div><a id="load-details">Load Details</a></div>
      <div><a id="extract-details">Extract Details</a></div>
      <div><a id="dump-json">Dump JSON</a></div>
    </div>
  `);

  html.find("#load-details").click(loadDetails);
  html.find("#extract-details").click(extractDetails);
  html.find("#dump-json").click(dumpJson);

  html.insertBefore($('#templateMain'));

  var details = {};

  function loadDetails() {
    const more = $('#getMoreResults');
    if(more.is(':visible')) {
      console.log('Loading more sessions.');
      more[0].click();
      setTimeout(loadDetails, 1000);
      return;
    }

    const sessionRows = $('.sessionRow').toArray();

    const expectedCount = parseInt($('#sessionSearchCount').text());
    if(sessionRows.length < expectedCount) {
      console.warn('Not all sessions are loaded into the view.  Expected %s sessions, but there are %s.', expectedCount, sessionRows.length);
    }

    console.log('Loading session abstracts and schedules.')

    $('.moreLink, .expandSessionImg').each((i, a) => a.click());
  }

  function extractByClass(el, classes) {
    const result = {};
    for(const c of classes ) {
      result[c] = $(el).find('.' + c).text().trim();
    }
    return result;
  }

  function constructDate(date, time) {
    return new Date(Date.parse(date + ' ' + time + ' PDT'));
  }

  function extractDetailsSingle(el) {
    const details = extractByClass(el, ['title', 'abbreviation', 'abstract', 'type', 'track', 'sessionRoom']);

    details.id = el.id;

    details.abbreviation = details.abbreviation
      .replace(/ -$/, '');

    details.sessionRoom = details.sessionRoom
      .replace(/^– /, '');

    const schedulingDetails = details.sessionRoom.split(', ', 2);

    details.sessionLocation = schedulingDetails[0];
    details.sessionRoom = schedulingDetails[1];

    const timeEl = $(el).find('.availableSessions').clone();
    timeEl.children().remove();
    const timeDetails = timeEl.text().match(/^(.*), (.*), (.*) - (.*)$/);
    details.start = constructDate(timeDetails[2], timeDetails[3]);
    details.end = constructDate(timeDetails[2], timeDetails[4]);

    return details;
  }

  function extractDetails() {
    const sessionRows = $('.sessionRow').toArray();
    
    for(const el of sessionRows) {
      const session = extractDetailsSingle(el);
      details[session.id] = session;
    }

    console.log('%s new sessions extracted.  Now there are %s total sessions.', 
      sessionRows.length,
      Object.keys(details).length);
  }

  function dumpJson() {
    console.log(JSON.stringify(details));
  }
});
