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
      console.log('json from /current-user in homeScript:')
      console.log(json)
    })
  
    return false
  }
  
  window.onload = function() {
    const currentUserHome = document.querySelector( '#currentUserHome' )
    currentUserHome.innerHTML = getCurrentUser()
  }