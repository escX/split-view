window.background = (() => {
  const Background = function() {
    this.openTabs = [];
    this.tabData = {};
    this.statusMap = {
      true: { text: chrome.i18n.getMessage('badgeOpen'), color: [24, 144, 255, 255] },
      false: { text: '', color: [0, 0, 0, 0] },
    };
  };

  Background.prototype = {
    addOpenTab(id) {
      if (!this.openTabs.includes(id)) {
        this.openTabs.push(id);
      }
    },
    deleteOpenTab(id) {
      this.openTabs = this.openTabs.filter(item => item !== id);
    },
    getOpenTabs() {
      return this.openTabs;
    },

    setTabData(tabId, data) {
      if (this.tabData[tabId] instanceof Object) {
        Object.assign(this.tabData[tabId], data);
      } else if (data instanceof Object || typeof data === 'object') {
        this.tabData[tabId] = data;
      }
    },
    getTabData(tabId) {
      return this.tabData[tabId] || {};
    },

    changeBrowserAction(status) {
      chrome.browserAction.setBadgeText({ text: background.statusMap[status].text });
      chrome.browserAction.setBadgeBackgroundColor({ color: background.statusMap[status].color });
    },
  };

  return new Background();
})();

chrome.tabs.onSelectionChanged.addListener(tabId => {
  const openTabs = background.getOpenTabs();
  const status = openTabs.includes(tabId);
  background.changeBrowserAction(status);
});

chrome.tabs.onUpdated.addListener(tabId => {
  background.deleteOpenTab(tabId);
  background.changeBrowserAction(false);
});
