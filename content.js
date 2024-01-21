const font = window
  .getComputedStyle(document.body)
  .fontFamily.split(",")[0]
  .trim()
  .replace(/^[^a-z\d]*|[^a-z\d]*$/gi, "");

chrome.runtime.sendMessage({
  action: "retrieveFont",
  packData: {
    font: font,
    packedAt: Date.now(),
    href: window.location.href,
    displayHostName: window.location.hostname,
  },
});
