function mouseOver(col) {
    col.style.backgroundColor = "rgba(0, 201, 161, 0.5)";
}

function mouseOut(col) {
    col.style.backgroundColor = "rgba(0, 229, 183, 1)";
}

function writeClick(introColumns, document) {
  var child = introColumns;
  var parent = introColumns.parentElement;
  parent.removeChild(child);

  var form = document.getElementById("writeForm");
  form.style.display = "block";
}

function readClick(col) {
    col.innerHTML = "<span>Read hidden message</span>";
}
