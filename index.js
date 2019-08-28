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
        toUnscramble = input.value
        let allPerms = getAllPermutations(toUnscramble)
        let correctPerms = []
        for (i in allPerms) {
            if (typeof data[allPerms[i]] !== 'undefined') {
                if(correctPerms.includes(allPerms[i]) == false) {
                    correctPerms.push(allPerms[i])
                }
            }
        }
        let h = document.createElement('p')
        let ul = document.createElement('ul')
        let note = document.getElementById('note')

        // if(typeof document.getElementById('h') == 'node') {
        //     let h0 = document.getElementById('h')
        //     let ul0 = document.getElementById('ul')

        //     h0.remove();
        // }    



        h.id = 'h'
        ul.id = 'ul'

        if (correctPerms.length == 0) {
            h.innerText = "There are no unscrambled versions to " + toUnscramble
        }
        else {
            h.innerText = "Here are the unscrambled versions to " + toUnscramble + " :"
        }

        note.innerText = "Note: Refresh to try again."

        for(i in correctPerms) {
            let li = document.createElement('li')
            li.innerText = correctPerms[i];
            ul.appendChild(li)
        }
        document.body.appendChild(h)
        document.body.appendChild(ul)

        checkDict(correctPerms)

    })
}

function checkDict(arr) {
    // for (i in arr) {
    //     let url = 'https://wordsapiv1.p.rapidapi.com/words/' + arr[i] + '/definitions'
    //     var settings = {
    //         "async": true,
    //         "crossDomain": true,
    //         "url": "https://wordsapiv1.p.rapidapi.com/words/hello/definitions",
    //         "method": "GET",
    //         "headers": {
    //             "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
    //             "x-rapidapi-key": "c909bdc34emshc7b2b1c7b17d57dp1feddbjsn0a0e1f39edb4"
    //         }
    //     }
        
    //     $.ajax(settings).done(function (response) {
    //         console.log(response);
    //     });
        
    // }
    console.log('n/a')
}

function documentSpawn() {
    document.body.removeChild(load)
    let title = document.createElement('h1')
    let note = document.createElement('p')
    input = document.createElement('input')
    submit = document.createElement('button')

    input.type = 'text'

    note.innerText = "Note: Please don't use uppercase"
    note.id = 'note'

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
