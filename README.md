# wklejarka / Paster 
 A chrome extension that's make your typing faster.
## Features

- Insert text snippet (simple replace)
- Insert text with variables
- works in all inputs/textareas (in document scope)

## Snippets Structure
### Simple snippet
```javascript
  {
  	key: '/code',
  	value: 'Replacing text'
  }
```
### Modal snippet
```javascript
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
```

## How it works?
- just type your **key** in any input
![screenshot of usage](https://preview.ibb.co/jWUf7H/screenshot.jpg)

## To Do
- snippets stored in db
- login
- catch events in iframe
