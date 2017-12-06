let bookmark;
let blob;
let beautify = false;

function getBookmark(cb) {
  chrome.bookmarks.getTree(cb);
}

function save() {
  getBookmark((tree) => {
    bookmark = beautify ? JSON.stringify(tree, null, 2) : JSON.stringify(tree);
    blob = new Blob([bookmark], {type: "application/json;charset=utf-8"});

    saveAs(blob, "bookmarks.json");
  });
}

function toggle(event) {
  if (event.target.tagName === 'LABEL') {
    beautify = !beautify;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  var button = document.getElementById('button');
  var checkbox = document.getElementById('beautify');

  checkbox.addEventListener('click', toggle);
  button.addEventListener('click', save);
});
