let imgBtn = document.getElementById('imageInput')
const download = document.getElementById('download')
const canvas = document.getElementById('imgCanvas')
let imgData
let context

download.addEventListener('click', function(e) {
    const link = document.createElement('a')
    link.download = 'download.png'
    link.href = canvas.toDataURL()
    link.click()
    link.delete()
});
imgBtn.addEventListener('change', function(event) {
    if(event.target.files) {//If files
        let imageFile = event.target.files[0]
        const reader = new FileReader();
        reader.readAsDataURL(imageFile)
        reader.onloadend = function(event) {
            const userImage = new Image()
            userImage.src = event.target.result
            userImage.onload = function (event) {
                context = canvas.getContext('2d')
                canvas.width = userImage.width
                canvas.height = userImage.height
                context.drawImage(userImage,0,0)
                context.font = "40pt Impact";
                context.fillStyle = "white"
                context.strokeStyle = "black"
                context.textAlign = "center"

                context.fillText("twitch.tv/plainttv",userImage.width/2,userImage.height/8);
                context.strokeText("twitch.tv/plainttv",userImage.width/2,userImage.height/8);
                imgData = canvas.toDataURL("image/png",0.75)
            }
        }
    }
})