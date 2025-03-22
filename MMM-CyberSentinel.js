/* Magic Mirror Module: MMM-CyberSentinel
 * By Shane Geisler (with ChatGPT assistance)
 * Displays major cyber security incidents globally from curated sources.
 */

Module.register("MMM-CyberSentinel", {
  defaults: {
    updateInterval: 15 * 60 * 1000,
    maxItems: 10,
    sources: ["BLEEPING", "THN", "NVD"]
  },

  start: function () {
    this.articles = [];
    this.sendSocketNotification("FETCH_INCIDENTS", this.config);
    this.scheduleUpdate();
  },

  getStyles: function () {
    return ["MMM-CyberSentinel.css"];
  },

  scheduleUpdate: function () {
    setInterval(() => {
      this.sendSocketNotification("FETCH_INCIDENTS", this.config);
    }, this.config.updateInterval);
  },

  socketNotificationReceived: function (notification, payload) {
    if (notification === "INCIDENTS_RESULT") {
      this.articles = payload;
      this.updateDom();
    }
  },

  getDom: function () {
    const wrapper = document.createElement("div");
    if (this.articles.length === 0) {
      wrapper.innerHTML = "No recent cyber incidents.";
      return wrapper;
    }

    const list = document.createElement("ul");
    list.className = "cyber-list";

    this.articles.slice(0, this.config.maxItems).forEach((item) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `<strong>${item.title}</strong><br><span class="source">${item.source}</span> - <span class="time">${item.pubDate}</span>`;
      list.appendChild(listItem);
    });

    wrapper.appendChild(list);
    return wrapper;
  }
});
