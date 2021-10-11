const getCurrentUser = function( e ) {
    // e.preventDefault()

    const currentUserHome = document.querySelector( '#currentUserHome' )
    const currentUserHome2 = document.querySelector( '#currentUserHome2' )

    console.log('currentUserHome.innerHTML:')
    console.log(currentUserHome.innerHTML)
    console.log('(typeof currentUserHome.innerHTML):')
    console.log((typeof currentUserHome.innerHTML))
    console.log('(currentUserHome.innerHTML === "[object Object]")')
    console.log((currentUserHome.innerHTML === '[object Object]'))

    if(!(currentUserHome.innerHTML === '[object Object]')){
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
            console.log('json from getCurrentUser in homeScript:')
            console.log(json)
            // currentUserHome2.innerHTML = json.username
        })
    } else{
        const json = { username: currentUserHome.innerHTML },
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
            currentUserHome2.innerHTML = json.username
        })
    }

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
        console.log('json from getCurrentUser in homeScript:')
        console.log(json)
        currentUserHome2.innerHTML = json.username
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
        var divText = '<div id="cardPlaceholder">'
        var i = 0
          while (json[i]!=undefined) {
            divText += '<div class="card" style="width: 18rem;"><div class="card-body text-center"><h5 class="card-title" style="text-align:center;">'
            divText += json[i].listName
            divText += '</h5><p class="card-text">'
            divText += json[i].description
            divText += '</p><a href="#" class="btn btn-primary">Go somewhere</a></div></div></div>'
          i++
        }
        divText += '</div>'
        newDiv.innerHTML = divText
        document.querySelector('#cardPlaceholder').remove()
        document.body.appendChild(newDiv)
    })

    return false
}

window.onload = function() {
    getCurrentUser()
    getAllLists()
}