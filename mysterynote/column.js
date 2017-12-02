function mouseOverWrite(document) {
    var picture = document.getElementById('writePicture');
    picture.style.opacity = 0.7;
}

function mouseOutWrite(document) {
    var picture = document.getElementById('writePicture');
    picture.style.opacity = 0.9;
}

function mouseOverRead(document) {
    var picture = document.getElementById('readPicture');
    picture.style.opacity = 0.8;
}

function mouseOutRead(document) {
    var picture = document.getElementById('readPicture');
    picture.style.opacity = 1;
}

function writeClick(document) {
    document.location.href="/write_note.html";
}

function readClick(document) {
    document.location.href="/read_note.html";
}

function mouseOverNextMessage(div) {
    div.style.opacity = 0.8;
}

function mouseOutNextMessage(div) {
    div.style.opacity = 1;
}

function readNext(document) {
    document.location.reload(true);
}

function mouseOverWriteNow(div) {
    div.style.opacity = 0.6;
}

function mouseOutWriteNow(div) {
    div.style.opacity = 1;
}

function mouseOverPrevMessage(div) {
    div.style.opacity = 0.8;
}

function mouseOutPrevMessage(div) {
    div.style.opacity = 1;
}