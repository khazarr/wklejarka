const ajaxRespSomeday = 
[
  {
  key: '/zz',
  value: 'testowe z tablicy 2'
  },
  {
    key: '/qe',
    value: {
      HTML: 'Hehe %imie% dzieki, zobacze w domu ten %item% xD',
      inputs: [
        {
          type: 'text',
          variable: 'imie',
          value: '',
        },
        {
          type: 'text',
          variable: 'item',
          value: '',
        },
      ]
    }
  },
  {
    key: '/reco',
    value: {
      HTML: '%main%%ver% \n %product%%ver% \n %category%%ver% \n %basket%%ver%',
      inputs: [
        {
          type: 'text',
          variable: 'main',
          value: '',
        },
        {
          type: 'text',
          variable: 'product',
          value: '',
        },
        {
          type: 'text',
          variable: 'category',
          value: '',
        },
        {
          type: 'text',
          variable: 'basket',
          value: '',
        },
        {
          type: 'text',
          variable: 'ver',
          value: '',
        },
      ]
    }
  }
]


const pasterModule = {
  pressed: [],
  MAX_LENGTH: 10,
  snippets: new Map(),
  snippetsArray: [],
  getSnippets() {
    //some ajax to db someday
    this.snippetsArray = ajaxRespSomeday
    this.setSnippetsMap()
  },
  setSnippetsMap() {
    this.snippetsArray.map(snip => {
      this.snippets.set(snip.key, snip.value)
    })
  },
  inputFieldBasicHandle(textArea, foundCode, snippetInsert) {
    console.log('podmienianko ')
    textArea.value = textArea.value.replace(foundCode, snippetInsert)
  },
  inputFieldModalHandle(textArea, key, value) {
    console.log('inserting modal')
    textArea.blur()
    document.body.insertBefore(this.createElementFromHTML(this.generateFormHTML(value)), document.body.firstChild);
    setTimeout(() => {
      const app = new Vue({
        el: '#inserterForm',
        data: {
          HTML: value.HTML,
          inputs: value.inputs,
          snippetsRegex: /<b>.+<\/b>/,
          halko: ''
        },
        mounted() {},
        methods: {
          onEnterPressed() {
            console.log('enter pressed')
            console.log(this.$el.childNodes[0].childNodes)
            let outputString = ""
            this.$el.childNodes[0].childNodes.forEach((el) => {
              el.nodeName == "INPUT" ?
                outputString += el.value :
                outputString += el.data
            })
            textArea.value = textArea.value.replace(key, outputString)
            const thisForm = document.querySelector('#inserterForm')
            thisForm.parentNode.removeChild(thisForm);
            textArea.focus()
            this.$destroy()
          }
        }
      });
      document.querySelector(`#${value.inputs[0].variable}`).focus()
    }, 100)
  },
  createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
  },
  generateFormHTML(snippetData) {
    function replaceVariableWithInput(inputs) {
      inputs.forEach((input, index) => {
        const createdInput = `<input v-model="inputs[${index}].value" type="${input.type}" placeholder="${input.variable}" id="${input.variable}" @keyup.enter="onEnterPressed">`
        const regex = new RegExp(`%${input.variable}%`, "g")
        snippetData.HTML = snippetData.HTML.replace(regex, createdInput)
      })
    }
    replaceVariableWithInput(snippetData.inputs)
    return `<div id="inserterForm">
    <div>${snippetData.HTML}</div>`
  },
  checkForOccurence(textArea) {
    const moduleSnippets = this.snippets
    for (let [key, value] of moduleSnippets) {
      if (this.pressed.join('').includes(key)) {
        typeof value === 'string' ?
          this.inputFieldBasicHandle(textArea, key, value) :
          this.inputFieldModalHandle(textArea, key, value)
        this.pressed.length = 0 //clear array
      }
    }
  },
  init() {
    console.log('module initialized PASTER')
    this.getSnippets()
    document.addEventListener('keyup', event => {
      const key = event.key; // "a", "1", "Shift", etc.
      if (key != "Backspace") {
        this.pressed.push(key)
        this.pressed.splice(-this.MAX_LENGTH - 1, this.pressed.length - this.MAX_LENGTH)
      } else {
        this.pressed.pop()
      }
      if (event.target.type == 'textarea' || event.target.tagName == 'INPUT') {
        this.checkForOccurence(event.target)
      }
    });
  }

}

pasterModule.init()




// // document.onclick = function (e) {
// //   // e.target, e.srcElement and e.toElement contains the element clicked.
// //   console.log("User clicked a 2 " + e.target.nodeName + " element.");
// // };

// function httpGetAsync(theUrl, callback) {
//   var xmlHttp = new XMLHttpRequest();
//   xmlHttp.onreadystatechange = function () {
//     if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
//       callback(xmlHttp.responseText);
//   }
//   xmlHttp.open("GET", theUrl, true); // true for asynchronous 
//   xmlHttp.send(null);
// }