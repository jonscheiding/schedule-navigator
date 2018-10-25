export class ColorHelper {
  constructor() {
    this.colors = require('./data/colors.json');
  }

  colorEvents(events, colorBy) {
    return events.map(event => ({
      ...event,
      color: this.getEventColor(event, colorBy)
    }));
  }

  getEventColor = (event, colorBy) => {
    const colors = this.colors[colorBy];
    const value = event[colorBy];
    return colors[value];
  };
}

export default new ColorHelper();
