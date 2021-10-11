const newItemForm = document.querySelector( '#newItemForm' )
var currentList
  
const createItem = function( e ) {
    e.preventDefault()

    const fname = document.querySelector( '#fname' ),
        fstore = document.querySelector( '#fstore' ),
        flink = document.querySelector( '#flink' ),
        fprice = document.querySelector( '#fprice' ),
        fpicture = document.querySelector( '#fpicture' ),
        listName = document.querySelector( '#listNameForItem' ),
        strs = fpicture.value.split('\\')
        json = { itemName: fname.value, link: flink.value, price: fprice.value, store: fstore.value, picture: strs[strs.length-1], listName: currentList },
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
        // newItemForm.reset()
        fname.value = ""
        fstore.value = ""
        flink.value = ""
        fprice.value = ""
        fpicture.src = ""
    })

    return false
}
  
const getCurrentList = function( e ) {
    // e.preventDefault()

    const json = { listName: 'filler' },
        body = JSON.stringify( json )

    fetch( '/get-current-list', {
        method:'POST',
        body 
    })
    .then( function( response ) {
        return response.json()
    })
    .then( function( json ) {
        console.log(json)
        currentList = json.listName
        console.log('currentList from getCurrentList:')
        console.log(currentList)
        listName = document.querySelector( '#listNameForItem' )
        listName.innerHTML = currentList
    })

    return false
}
  
window.onload = function() {
    getCurrentList()
    const createItemButton = document.querySelector( '#create-item' )
    createItemButton.onclick = createItem
}