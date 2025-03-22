# MMM-CyberSentinel

`MMM-CyberSentinel` is a [MagicMirror²](https://magicmirror.builders/) module that displays major cyber security incidents from global threat intelligence sources. It aggregates recent headlines from top security news feeds and sorts them by recency.

---

## 🌐 Sources Tracked

- BleepingComputer
- The Hacker News (THN)
- National Vulnerability Database (NVD)

---

## 🔧 Installation

```bash
cd ~/MagicMirror/modules
git clone https://github.com/YOUR_USERNAME/MMM-CyberSentinel.git
cd MMM-CyberSentinel
npm install
```

---

## ⚙️ Configuration

```javascript
{
  module: "MMM-CyberSentinel",
  position: "top_right",
  config: {
    updateInterval: 15 * 60 * 1000,
    maxItems: 10,
    sources: ["BLEEPING", "THN", "NVD"]
  }
}
```

---

## 🧠 Roadmap

- Filter by region or severity
- Push alerts for critical CVEs
- Integration with ACSC and CERT-AU feeds

---

## 📜 License

MIT © Shane Geisler
