// Retrieve documents elements
let imgBtn = document.getElementById('imageInput')
const download = document.getElementById('download')
let canvas = document.getElementById('imgCanvas')
const topTextBtn = document.getElementById('topTextBtn')
const bottomTextBtn = document.getElementById('bottomTextBtn')
const startCropBtn = document.getElementById('startCropBtn')
const cropBtn = document.getElementById('cropBtn')
const restoreCropBtn = document.getElementById('restoreCropBtn')
const rotateLeftBtn = document.getElementById('rotateLeft')
const rotateRightBtn = document.getElementById('rotateRight')
const flipXBtn = document.getElementById('flipX')
const flipYBtn = document.getElementById('flipY')
const compressBtn = document.getElementById('compressBtn')
const greyscaleBtn = document.getElementById('greyscaleBtn')
const resetBtn = document.getElementById('resetButton')
const embossBtn = document.getElementById('embossBtn')
const herMajestyBtn = document.getElementById('herMajestyBtn')
const orangePeelBtn = document.getElementById('orangePeelBtn')
const sinCityBtn = document.getElementById('sinCityBtn')

// slider elements
const brightnessSlider = document.getElementById('brightnessSlider')
const saturationSlider = document.getElementById('saturationSlider')
const vibranceSlider = document.getElementById('vibranceSlider')
const exposureSlider = document.getElementById('exposureSlider')
const hueSlider = document.getElementById('hueSlider')
const sepiaSlider = document.getElementById('sepiaSlider')
const gammaSlider = document.getElementById('gammaSlider')
const noiseSlider = document.getElementById('noiseSlider')
const clipSlider = document.getElementById('clipSlider')
const sharpenSlider = document.getElementById('sharpenSlider')

// additional variables
let imgData
let context
let userImage
let cropper
document.querySelectorAll('.range-field').forEach(slider => {
    slider.addEventListener('change', function() {
        let brightnessValue = brightnessSlider.value
        let saturationValue = saturationSlider.value
        let vibranceValue = vibranceSlider.value
        let exposureValue = exposureSlider.value
        let hueValue = hueSlider.value
        let sepiaValue = sepiaSlider.value
        let gammaValue = gammaSlider.value
        let noiseValue = noiseSlider.value
        let clipValue = clipSlider.value
        let sharpenValue = sharpenSlider.value
        Caman(canvas, function () {
            this.revert(false)
            this.brightness(brightnessValue)
            this.saturation(saturationValue)
            this.vibrance(vibranceValue)
            this.exposure(exposureValue)
            this.hue(hueValue)
            this.sepia(sepiaValue)
            this.gamma(gammaValue)
            this.noise(noiseValue)
            this.clip(clipValue)
            this.sharpen(sharpenValue)
            this.render()
        })
    })
})

