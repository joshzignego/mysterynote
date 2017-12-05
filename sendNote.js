document.getElementById('form').onsubmit = function() {
    return validateForm();
};

function validateForm() {
    var message = document.getElementById('form').firstElementChild.value;
    if (grecaptcha.getResponse() == "" || !message){
        return false;
    }
    return true;
}

window.onload = function () {
    document.getElementById("writeForm").onkeyup = textEntered;
    textEntered();
};

function captchaResponse() {
    if (!document.getElementById("message").value) {
        document.getElementById("submitNoteButton").disabled = true;
        document.getElementById("submitNoteButton").style.opacity = "0.5";
    } else {
        document.getElementById("submitNoteButton").disabled = false;
        document.getElementById("submitNoteButton").style.opacity = "1";
    }
}

function textEntered() {
    if (!document.getElementById("message").value || grecaptcha.getResponse() == "") {
        document.getElementById("submitNoteButton").disabled = true;
        document.getElementById("submitNoteButton").style.opacity = "0.5";
    } else {
        document.getElementById("submitNoteButton").disabled = false;
        document.getElementById("submitNoteButton").style.opacity = "1";
    }
}