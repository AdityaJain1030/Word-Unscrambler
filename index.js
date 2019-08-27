window.onload = () => {
    loadingBanner();
    $.getJSON('https://raw.githubusercontent.com/dwyl/english-words/master/words_dictionary.json', function(json){
        data = json
    })
    .then(() => {
        documentSpawn()
    })
    .then(() => {
        loadJS();
    })
}

function loadJS() {
    submit.addEventListener('click', ()=> {
        let allPerms = getAllPermutations(input.value)
        let correctPerms = []
        for (i in allPerms) {
            if (typeof data[allPerms[i]] !== 'undefined') {
                if(correctPerms.includes(allPerms[i]) == false) {
                    console.log('hit')
                    console.log(allPerms[i])
                    correctPerms.push(allPerms[i])
                }
            }
        }
        console.log(correctPerms)

    })
}

function documentSpawn() {
    document.body.removeChild(load)
    let title = document.createElement('h1')
    let note = document.createElement('p')
    input = document.createElement('input')
    submit = document.createElement('button')

    input.type = 'text'

    note.innerText = "Note: Please Don't Use Uppercase"
    submit.innerText = "Submit"
    title.innerText = "Word To Unscramble"
    document.body.appendChild(title)
    document.body.appendChild(note)
    document.body.appendChild(input)
    document.body.appendChild(submit)
}

function loadingBanner() {
    load = document.createElement('h3')
    load.innerText = "Loading..."
    document.body.appendChild(load)
}

function getAllPermutations(string) {
    let results = []
  
    if (string.length === 1) {
      results.push(string)
      return results;
    }
  
    for (let i = 0; i < string.length; i++) {
      let firstChar = string[i]
      let charsLeft = string.substring(0, i) + string.substring(i + 1)
      let innerPermutations = getAllPermutations(charsLeft)
      for (let j = 0; j < innerPermutations.length; j++) {
        results.push(firstChar + innerPermutations[j])
      }
    }
    return results
  }
