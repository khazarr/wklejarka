const pressed = []
const MAX_LENGTH = 10


const snippets = new Map();
snippets.set('/te', 'super testowe lele')
snippets.set('/tr', 'inne testowe poważne hasełko\nktóre ma 2 linie')
snippets.set('/qw', {
  modal: 'modal.html',
  HTML: 'Hehe dzieki %imie% to jest ostra beka. \n smieszna sprawa %imie% \n ciekawe jak to wyjdzie %imie% asda',
  inputs: [
    {
      type: 'text',
      variable: 'imie',
      value: '',
      snippet: 'Hehe dzieki <b>imie</b>'
    }]
})

function inputFieldBasicHandle(textArea, foundCode, snippetInsert){
  console.log('podmienianko ')
  textArea.value = textArea.value.replace(foundCode, snippetInsert)
}

function inputFieldModalHandle(textArea, key, value) {
  console.log('inserting modal')
  textArea.blur()
    httpGetAsync(chrome.runtime.getURL('/modal.html'), resp => {
      console.log(generateFormHTML(value))
      document.body.insertBefore(createElementFromHTML(generateFormHTML(value)), document.body.firstChild);
      setTimeout(() => {
        const app = new Vue({
          el: '#inserterForm',
          data: {
            HTML: value.HTML,
            inputs: value.inputs,
            snippetsRegex: /<b>.+<\/b>/,
            halko: ''
          },
          mounted() {
            // document.querySelector(this.inputs[0].variable).focus()
          },
          methods: {
            onInputChange(el) {
              console.log(el)
              console.log(this)
              // el.snippet = el.snippet.replace(this.snippetsRegex,`<b>${el.value}</b>`)
            },
            onEnterPressed() {
              console.log('enter pressed')
              console.log(this.$el.childNodes[0].childNodes)
              let outputString = ""

              this.$el.childNodes[0].childNodes.forEach((el) => {
                el.nodeName == "INPUT"
                  ? outputString += el.value
                  : outputString += el.data
                console.log(outputString)
                console.log(el)
              })
              console.log('RESULT')
              console.log(outputString)
              console.log(textArea.value)
              textArea.value = textArea.value.replace(key, outputString)
              const thisForm = document.querySelector('#inserterForm')
              thisForm.parentNode.removeChild(thisForm);
              textArea.focus()
              this.$destroy()
            }
          }
        });
      }, 100)
      setTimeout(()=>{
        console.log('focusing')
        document.querySelector(`#${value.inputs[0].variable}`).focus()
      },300)
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
  // console.log(pressed)
  // console.log(event)
  // console.log(event.target)
  // console.log(event.target.type)
  if (event.target.type == 'textarea' || event.target.tagName == 'INPUT') {
    checkForOccurence(event.target)
  }
});



// document.onclick = function (e) {
//   // e.target, e.srcElement and e.toElement contains the element clicked.
//   console.log("User clicked a 2 " + e.target.nodeName + " element.");
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


function generateFormHTML(snippetData) {
  function replaceVariableWithInput(inputs) {
    inputs.forEach((input, index) => {
      // dodać tutaj hidden label (dzięki któremy zadziała metoda .text() )
      const createdInput = ` <input v-model="inputs[${index}].value" type="${input.type}" placeholder="${input.variable}" id="${input.variable}" @keyup.enter="onEnterPressed">`
      const regex = new RegExp(`%${input.variable}%`,"g")
      snippetData.HTML = snippetData.HTML.replace(regex,createdInput)
    })
  }
  replaceVariableWithInput(snippetData.inputs)
  return `<div id="inserterForm">
    <div>${snippetData.HTML}</div>`
}