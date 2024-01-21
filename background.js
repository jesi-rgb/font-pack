function updateFontList(fontData) {
  chrome.storage.sync.get("fonts", function(data) {
    const fonts = data.fonts || [];
    const findInstances = fonts.findIndex(
      (f) =>
        f.font == fontData.font &&
        fontData.displayHostName == f.displayHostName,
    );
    if (findInstances == -1) {
      fontData.instances = 1;
      fonts.push(fontData);
    } else {
      fonts[findInstances].instances += 1;
      fonts[findInstances].packedAt = Date.now();
    }
    chrome.storage.sync.set({ fonts: fonts });
  });
}

chrome.runtime.onMessage.addListener(
  async function(request, sender, sendResponse) {
    console.log("updating fonts");
    if (request.action === "retrieveFont") {
      updateFontList(request.packData);
    }
  },
);
