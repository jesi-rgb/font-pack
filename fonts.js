document.addEventListener("DOMContentLoaded", function() {
  chrome.storage.sync.get("fonts", function(data) {
    const fonts = data.fonts || [];
    displayFonts(fonts);
  });
});

function displayFonts(fonts) {
  const fontList = document.getElementById("fontList");
  fontList.innerHTML = "";

  if (fonts.length === 0) {
    fontList.innerHTML = "<p>No fonts recorded yet.</p>";
  } else {
    fonts.forEach(function(font) {
      const li = document.createElement("li");
      li.textContent = font;
      fontList.appendChild(li);
    });
  }
}
