function updateFontList(font) {
  chrome.storage.sync.get("fonts", function(data) {
    const fonts = data.fonts || [];
    fonts.push(font);
    chrome.storage.sync.set({ fonts: fonts });
  });
}

chrome.runtime.onMessage.addListener(
  async function(request, sender, sendResponse) {
    console.log("updating fonts");
    if (request.action === "retrieveFont") {
      updateFontList(request.font);
    }
  },
);
