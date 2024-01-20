document.addEventListener("DOMContentLoaded", function() {
  chrome.tabs.create({ url: chrome.runtime.getURL("fonts.html") });
});
