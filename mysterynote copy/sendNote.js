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