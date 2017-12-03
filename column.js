function mouseOver(col) {
    col.style.backgroundColor = "rgba(0, 201, 161, 0.5)";
}

function mouseOut(col) {
    col.style.backgroundColor = "rgba(0, 229, 183, 1)";
}

function writeClick(introColumns, document) {
  document.location.href="/write_note.html";
}

function readClick(introColumns, document) {
  document.location.href="/read_note.html";
}
