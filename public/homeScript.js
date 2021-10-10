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
        console.log('json from /current-user in homeScript:')
        console.log(json.body)
    })

    return false
}

window.onload = function() {
    getCurrentUser()
}