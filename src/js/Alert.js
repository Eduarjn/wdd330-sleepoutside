// Reads announcements from alerts.json and shows them at the top of <main>.
// Each alert in the JSON needs a message, a background color and a text color.
export default class Alert {
  constructor(path = '/json/alerts.json') {
    this.path = path;
  }

  async getAlerts() {
    const response = await fetch(this.path);
    if (!response.ok) {
      throw new Error(`Could not load alerts (${response.status})`);
    }
    return response.json();
  }

  buildAlertList(alerts) {
    const section = document.createElement('section');
    section.classList.add('alert-list');

    alerts.forEach((item) => {
      const p = document.createElement('p');
      p.textContent = item.message;
      p.style.backgroundColor = item.background;
      p.style.color = item.color;
      section.appendChild(p);
    });

    return section;
  }

  async init(parentSelector = 'main') {
    try {
      const alerts = await this.getAlerts();
      const parent = document.querySelector(parentSelector);
      if (!Array.isArray(alerts) || alerts.length === 0 || !parent) {
        return;
      }
      parent.prepend(this.buildAlertList(alerts));
    } catch (err) {
      // Alerts are optional: if the file is missing the page still works.
    }
  }
}