// Sliders
/*brightnessSlider.addEventListener('change', function(){
    let brightnessValue = brightnessSlider.value
    let saturationValue = saturationSlider.value
    let vibranceValue = vibranceSlider.value
    let exposureValue = exposureSlider.value
    let hueValue = hueSlider.value
    let sepiaValue = sepiaSlider.value
    let gammaValue = gammaSlider.value
    let noiseValue = noiseSlider.value
    let clipValue = clipSlider.value
    let sharpenValue = sharpenSlider.value
    let stackBlurValue = stackBlurSlider.value
    Caman(canvas, function () {
        this.revert(false)
        this.brightness(brightnessValue)
        this.saturation(saturationValue)
        this.vibrance(vibranceValue)
        this.render()
    })
})

saturationSlider.addEventListener('change', function(){
    let value = saturationSlider.value
    Caman(canvas, function () {
        this.revert(false)
        this.saturation(value).render();
    })
})

vibranceSlider.addEventListener('change', function(){
    let value = vibranceSlider.value
    Caman(canvas, function () {
        this.vibrance(value).render();
    })
})

exposureSlider.addEventListener('change', function(){
    let value = exposureSlider.value
    Caman(canvas, function () {
        this.exposure(value).render();
    })
})

hueSlider.addEventListener('change', function(){
    let value = hueSlider.value
    Caman(canvas, function () {
        this.hue(value).render();
    })
})

sepiaSlider.addEventListener('change', function(){
    let value = sepiaSlider.value
    Caman(canvas, function () {
        this.sepia(value).render();
    })
})

gammaSlider.addEventListener('change', function(){
    let value = gammaSlider.value
    Caman(canvas, function () {
        this.gamma(value).render();
    })
})


noiseSlider.addEventListener('change', function(){
    let value = noiseSlider.value
    Caman(canvas, function () {
        this.noise(value).render();
    })
})

clipSlider.addEventListener('change', function(){
    let value = clipSlider.value
    Caman(canvas, function () {
        this.clip(value).render();
    })
})

sharpenSlider.addEventListener('change', function(){
    let value = sharpenSlider.value
    Caman(canvas, function () {
        this.sharpen(value).render();
    })
})

stackBlurSlider.addEventListener('change', function(){
    let value = stackBlurSlider.value
    Caman(canvas, function () {
        this.stackBlur(value).render();
    })
})*/

// Reset button
resetBtn.addEventListener('click', function() {
    location.reload(true)
})

// Sin City button
sinCityBtn.addEventListener('click', function(){
    sinCityBtn.innerText = "Rendering..."
    Caman(canvas, function () {
        this.sinCity().render()
        sinCityBtn.innerText = "Sin City"
    })

})

// Orange Peel button
orangePeelBtn.addEventListener('click', function(){
    orangePeelBtn.innerText = "Rendering..."
    Caman(canvas, function () {
        this.orangePeel().render()
        orangePeelBtn.innerText = "Orange Peel"
    })
})

// Her Majesty button
herMajestyBtn.addEventListener('click', function(){
    herMajestyBtn.innerText = "Rendering..."
    Caman(canvas, function () {
        this.herMajesty().render()
        herMajestyBtn.innerText = "Her Majesty"
    })

})

// Emboss button
embossBtn.addEventListener('click', function(){
    embossBtn.innerText = "Rendering..."
    Caman(canvas, function () {
        this.emboss().render()
        embossBtn.innerText = "Emboss"
    })

})

// Greyscale button
greyscaleBtn.addEventListener('click', function(){
    greyscaleBtn.innerText = "Rendering..."
    Caman(canvas, function () {
        this.greyscale().render()
        greyscaleBtn.innerText = "Greyscale"
    })

})


// Compress button
compressBtn.addEventListener('click', function(){
    for(let i = 0; i < 20; i++) {
        let tempImage = new Image()
        tempImage.src = canvas.toDataURL("image/jpeg", 0.05)
        context.drawImage(tempImage, 0, 0)
    }
})

// Flip buttons
flipXBtn.addEventListener('click',function() {
    if(cropper.getData().scaleX === 1)
        cropper.scaleX(-1)
    else
        cropper.scaleX(1)
})
flipYBtn.addEventListener('click',function() {
    if(cropper.getData().scaleY === 1)
        cropper.scaleY(-1)
    else
        cropper.scaleY(1)
})

// Rotation buttons
rotateRightBtn.addEventListener('click', function() {
    cropper.rotate(45)
})
rotateLeftBtn.addEventListener('click', function() {
    cropper.rotate(-45)
})

