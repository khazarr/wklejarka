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
      key: '/ins',
      value: {
        HTML: 'Hello %name%! I will see %item% later',
        inputs: [
          {
            type: 'text',
            variable: 'name',
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
    const snippets = []
    firebase.database().ref('snippets').once('value')
      .then(data => {
        console.log('obtained data')
        console.log(data.val())
        const obj = data.val()
        for (let key in obj) {
          const snippet = {
            id: key,
            key: obj[key].key,
            value: obj[key].value
          }
          snippets.push(snippet)
        }
        console.log('mamy to :D')
        console.log(snippets)
        this.snippetsArray = snippets
        this.setSnippetsMap()
      })
      .catch(err => {
        console.log(err)
      })
    
  },
  initializeFirebase() {
    const config = {
      apiKey: "AIzaSyCHjEQ3-l-v9zu9Tgwr0hDNMpw2kIom51U",
      authDomain: "wklejarka-1d39e.firebaseapp.com",
      databaseURL: "https://wklejarka-1d39e.firebaseio.com",
      projectId: "wklejarka-1d39e",
      storageBucket: "wklejarka-1d39e.appspot.com",
      messagingSenderId: "480680450073"
    }
    firebase.initializeApp(config);
    console.log('firebase initalized')
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
          halko: '',
          oldValue: value.oldValue
        },
        mounted() {},
        methods: {
          onEnterPressed() {
            console.log('enter pressed')
            console.log(this.$el.childNodes[0].childNodes)
            let outputString = ""
            //populate set with input values



            this.$el.childNodes[0].childNodes.forEach((el) => {
              if(el.nodeName == "INPUT") {
                console.log(el)
                console.log('id:' + el.id)
                console.log('val:' + el.value)
              }
              el.nodeName == "INPUT" 
                ? outputString += el.value 
                : outputString += el.data
            })
            textArea.value = textArea.value.replace(key, outputString)
            console.log(this.oldValue)
            // textArea.value = textArea.value.replace(key, value.HTML)
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
    snippetData.oldValue = snippetData.HTML
    replaceVariableWithInput(snippetData.inputs)
    return `<div id="inserterForm">
    <div>${snippetData.HTML}</div>`
  },
  checkForOccurence(textArea) {
    const moduleSnippets = this.snippets
    for (let [key, value] of moduleSnippets) {
      if (this.pressed.join('').includes(key)) {
        typeof value === 'string' 
          ? this.inputFieldBasicHandle(textArea, key, value) 
          : this.inputFieldModalHandle(textArea, key, value)
        this.pressed.length = 0 //clear array
      }
    }
  },
  init() {
    console.log('module initialized PASTER')
    this.initializeFirebase()
    this.getSnippets()
    document.addEventListener('keyup', event => {
      const key = event.key; // "a", "1", "Shift", etc.
      console.log(this.pressed)
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