import React from "react";
import Cropper from "../components/ImageCropper";

const createImage = (url) =>
    new Promise((resolve, reject) => {
        const image = new Image()
        image.addEventListener('load', () => resolve(image))
        image.addEventListener('error', (error) => reject(error))
        image.setAttribute('crossOrigin', 'anonymous') // needed to avoid cross-origin issues on CodeSandbox
        image.src = url
    })

export function getRadianAngle(degreeValue) {
    return (degreeValue * Math.PI) / 180
}

export function rotateSize(width, height, rotation) {
    const rotRad = getRadianAngle(rotation)
    return {
        width:
            Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
        height:
            Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
    }
}

async function getCroppedImg(
    imageSrc,
    pixelCrop,
    rotation = 0,
    flip = {horizontal: false, vertical: false}
) {
    const image = await createImage(imageSrc)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (!ctx) {
        return null
    }

    const rotRad = getRadianAngle(rotation)

    // calculate bounding box of the rotated image
    const {width: bBoxWidth, height: bBoxHeight} = rotateSize(
        image.width,
        image.height,
        rotation
    )

    // set canvas size to match the bounding box
    canvas.width = bBoxWidth
    canvas.height = bBoxHeight

    // translate canvas context to a central location to allow rotating and flipping around the center
    ctx.translate(bBoxWidth / 2, bBoxHeight / 2)
    ctx.rotate(rotRad)
    ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1)
    ctx.translate(-image.width / 2, -image.height / 2)

    // draw rotated image
    ctx.drawImage(image, 0, 0)

    const croppedCanvas = document.createElement('canvas')

    const croppedCtx = croppedCanvas.getContext('2d')

    if (!croppedCtx) {
        return null
    }

    // Set the size of the cropped canvas
    croppedCanvas.width = pixelCrop.width
    croppedCanvas.height = pixelCrop.height

    // Draw the cropped image onto the new canvas
    croppedCtx.drawImage(
        canvas,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
    )

    // As Base64 string
    // return croppedCanvas.toDataURL('image/jpeg');

    // As a blob
    return new Promise((resolve, reject) => {
        croppedCanvas.toBlob((file) => {
            resolve(URL.createObjectURL(file))
        }, 'image/jpeg')
    })
}

const TestPage = () => {
    const [crop, setCrop] = React.useState({x: 0, y: 0})
    const [zoom, setZoom] = React.useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = React.useState(null)
    const [rotation, setRotation] = React.useState(0)
    const srcImage = "/banner2.jpeg";
    const imgref = React.useRef(null);
    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }
    const showCroppedImage = async () => {
        try {
            const croppedImage = await getCroppedImg(
                srcImage,
                croppedAreaPixels,
                rotation
            )
            imgref.current.src = croppedImage;
        } catch (e) {
            console.error(e)
        }
    }

    const style = {
        position: 'relative',
        width: '100%',
        height: 300
    }
    return (
        <div>
            <div style={style}>
                <Cropper
                    image={srcImage}
                    crop={crop}
                    zoom={zoom}
                    aspect={10 / 3}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                    onRotationChange={setRotation}
                />
            </div>
            <img ref={imgref}/>
            <button onClick={showCroppedImage}>Crop</button>
        </div>

    )
}
export default TestPage;