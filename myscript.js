document.onclick = function (e) {
    // e.target, e.srcElement and e.toElement contains the element clicked.
    console.log("User clicked a 2 " + e.target.nodeName + " element.");
    console.log(e.target);
    console.log(chrome.runtime.getURL('/modal.html'))
    httpGetAsync(chrome.runtime.getURL('/modal.html'), resp => {
        console.log(resp)
        document.body.insertBefore(createElementFromHTML(resp), document.body.firstChild);
    })
 
};

function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();

    // Change this to div.childNodes to support multiple top-level nodes
    return div.firstChild;
}