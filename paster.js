const pressed = []
const MAX_LENGTH = 10

document.addEventListener('keydown', function (event) {
  const key = event.key; // "a", "1", "Shift", etc.
  console.log('keydown')
  console.log(event)
  console.log(key)
});
document.addEventListener('keyup', function (event) {
  const key = event.key; // "a", "1", "Shift", etc.
  console.log('keyup')
  console.log(event)
  console.log(key)
});

document.onclick = function (e) {
  // e.target, e.srcElement and e.toElement contains the element clicked.
  console.log("User clicked a 2 " + e.target.nodeName + " element.");
};

// document.addEventListener('keydown', function (event) {
//     const key = event.key; // "a", "1", "Shift", etc.
//     pressed.push(key)
//     pressed.splice(-MAX_LENGTH - 1, pressed.length - MAX_LENGTH)
//     console.log(pressed)
//     console.log(event)
//     console.log(key)
// });

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


// observerConfig = {
//   attributes: !0,
//   childList: !0,
//   subtree: !0,
//   attributeFilter: ["contenteditable"]
// }

// let callback = function (mutationsList) {
//   for (var mutation of mutationsList) {
//     console.log('The ' + mutation.attributeName);
//   }
// };

// let observer = new MutationObserver(callback);

// observer.observe(document, observerConfig);