let imgBtn = document.getElementById('imageInput')
const download = document.getElementById('download')
const canvas = document.getElementById('imgCanvas')
const topTextBtn = document.getElementById('topTextBtn')
const bottomTextBtn = document.getElementById('bottomTextBtn')
let imgData
let context

topTextBtn.addEventListener('click', function(event) {
    context.font = "36pt Impact";
    context.fillStyle = "white"
    context.strokeStyle = "black"
    context.textAlign = "center"
    const text = document.getElementById('topText').value
    wrapText(text,canvas.width/2,canvas.height/8,canvas.width,50)
})

bottomTextBtn.addEventListener('click', function(event) {
    context.font = "36pt Impact";
    context.fillStyle = "white"
    context.strokeStyle = "black"
    context.textAlign = "center"
    const text = document.getElementById('bottomText').value
    wrapText(text,canvas.width/2,canvas.height-(canvas.height/12),canvas.width,50)
})

function wrapText(text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';

    for(let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' '
        const metrics = context.measureText(testLine)
        const testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
            context.fillText(line, x, y)
            context.strokeText(line, x, y)
            line = words[n] + ' '
            y += lineHeight
        }
        else {
            line = testLine
        }
    }
    context.fillText(line, x, y)
    context.strokeText(line,x,y)
}

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

                imgData = canvas.toDataURL("image/png",0.75)
            }
        }
    }
})