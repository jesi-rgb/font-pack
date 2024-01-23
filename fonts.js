document.addEventListener("DOMContentLoaded", function() {
  chrome.storage.sync.get("fonts", function(data) {
    const fonts = data.fonts || [];
    displayFonts(fonts);
  });

  document.getElementById("removeFonts").addEventListener("click", () => {
    chrome.storage.sync.set({ fonts: [] });
    window.location.reload();
  });
});

const rtf1 = new Intl.RelativeTimeFormat("en", { style: "short" });
function displayFonts(fonts) {
  const fontList = document.getElementById("fontList");
  let hoveredFont = undefined;
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
        li.setAttribute("data-font", fontData.font);

        const font = document.createElement("div");
        font.classList = "title";
        font.style = `font-family: ${fontData.font}, Amulya`;
        font.textContent = fontData.instances + "x " + fontData.font;

        const href = document.createElement("a");
        href.href = fontData.href;
        href.id = "href";
        href.textContent = fontData.displayHostName;

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

  const listItems = document.querySelectorAll("li");
  // Add event listeners to each list item
  listItems.forEach(function(item) {
    item.addEventListener("mouseover", function() {
      var title = item.getAttribute("data-font");

      listItems.forEach(function(li) {
        if (li.getAttribute("data-font") === title) {
          li.classList.add("highlight");
        } else {
          li.classList.remove("highlight");
        }
      });
    });

    item.addEventListener("mouseout", function() {
      // Remove highlights on mouseout
      listItems.forEach(function(li) {
        li.classList.remove("highlight");
      });
    });
  });
}
