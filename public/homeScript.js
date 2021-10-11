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
        console.log(json.body)
    })

    return false
}

window.onload = function() {
    getCurrentUser()
    getAllLists()
}