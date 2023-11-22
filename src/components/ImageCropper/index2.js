import React from 'react'
import {
    getCropSize,
    restrictPosition,
    computeCroppedArea,
    clamp,
} from './helpers'
import cssStyles from './styles.css'


const MIN_ZOOM = 1
const MAX_ZOOM = 3


class Cropper extends React.Component {
    imageRef = React.createRef()
    containerPosition = {x: 0, y: 0}
    containerRef = null
    containerRect = null
    mediaSize = {width: 0, height: 0, naturalWidth: 0, naturalHeight: 0}
    dragStartPosition = {x: 0, y: 0}
    dragStartCrop = {x: 0, y: 0}
    rafDragTimeout = null
    wheelTimer = null
    currentDoc = typeof document !== 'undefined' ? document : null
    currentWindow = typeof window !== 'undefined' ? window : null
    state = {
        cropSize: null, hasWheelJustStarted: false,
    }

    componentDidMount() {
        if (!this.currentDoc || !this.currentWindow) return
        if (this.containerRef) {
            if (this.containerRef.ownerDocument) {
                this.currentDoc = this.containerRef.ownerDocument
            }
            if (this.currentDoc.defaultView) {
                this.currentWindow = this.currentDoc.defaultView
            }
            this.props.zoomWithScroll && this.containerRef.addEventListener('wheel', this.onWheel, {passive: false})
        }
    }

    componentWillUnmount() {
        if (!this.currentDoc || !this.currentWindow) return
        this.cleanEvents();
    }

    cleanEvents = () => {
        if (!this.currentDoc) return
        this.currentDoc.removeEventListener('mousemove', this.onMouseMove)
        this.currentDoc.removeEventListener('mouseup', this.onDragStopped)
        this.currentDoc.removeEventListener('touchmove', this.onTouchMove)
        this.currentDoc.removeEventListener('touchend', this.onDragStopped)
    }


    onMediaLoad = () => {
        const cropSize = this.computeSizes()
        if (cropSize) {
            this.emitCropData()
        }
    }

    getAspect() {
        const {cropSize, aspect} = this.props
        if (cropSize) {
            return cropSize.width / cropSize.height
        }
        return aspect
    }

    computeSizes = () => {
        const mediaRef = this.imageRef.current;
        if (mediaRef && this.containerRef) {
            this.containerRect = this.containerRef.getBoundingClientRect()
            this.saveContainerPosition()
            const containerAspect = this.containerRect.width / this.containerRect.height
            const naturalWidth = this.imageRef.current?.naturalWidth || 0
            const naturalHeight = this.imageRef.current?.naturalHeight || 0
            const isMediaScaledDown = mediaRef.offsetWidth < naturalWidth || mediaRef.offsetHeight < naturalHeight
            const mediaAspect = naturalWidth / naturalHeight
            // We do not rely on the offsetWidth/offsetHeight if the media is scaled down
            // as the values they report are rounded. That will result in precision losses
            // when calculating zoom. We use the fact that the media is positioned relative
            // to the container. That allows us to use the container's dimensions
            // and natural aspect ratio of the media to calculate accurate media size.
            // However, for this to work, the container should not be rotated
            let renderedMediaSize
            if (isMediaScaledDown) {
                renderedMediaSize = containerAspect > mediaAspect ? {
                    width: this.containerRect.height * mediaAspect, height: this.containerRect.height,
                } : {
                    width: this.containerRect.width, height: this.containerRect.width / mediaAspect,
                }
            } else {
                renderedMediaSize = {
                    width: mediaRef.offsetWidth, height: mediaRef.offsetHeight,
                }
            }
            this.mediaSize = {
                ...renderedMediaSize, naturalWidth, naturalHeight,
            }
            const cropSize = this.props.cropSize ? this.props.cropSize : getCropSize(this.mediaSize.width, this.mediaSize.height, this.containerRect.width, this.containerRect.height, this.props.aspect, this.props.rotation)
            this.setState({cropSize}, this.recomputeCropPosition)
            return cropSize
        }
    }

    saveContainerPosition = () => {
        if (this.containerRef) {
            const bounds = this.containerRef.getBoundingClientRect()
            this.containerPosition = {x: bounds.left, y: bounds.top}
        }
    }

    static getMousePoint = (e) => ({
        x: Number(e.clientX), y: Number(e.clientY),
    })

    onMouseDown = (e) => {
        if (!this.currentDoc) return
        e.preventDefault()
        this.currentDoc.addEventListener('mousemove', this.onMouseMove)
        this.currentDoc.addEventListener('mouseup', this.onDragStopped)
        this.saveContainerPosition()
        this.onDragStart(Cropper.getMousePoint(e))
    }

    onMouseMove = (e) => this.onDrag(Cropper.getMousePoint(e))
    onDragStart = ({x, y}) => {
        this.dragStartPosition = {x, y}
        this.dragStartCrop = {...this.props.crop}
    }

    onDrag = ({x, y}) => {
        if (!this.currentWindow) return
        if (this.rafDragTimeout) this.currentWindow.cancelAnimationFrame(this.rafDragTimeout)
        this.rafDragTimeout = this.currentWindow.requestAnimationFrame(() => {
            if (!this.state.cropSize) return
            if (x === undefined || y === undefined) return
            const offsetX = x - this.dragStartPosition.x
            const offsetY = y - this.dragStartPosition.y
            const requestedPosition = {
                x: this.dragStartCrop.x + offsetX, y: this.dragStartCrop.y + offsetY,
            }
            const newPosition = restrictPosition(requestedPosition, this.mediaSize, this.state.cropSize, this.props.zoom, this.props.rotation)
            this.props.onCropChange(newPosition)
        })
    }