// Related to cropped
startCropBtn.addEventListener('click', function() {
    startCropBtn.disabled = true
    cropBtn.disabled = false
    restoreCropBtn.disabled = false
    rotateLeftBtn.disabled = false
    rotateRightBtn.disabled = false
    flipXBtn.disabled = false
    flipYBtn.disabled = false
    cropper = new Cropper(canvas,{crop(event) {
            console.log(event.detail.x);
            console.log(event.detail.y);
            console.log(event.detail.width);
            console.log(event.detail.height);
            console.log(event.detail.rotate);
            console.log(event.detail.scaleX);
            console.log(event.detail.scaleY);
        },viewMode: 2, dragMode: 'crop',})
})
cropBtn.addEventListener('click', function() {
    const image = cropper.getCroppedCanvas()
    /*const link = document.createElement('a')
    link.download = 'download.png'
    link.href = image
    link.click()
    link.delete()*/
    cropper.destroy()
    context = canvas.getContext('2d')
    canvas.height = image.height
    canvas.width = image.width
    context.drawImage(image,0,0)
    startCropBtn.disabled = false
    cropBtn.disabled = true
    restoreCropBtn.disabled = true
    rotateLeftBtn.disabled = true
    rotateRightBtn.disabled = true
    flipXBtn.disabled = true
    flipYBtn.disabled = true
})
restoreCropBtn.addEventListener('click', function() {
    cropper.destroy()
    context = canvas.getContext('2d')
    canvas.width = userImage.width
    canvas.height = userImage.height
    context.drawImage(userImage,0,0)

    imgData = canvas.toDataURL("image/png",1.0)
    startCropBtn.disabled = false
    cropBtn.disabled = true
    restoreCropBtn.disabled = true
    rotateLeftBtn.disabled = true
    rotateRightBtn.disabled = true
    flipXBtn.disabled = true
    flipYBtn.disabled = true
})

// Add top-text button
topTextBtn.addEventListener('click', function() {
    if(document.getElementById('topTextSize').value !== "" || document.getElementById('topTextSize') !== null)
        context.font = `${document.getElementById('topTextSize').value}pt Impact`
    else
        context.font = "36pt Impact";
    context.fillStyle = "white"
    context.strokeStyle = "black"
    context.textAlign = "center"
    const text = document.getElementById('topText').value
    wrapText(text,canvas.width/2,canvas.height/8,canvas.width,50)
})

// Add bottom-text button
bottomTextBtn.addEventListener('click', function() {
    if(document.getElementById('bottomTextSize').value !== "" || document.getElementById('bottomTextSize') !== null)
        context.font = `${document.getElementById('bottomTextSize').value}pt Impact`
    else
        context.font = "36pt Impact";
    context.fillStyle = "white"
    context.strokeStyle = "black"
    context.textAlign = "center"
    const text = document.getElementById('bottomText').value
    wrapText(text,canvas.width/2,canvas.height-(canvas.height/12),canvas.width,50)
})

// Wrap function
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

// Download button
download.addEventListener('click', function() {
    const link = document.createElement('a')
    link.download = 'download.png'
    link.href = canvas.toDataURL()
    link.click()
    link.delete()
});

// image button
imgBtn.addEventListener('change', function(event) {
    if(event.target.files) {//If files
        let imageFile = event.target.files[0]
        const reader = new FileReader();
        reader.readAsDataURL(imageFile)
        reader.onloadend = function(event) {
            userImage = new Image()
            // noinspection JSValidateTypes
            userImage.src = event.target.result
            userImage.onload = function () {
                context = canvas.getContext('2d')
                const MAX_WIDTH = 1152
                const MAX_HEIGHT = 1000
                if(userImage.width > MAX_WIDTH || userImage.height > MAX_HEIGHT){
                    alert("The uploaded image is too large to handle. " 
                    + `Please upload an image that will fit in ${MAX_WIDTH} x ${MAX_HEIGHT}. \n \n`
                    + `For reference, your image was ${userImage.width} x ${userImage.height}`)
                }
                else {
                    canvas.width = userImage.width
                    canvas.height = userImage.height
                    context.drawImage(userImage,0,0)
                    startCropBtn.disabled = false
                    imgData = canvas.toDataURL("image/png",1.0)
                }
            }
        }
    }
})