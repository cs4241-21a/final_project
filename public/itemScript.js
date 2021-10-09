  const createItem = function( e ) {
    e.preventDefault()
  
    const fname = document.querySelector( '#fname' ),
        fstore = document.querySelector( '#fstore' ),
        flink = document.querySelector( '#flink' ),
        fprice = document.querySelector( '#fprice' ),
        fpicture = document.querySelector( '#fpicture' ).toString(),
        listName = document.querySelector( '#listNameForItem' ),
        json = { itemName: fname.value, link: flink.value, price: fprice.value, store: fstore.value, picture: fpicture.value, listName: listName.innerHTML },
        body = JSON.stringify( json )
  
    fetch( '/create-item', {
      method:'POST',
      body 
    })
    .then( function( response ) {
      return response.json()
    })
    .then( function( json ) {
      console.log(json)
  
      // reloadTable(json)
      newItemForm.reset()
    })
  
    return false
  }
  
  window.onload = function() {
    const createItemButton = document.querySelector( '#create-item' )
    createItemButton.onclick = createItem
  }
  
  const newItemForm = document.querySelector( '#newItemForm' )