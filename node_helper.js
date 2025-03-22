const NodeHelper = require("node_helper");
const Parser = require("rss-parser");
const parser = new Parser();

module.exports = NodeHelper.create({
  start: function () {
    console.log("MMM-CyberSentinel helper started");
  },

  socketNotificationReceived: function (notification, config) {
    if (notification === "FETCH_INCIDENTS") {
      this.fetchFeeds(config.sources);
    }
  },

  async fetchFeeds(sources) {
    const feeds = {
      BLEEPING: "https://www.bleepingcomputer.com/feed/",
      THN: "https://feeds.feedburner.com/TheHackersNews",
      NVD: "https://nvd.nist.gov/feeds/xml/cve/misc/nvd-rss-analyzed.xml"
    };

    let results = [];

    for (let source of sources) {
      try {
        let feed = await parser.parseURL(feeds[source]);
        feed.items.forEach(item => {
          results.push({
            title: item.title,
            link: item.link,
            pubDate: item.pubDate,
            source: source
          });
        });
      } catch (e) {
        console.error(`Error fetching ${source} feed:`, e.message);
      }
    }

    results.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
    this.sendSocketNotification("INCIDENTS_RESULT", results);
  }
});
