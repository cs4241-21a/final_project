let imgBtn = document.getElementById('imageInput')
imgBtn.addEventListener('change', function(event) {
    if(event.target.files) {//If files
        let imageFile = event.target.files[0]
        const reader = new FileReader();
        reader.readAsDataURL(imageFile)
        reader.onloadend = function(event) {
            const userImage = new Image()
            userImage.src = event.target.result
            userImage.onload = function (event) {
                const canvas = document.getElementById('imgCanvas')
                const context = canvas.getContext('2d')
                canvas.width = userImage.width
                canvas.height = userImage.height
                context.drawImage(userImage,0,0)
                let imgData = canvas.toDataURL("image/jpeg",0.75)
            }
        }
    }
})