const font = window
  .getComputedStyle(document.body)
  .fontFamily.split(",")[0]
  .trim();

console.log("retrieving fonts");
chrome.runtime.sendMessage({ action: "retrieveFont", font: font });
