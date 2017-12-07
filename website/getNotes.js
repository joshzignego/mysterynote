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
        else if(keyCode == 39) {//right arrow
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

function getNextNote(document) {
    var index = parseInt(localStorage.getItem('messageIndex')) + 1;
    var size = parseInt(localStorage.getItem('messagesSize'));
    if(index > size) {
        document.getElementById('noteString').innerHTML = "You've read all notes for now! " +
                "Try writing a note, or come back later to see the new ones!";
        index = size + 1;
        localStorage.setItem('messageIndex', index.toString());
        return;
    }

    if("true".localeCompare(localStorage.getItem(index.toString() + "indexHasBeenShown")) == 0) {
        document.getElementById('noteString').innerHTML = localStorage.getItem(index.toString());
        localStorage.setItem('messageIndex', index.toString());
        return;
    } else {
        document.getElementById('noteString').innerHTML = localStorage.getItem(index.toString());
        localStorage.setItem(index.toString() + "indexHasBeenShown", "true");
        localStorage.setItem('messageIndex', index.toString());
    }
}

function getPrevNote(document) {
    var index = parseInt(localStorage.getItem('messageIndex')) - 1;

    if(index <= 0) {
        return;
    }

    document.getElementById('noteString').innerHTML = localStorage.getItem(index.toString());
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

function shuffle(array) {
    var tmp, current, top = array.length;
    if(top) while(--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
    }
    return array;
}

// handles drawing an error message
function drawError() {
    var container = document.getElementById('noteString');
    container.innerHTML = 'Bummer: there was an error!';
}

// handles the response, adds the html
function drawOutput(responseText) {
    var jsonData = JSON.parse(responseText);
    document.getElementById('noteString').innerHTML = jsonData[4];


    /*
    var size = jsonData.messages.length;

    var a = [size];
    for (var j=0; j<size; j++) {
        a[j] = j;
    }

    a = shuffle(a);

    for (var i = 0; i < size; i++) {
        localStorage.setItem((i+1).toString(), escapeHtml(jsonData.messages[a[i]].message));
        localStorage.setItem((i+1).toString() + "indexHasBeenShown", "false");
    }

    var init = 0;
    localStorage.setItem('messagesSize', size.toString());
    localStorage.setItem('messageIndex', init.toString());

    getNextNote(document);*/
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