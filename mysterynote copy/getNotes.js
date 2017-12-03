window.onload = function() {
    getMessages(document);
    document.body.onkeydown=function(e){
        var keyCode = (window.event) ? event.keyCode : e.which;
        if(keyCode==13)
        {
            return false;
        }
        else if(keyCode == 37 || keyCode == 8 || keyCode == 46) {//left arrow, backspace, delete
            getPrevNote(document);
        }
        else if(keyCode == 39 || keyCode == 32) {//right arrow, space
            getNextNote(document);
        }
    };
};

function escapeHtml(text) {
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

function getIndex(size) {
    var randomIndex = Math.floor(Math.random() * (size));
    if("true".localeCompare(localStorage.getItem(randomIndex.toString() + "randomIndexHasBeenShown")) == 0) {
        return getIndex(size);
    }
    return randomIndex;
}

function getNextNote(document) {
    var index = parseInt(localStorage.getItem('messageIndex')) + 1;
    var size = parseInt(localStorage.getItem('messagesSize'));
    if(index > size) {
        document.getElementById('noteString').innerHTML = "";
        document.getElementById('alertString').innerHTML = "You've read all notes for now! " +
            "Try writing a note, or come back later to see the new ones!";
        index = size + 1;
        localStorage.setItem('messageIndex', index.toString());
        return;
    }

    if("true".localeCompare(localStorage.getItem(index.toString() + "indexHasBeenShown")) == 0) {
        //document.getElementById('noteString').innerHTML = "already been here";
        document.getElementById('alertString').innerHTML = "";
        document.getElementById('noteString').innerHTML = localStorage.getItem(localStorage.getItem(index.toString()+"orderOfShowing"));
        localStorage.setItem('messageIndex', index.toString());
        return;
    } else {
        var randomIndex = getIndex(size);
        document.getElementById('alertString').innerHTML = "";
        document.getElementById('noteString').innerHTML = localStorage.getItem(randomIndex.toString());
        localStorage.setItem(index.toString() + "orderOfShowing", randomIndex.toString());
        localStorage.setItem(randomIndex.toString() + "randomIndexHasBeenShown", "true");
        localStorage.setItem(index.toString() + "indexHasBeenShown", "true");
        localStorage.setItem('messageIndex', index.toString());
    }
}

function getPrevNote(document) {
    var index = parseInt(localStorage.getItem('messageIndex')) - 1;

    if(index <= 0) {
        //index = 0;
        //localStorage.setItem('messageIndex', index.toString());
        return;
    }

    var targetIndex = localStorage.getItem(index.toString() + "orderOfShowing");
    document.getElementById('alertString').innerHTML = "";
    document.getElementById('noteString').innerHTML = localStorage.getItem(targetIndex);


    localStorage.setItem('messageIndex', index.toString());
}

// handles the click event for link 1, sends the query
function getMessages(document) {
    getRequest(
        '/getNotes.php', // URL for the PHP file
        drawOutput,  // handle successful request
        drawError    // handle error
    );
    return false;
}
// handles drawing an error message
function drawError() {
    var container = document.getElementById('noteString');
    container.innerHTML = 'Bummer: there was an error!';
}
// handles the response, adds the html
function drawOutput(responseText) {
    var jsonData = JSON.parse(responseText);
    var i = 0;
    var size = jsonData.messages.length;
    for (i = 0; i < size; i++) {
        localStorage.setItem(i.toString(), escapeHtml(jsonData.messages[i].message));
        localStorage.setItem(i.toString() + "orderOfShowing", size.toString());
        localStorage.setItem(i.toString() + "indexHasBeenShown", "false");
        localStorage.setItem(i.toString() + "randomIndexHasBeenShown", "false");
    }

    var zero = 0;
    localStorage.setItem('messagesSize', size.toString());
    localStorage.setItem('messageIndex', zero.toString());

    getNextNote(document);
}
// helper function for cross-browser request object
function getRequest(url, success, error) {
    var req = false;
    try{
        // most browsers
        req = new XMLHttpRequest();
    } catch (e){
        // IE
        try{
            req = new ActiveXObject("Msxml2.XMLHTTP");
        } catch(e) {
            // try an older version
            try{
                req = new ActiveXObject("Microsoft.XMLHTTP");
            } catch(e) {
                return false;
            }
        }
    }
    if (!req) return false;
    if (typeof success != 'function') success = function () {};
    if (typeof error!= 'function') error = function () {};
    req.onreadystatechange = function(){
        if(req.readyState == 4) {
            return req.status === 200 ?
                success(req.responseText) : error(req.status);
        }
    }
    req.open("GET", url, true);
    req.send(null);
    return req;
}