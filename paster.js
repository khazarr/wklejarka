const pressed = []
const MAX_LENGTH = 10
const test_code = '/te'
const test_insert = 'super testowe lelel'

const snippets = [
  {
    code: '/te',
    text: 'super testowe lele'
  },
  {
    code: '/te',
    text: 'super testowe lele'
  },
]

function textAreaHandle(textArea, foundCode, snippetInsert){
  console.log('podmienianko ')
  console.log(textArea.value)
  console.log(textArea.value.includes(test_code))
  textArea.value = textArea.value.replace(foundCode, snippetInsert)

}

document.addEventListener('keyup', function (event) {
  const key = event.key; // "a", "1", "Shift", etc.
  pressed.push(key)

  pressed.splice(-MAX_LENGTH - 1, pressed.length - MAX_LENGTH)
  console.log(`czy zawiera? ${pressed.join('').includes(test_code)}`)
  console.log(`current target ${event.target.type}`)
  console.log(event)
  console.log(pressed)

  if (pressed.join('').includes(test_code) && event.target.type == 'textarea') {

    textAreaHandle(event.target, test_code, test_insert)
    pressed.length = 0 //clear array
  }
});

// document.addEventListener('keydown', function (event) {
//   const key = event.key; // "a", "1", "Shift", etc.
//   console.log('keydown')
//   console.log(event)
//   console.log(key)
// });
// document.addEventListener('keyup', function (event) {
//   const key = event.key; // "a", "1", "Shift", etc.
//   console.log('keyup')
//   console.log(event)
//   console.log(key)
// });

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



// function httpGetAsync(theUrl, callback) {
//     var xmlHttp = new XMLHttpRequest();
//     xmlHttp.onreadystatechange = function () {
//         if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
//             callback(xmlHttp.responseText);
//     }
//     xmlHttp.open("GET", theUrl, true); // true for asynchronous 
//     xmlHttp.send(null);
// }

// function createElementFromHTML(htmlString) {
//     var div = document.createElement('div');
//     div.innerHTML = htmlString.trim();

//     // Change this to div.childNodes to support multiple top-level nodes
//     return div.firstChild;
// }