    onDragStopped = () => {
        this.cleanEvents()
        this.emitCropData()
    }
    onWheel = (e) => {
        if (!this.currentWindow) return
        e.preventDefault()
        const point = Cropper.getMousePoint(e)
        const {deltaY} = e; // normalizeWheel(e)
        const newZoom = this.props.zoom - (deltaY * this.props.zoomSpeed) / 200
        this.setNewZoom(newZoom, point, {shouldUpdatePosition: true})
        if (!this.state.hasWheelJustStarted) {
            this.setState({hasWheelJustStarted: true}, () => this.props.onInteractionStart?.())
        }
        if (this.wheelTimer) {
            clearTimeout(this.wheelTimer)
        }
        this.wheelTimer = this.currentWindow.setTimeout(() => this.setState({hasWheelJustStarted: false}, () => this.props.onInteractionEnd?.()), 250)
    }

    getPointOnContainer = ({x, y}, containerTopLeft) => {
        if (!this.containerRect) {
            throw new Error('The Cropper is not mounted')
        }
        return {
            x: this.containerRect.width / 2 - (x - containerTopLeft.x),
            y: this.containerRect.height / 2 - (y - containerTopLeft.y),
        }
    }

    getPointOnMedia = ({x, y}) => {
        const {crop, zoom} = this.props
        return {
            x: (x + crop.x) / zoom, y: (y + crop.y) / zoom,
        }
    }

    setNewZoom = (zoom, point, {shouldUpdatePosition = true} = {}) => {
        if (!this.state.cropSize || !this.props.onZoomChange) return

        const newZoom = clamp(zoom, this.props.minZoom, this.props.maxZoom)

        if (shouldUpdatePosition) {
            const zoomPoint = this.getPointOnContainer(point, this.containerPosition)
            const zoomTarget = this.getPointOnMedia(zoomPoint)
            const requestedPosition = {
                x: zoomTarget.x * newZoom - zoomPoint.x, y: zoomTarget.y * newZoom - zoomPoint.y,
            }

            const newPosition = restrictPosition(requestedPosition, this.mediaSize, this.state.cropSize, newZoom, this.props.rotation)

            this.props.onCropChange(newPosition)
        }
        this.props.onZoomChange(newZoom)
    }

    getCropData = () => {
        if (!this.state.cropSize) {
            return null
        }
        // this is to ensure the crop is correctly restricted after a zoom back (https://github.com/ValentinH/react-easy-crop/issues/6)
        const restrictedPosition = restrictPosition(this.props.crop, this.mediaSize, this.state.cropSize, this.props.zoom, this.props.rotation)
        return computeCroppedArea(restrictedPosition, this.mediaSize, this.state.cropSize, this.getAspect(), this.props.zoom, this.props.rotation, this.props.restrictPosition)
    }

    emitCropData = () => {
        const cropData = this.getCropData()
        if (!cropData) return
        const {croppedAreaPercentages, croppedAreaPixels} = cropData
        if (this.props.onCropComplete) {
            this.props.onCropComplete(croppedAreaPercentages, croppedAreaPixels)
        }
    }

    recomputeCropPosition = () => {
        if (!this.state.cropSize) return
        const newPosition = restrictPosition(this.props.crop, this.mediaSize, this.state.cropSize, this.props.zoom, this.props.rotation)
        this.props.onCropChange(newPosition)
        this.emitCropData()
    }

    render() {
        const {
            image, crop: {x, y}, rotation, zoom,
        } = this.props

        const containerStyles = {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflow: 'hidden',
            userSelect: 'none',
            touchAction: 'none',
            cursor: 'move',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        };
        const cropStyles = {
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            boxSizing: 'border-box',
            boxShadow: '0 0 0 9999em rgba(0, 0, 0, 0.5)',
            color: 'rgba(0, 0, 0, 0.5)',
            overflow: 'hidden',
            width: this.state.cropSize && this.state.cropSize.width,
            height: this.state.cropSize && this.state.cropSize.height,
        };
        const imageStyles = {
            maxWidth: '100%',
            maxHeight: '100%',
            margin: 'auto',
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            willChange: 'transform',//  this improves performances and prevent painting issues on iOS Chrome
            transform: `translate(${x}px, ${y}px) rotate(${rotation}deg) scale(${zoom})`,
        };
        return (<div
            onMouseDown={this.onMouseDown}
            ref={(el) => (this.containerRef = el)}
            style={containerStyles}>
            {image && (<img
                alt="Crop area"
                src={image}
                ref={this.imageRef}
                style={imageStyles}
                onLoad={this.onMediaLoad}
            />)}
            {this.state.cropSize && (<div
                style={cropStyles}
                className="reactEasyCrop_CropAreaGrid"
            />)}
        </div>)
    }
}

const defaultProps = {
    zoom: 1,
    rotation: 0,
    aspect: 4 / 3,
    maxZoom: MAX_ZOOM,
    minZoom: MIN_ZOOM,
    zoomSpeed: 1,
    zoomWithScroll: true,
}
Cropper.defaultProps = defaultProps;
export default Cropper