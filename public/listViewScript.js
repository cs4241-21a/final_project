const getCurrentUser = function( e ) {
    // e.preventDefault()

    const json = { username: 'filler' },
    body = JSON.stringify( json )

    fetch( '/current-user', {
        method:'POST',
        body 
    })
    .then( function( response ) {
        return response.json()
    })
    .then( function( json ) {
        console.log(json)
        currentUser = json.username
    })
    return false
}

const getAllLists = function( e ) {
    // e.preventDefault()

    const json = { username: currentUser },
        body = JSON.stringify( json )

    fetch( '/get-user-lists', {
        method:'POST',
        body 
    })
    .then( function( response ) {
        console.log('response in homeSript:')
        console.log(response)
        console.log(response.toString())
        return response.json()
    })
    .then( function( json ) {
        console.log('json from /get-user-lists in homeScript:')
        console.log(json)

        var newDiv = document.createElement('form')
        var divText = '<form id="chooseListForm" action="/choose-list" method="POST"><label for="flistname">Choose a List to View the Items of:</label><select id="flistname" name="Lists">'
        var i = 0
          while (json[i]!=undefined) {
            divText += '<option value="'
            divText += json[i].listName
            divText += '">'
            divText += json[i].listName
            divText += '</option>'
          i++
        }
        divText += '</select><button type="submit" id="choose-list">Choose List</button></form>'
        newDiv.innerHTML = divText
        document.querySelector('#chooseListForm').remove()
        document.body.appendChild(newDiv)
    })

    return false
}

const getItemsHTML = function( e ) {
    // e.preventDefault()

    const selectedList = document.querySelector('#flistname')
    console.log('selectedList:')
    console.log(selectedList)
    let options = selectedList.options
    console.log('options:')
    console.log(options)
    let selectedOption = selectedList.options[selectedList.selectedIndex]
    console.log('selectedOption:')
    console.log(selectedOption)
    let selectedValue = selectedOption.value
    // console.log('selectedList:')
    // console.log(selectedList)
    console.log('selectedValue:')
    console.log(selectedValue)

    const json = { listName: selectedValue },
    body = JSON.stringify( json )

    fetch( '/get-user-items', {
        method:'POST',
        body 
    })
    .then( function( response ) {
        return response.json()
    })
    .then( function( json ) {
        console.log(json)

        var newDiv = document.createElement('div')
        var divText = '<div id="item-holder">'
        var i = 0
        while (json[i]!=undefined) {
            divText += '<div class="card" style="width: 18rem;"><div class="card-body"><h5 class="card-title">'
            divText += json[i].itemName
            divText += '</h5><p class="card-text">'
            divText += json[i].store
            divText += '</p><p class="card-text">'
            divText += json[i].price
            divText += '</p><a href="'
            divText += json[i].link
            divText += '" class="btn btn-primary">Link</a></div></div>'
            i++
        }
        divText += '</div>'
        newDiv.innerHTML = divText
        document.querySelector('#item-holder').remove()
        document.body.appendChild(newDiv)
    })
    return false
}

// const viewItems = function( e ) {
//     // e.preventDefault()
  
//     const name = document.querySelector( '.view-items' ).previousElementSibling.previousElementSibling.innerHTML,
//         json = { listName: name },
//         body = JSON.stringify( json )

//     console.log('name in viewItems:')
//     console.log(name)
  
//     fetch( '/create-list', {
//       method:'POST',
//       body 
//     })
//     .then( function( response ) {
//       return response.json()
//     })
//     .then( function( json ) {
//       console.log(json)
//     })
  
//     return false
//   }

window.onload = function() {
    getCurrentUser()
    getAllLists()
    getItemsHTML()
    const chooseItemsButton = document.querySelector( '#choose-list' )
    chooseItemsButton.onclick = getItemsHTML
}

var currentUser;