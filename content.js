const font = window.getComputedStyle(document.body).fontFamily;
updateFontList(font);

function updateFontList(font) {
  chrome.storage.sync.get("fonts", function(data) {
    const fonts = data.fonts || [];
    fonts.push(font);
    chrome.storage.sync.set({ fonts: fonts });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  chrome.runtime.sendMessage({
    action: "retrieveFont",
    font: font.split(",")[0],
  });

  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.action === "retrieveFont") {
        updateFontList(request.font);
      }
    },
  );
});
