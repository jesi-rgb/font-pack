const font = window
  .getComputedStyle(document.body)
  .fontFamily.split(",")[0]
  .trim();

chrome.runtime.sendMessage({
  action: "retrieveFont",
  packData: {
    font: font,
    packedAt: Date.now(),
    href: window.location.hostname,
  },
});
