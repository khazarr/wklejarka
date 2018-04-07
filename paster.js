const pressed = []
const MAX_LENGTH = 10


const snippets = new Map();
snippets.set('/te', 'super testowe lele')
snippets.set('/tr', 'inne testowe poważne hasełko\nktóre ma 2 linie')
snippets.set('/qw', {
  modal: 'modal.html'
})

function inputFieldBasicHandle(textArea, foundCode, snippetInsert){
  console.log('podmienianko ')
  textArea.value = textArea.value.replace(foundCode, snippetInsert)
}

function inputFieldModalHandle(textArea, key, value) {
  console.log('inserting modal')
    httpGetAsync(chrome.runtime.getURL('/modal.html'), resp => {
      document.body.insertBefore(createElementFromHTML(resp), document.body.firstChild);
      setTimeout(() => {
        const app = new Vue({
          el: '#inserterForm',
          data: {
            user: {
              'grant_type': 'password',
              username: null,
              password: null,
              'client_id': 'test form'
            },
            submitData: null
          },
          methods: {
            doLogin: function () {
              this.submitData = this.user;
            }
          }
        });
      }, 1000)
 
  })
}
function checkForOccurence(textArea) {
  for (let [key, value] of snippets) {
    if (pressed.join('').includes(key)) {
      typeof value === 'string'
        ? inputFieldBasicHandle(textArea, key, value)
        : inputFieldModalHandle(textArea, key, value)
      pressed.length = 0 //clear array
    }
  }
}

document.addEventListener('keyup', function (event) {
  const key = event.key; // "a", "1", "Shift", etc.
  pressed.push(key)
  pressed.splice(-MAX_LENGTH - 1, pressed.length - MAX_LENGTH)
  console.log(pressed)
  console.log(event)
  console.log(event.target)
  console.log(event.target.type)
  if (event.target.type == 'textarea' || event.target.tagName == 'INPUT') {
    checkForOccurence(event.target)
  }
});



// document.onclick = function (e) {
//   // e.target, e.srcElement and e.toElement contains the element clicked.
//   console.log("User clicked a 2 " + e.target.nodeName + " element.");
// };





// document.onclick = function (e) {
//     // e.target, e.srcElement and e.toElement contains the element clicked.
//     console.log("User clicked a 2 " + e.target.nodeName + " element.");
//     console.log(e.target);
//     console.log(chrome.runtime.getURL('/modal.html'))
//     httpGetAsync(chrome.runtime.getURL('/modal.html'), resp => {
//         console.log(resp)
//         document.body.insertBefore(createElementFromHTML(resp), document.body.firstChild);
//         $('#pasterModal').modal('show')
//     })

// };



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