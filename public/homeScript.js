const getCurrentUser = function( e ) {
    // e.preventDefault()

    const currentUserHome = document.querySelector( '#currentUserHome' )

    const json = { username: currentUserHome.innerHTML },
        body = JSON.stringify( json )

    fetch( '/login-user', {
        method:'POST',
        body 
    })
    .then( function( response ) {
        return response.json()
    })
    .then( function( json ) {
        console.log('json from /login-user in homeScript:')
        console.log(json.body)
    })

    return false
}

const getAllLists = function( e ) {
    // e.preventDefault()

    const currentUserHome = document.querySelector( '#currentUserHome' )

    const json = { username: currentUserHome.innerHTML },
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

        var newDiv = document.createElement('div')
        var divText = '<div id="list-cards">'
        var i = 0
          while (json[i]!=undefined) {
            divText += '<div class="card" style="width: 18rem;"><img src="/homeimages/sunflower.png" class="card-img-top" alt="..."><div class="card-body text-center"><h5 class="card-title" style="text-align:center;">'
            divText += json[i].listName
            divText += '</h5><a href="#" class="btn btn-primary">View Items</a></div></div>'
          i++
        }
        divTest += '</div>'
        newDiv.innerHTML = divText
        document.querySelector('#list-cards').remove()
        document.body.appendChild(newDiv)
    })

    return false
}

window.onload = function() {
    getCurrentUser()
    getAllLists()
}