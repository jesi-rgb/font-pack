document.addEventListener("DOMContentLoaded", function() {
  chrome.storage.sync.get("fonts", function(data) {
    const fonts = data.fonts || [];
    displayFonts(fonts);
  });

  document.getElementById("removeFonts").addEventListener("click", () => {
    chrome.storage.sync.set({ fonts: [] });
  });
});

const rtf1 = new Intl.RelativeTimeFormat("en", { style: "short" });
function displayFonts(fonts) {
  const fontList = document.getElementById("fontList");
  fontList.innerHTML = "";

  if (fonts.length === 0) {
    fontList.innerHTML = "<p>No fonts recorded yet.</p>";
  } else {
    fonts
      .sort((a, b) => {
        const aDate = new Date(a.packedAt);
        const bDate = new Date(b.packedAt);
        return bDate - aDate;
      })
      .forEach(function(fontData) {
        const li = document.createElement("li");

        const font = document.createElement("div");
        font.textContent = fontData.instances + "x " + fontData.font;

        const href = document.createElement("a");
        href.href = fontData.href;
        href.id = "href";
        href.textContent = fontData.href;

        const date = document.createElement("div");
        date.id = "date";
        date.textContent =
          "last visited: " + new Date(fontData.packedAt).toLocaleString();

        li.appendChild(font);
        li.appendChild(href);
        li.appendChild(date);

        fontList.appendChild(li);
      });
  }
}
