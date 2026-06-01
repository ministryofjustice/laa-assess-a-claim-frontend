// Custom TypeScript goes in here.
import "#src/scripts/asciiArt.js";
import "#src/scripts/demo/pdf-viewer.js"

document.querySelectorAll('[data-module="back-link"]').forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    window.history.back();
  });
});