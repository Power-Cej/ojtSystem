import React from 'react'
import normalizeWheel from 'normalize-wheel'
import {
    getCropSize,
    restrictPosition,
    getDistanceBetweenPoints,
    getRotationBetweenPoints,
    computeCroppedArea,
    getCenter,
    getInitialCropFromCroppedAreaPixels,
    getInitialCropFromCroppedAreaPercentages,
    clamp,
} from './helpers'
import cssStyles from './styles.css'


const MIN_ZOOM = 1
const MAX_ZOOM = 3


class Cropper extends React.Component {
    static defaultProps = {
        zoom: 1,
        rotation: 0,
        aspect: 4 / 3,
        maxZoom: MAX_ZOOM,
        minZoom: MIN_ZOOM,
        cropShape: 'rect',
        objectFit: 'contain',
        showGrid: true,
        style: {},
        classes: {},
        mediaProps: {},
        zoomSpeed: 1,
        restrictPosition: true,
        zoomWithScroll: true,
    }
    imageRef = React.createRef()
    videoRef = React.createRef()
    containerPosition = {x: 0, y: 0}
    containerRef = null
    styleRef = null
    containerRect = null
    mediaSize = {width: 0, height: 0, naturalWidth: 0, naturalHeight: 0}
    dragStartPosition = {x: 0, y: 0}
    dragStartCrop = {x: 0, y: 0}
    gestureZoomStart = 0
    gestureRotationStart = 0
    isTouching = false
    lastPinchDistance = 0
    lastPinchRotation = 0
    rafDragTimeout = null
    rafPinchTimeout = null
    wheelTimer = null
    currentDoc = typeof document !== 'undefined' ? document : null
    currentWindow = typeof window !== 'undefined' ? window : null
    resizeObserver = null
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
            this.initResizeObserver()
            // only add window resize listener if ResizeObserver is not supported. Otherwise, it would be redundant
            if (typeof window.ResizeObserver === 'undefined') {
                this.currentWindow.addEventListener('resize', this.computeSizes)
            }
            this.props.zoomWithScroll && this.containerRef.addEventListener('wheel', this.onWheel, {passive: false})
            this.containerRef.addEventListener('gesturestart', this.onGestureStart)
        }
        this.currentDoc.addEventListener('scroll', this.onScroll);
        // when rendered via SSR, the image can already be loaded and its onLoad callback will never be called
        if (this.imageRef.current && this.imageRef.current.complete) {
            this.onMediaLoad()
        }
    }

    componentWillUnmount() {
        if (!this.currentDoc || !this.currentWindow) return
        if (typeof window.ResizeObserver === 'undefined') {
            this.currentWindow.removeEventListener('resize', this.computeSizes)
        }
        this.resizeObserver?.disconnect()
        if (this.containerRef) {
            this.containerRef.removeEventListener('gesturestart', this.preventZoomSafari)
        }
        if (this.styleRef) {
            this.styleRef.parentNode?.removeChild(this.styleRef)
        }
        this.cleanEvents()
        this.props.zoomWithScroll && this.clearScrollEvent()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.rotation !== this.props.rotation) {
            this.computeSizes();
            this.recomputeCropPosition();
        } else if (prevProps.aspect !== this.props.aspect) {
            this.computeSizes();
        } else if (prevProps.objectFit !== this.props.objectFit) {
            this.computeSizes();
        } else if (prevProps.zoom !== this.props.zoom) {
            this.recomputeCropPosition()
        } else if (prevProps.cropSize?.height !== this.props.cropSize?.height || prevProps.cropSize?.width !== this.props.cropSize?.width) {
            this.computeSizes()
        } else if (prevProps.crop?.x !== this.props.crop?.x || prevProps.crop?.y !== this.props.crop?.y) {
            this.emitCropAreaChange()
        }
        if (prevProps.zoomWithScroll !== this.props.zoomWithScroll && this.containerRef) {
            this.props.zoomWithScroll ? this.containerRef.addEventListener('wheel', this.onWheel, {passive: false}) : this.clearScrollEvent()
        }
    }

    initResizeObserver = () => {
        if (typeof window.ResizeObserver === 'undefined' || !this.containerRef) {
            return
        }
        let isFirstResize = true
        this.resizeObserver = new window.ResizeObserver((entries) => {
            if (isFirstResize) {
                isFirstResize = false // observe() is called on mount, we don't want to trigger a recompute on mount
                return
            }
            this.computeSizes()
        })
        this.resizeObserver.observe(this.containerRef)
    }

    // this is to prevent Safari on iOS >= 10 to zoom the page
    preventZoomSafari = (e) => e.preventDefault()

    cleanEvents = () => {
        if (!this.currentDoc) return
        this.currentDoc.removeEventListener('mousemove', this.onMouseMove)
        this.currentDoc.removeEventListener('mouseup', this.onDragStopped)
        this.currentDoc.removeEventListener('touchmove', this.onTouchMove)
        this.currentDoc.removeEventListener('touchend', this.onDragStopped)
        this.currentDoc.removeEventListener('gesturemove', this.onGestureMove)
        this.currentDoc.removeEventListener('gestureend', this.onGestureEnd)
        this.currentDoc.removeEventListener('scroll', this.onScroll);
    }

    clearScrollEvent = () => {
        if (this.containerRef) this.containerRef.removeEventListener('wheel', this.onWheel)
        if (this.wheelTimer) {
            clearTimeout(this.wheelTimer)
        }
    }

    onMediaLoad = () => {
        const cropSize = this.computeSizes()
        if (cropSize) {
            this.emitCropData()
            this.setInitialCrop(cropSize)
        }
    }

    setInitialCrop = (cropSize) => {
        if (this.props.initialCroppedAreaPercentages) {
            const {
                crop,
                zoom
            } = getInitialCropFromCroppedAreaPercentages(this.props.initialCroppedAreaPercentages, this.mediaSize, this.props.rotation, cropSize, this.props.minZoom, this.props.maxZoom)
            this.props.onCropChange(crop)
            this.props.onZoomChange && this.props.onZoomChange(zoom)
        } else if (this.props.initialCroppedAreaPixels) {
            const {
                crop,
                zoom
            } = getInitialCropFromCroppedAreaPixels(this.props.initialCroppedAreaPixels, this.mediaSize, this.props.rotation, cropSize, this.props.minZoom, this.props.maxZoom)

            this.props.onCropChange(crop)
            this.props.onZoomChange && this.props.onZoomChange(zoom)
        }
    }

    getAspect() {
        const {cropSize, aspect} = this.props
        if (cropSize) {
            return cropSize.width / cropSize.height
        }
        return aspect
    }

    getObjectFit() {
        if (this.props.objectFit === 'cover') {
            const mediaRef = this.imageRef.current || this.videoRef.current
            if (mediaRef && this.containerRef) {
                this.containerRect = this.containerRef.getBoundingClientRect()
                const containerAspect = this.containerRect.width / this.containerRect.height
                const naturalWidth = this.imageRef.current?.naturalWidth || this.videoRef.current?.videoWidth || 0
                const naturalHeight = this.imageRef.current?.naturalHeight || this.videoRef.current?.videoHeight || 0
                const mediaAspect = naturalWidth / naturalHeight
                return mediaAspect < containerAspect ? 'horizontal-cover' : 'vertical-cover'
            }
            return 'horizontal-cover'
        }

        return this.props.objectFit
    }

    computeSizes = () => {
        const mediaRef = this.imageRef.current || this.videoRef.current;
        if (mediaRef && this.containerRef) {
            this.containerRect = this.containerRef.getBoundingClientRect()
            this.saveContainerPosition()
            const containerAspect = this.containerRect.width / this.containerRect.height
            const naturalWidth = this.imageRef.current?.naturalWidth || this.videoRef.current?.videoWidth || 0
            const naturalHeight = this.imageRef.current?.naturalHeight || this.videoRef.current?.videoHeight || 0
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
                const objectFit = this.getObjectFit()
                switch (objectFit) {
                    default:
                    case 'contain':
                        renderedMediaSize = containerAspect > mediaAspect ? {
                            width: this.containerRect.height * mediaAspect, height: this.containerRect.height,
                        } : {
                            width: this.containerRect.width, height: this.containerRect.width / mediaAspect,
                        }
                        break
                    case 'horizontal-cover':
                        renderedMediaSize = {
                            width: this.containerRect.width, height: this.containerRect.width / mediaAspect,
                        }
                        break
                    case 'vertical-cover':
                        renderedMediaSize = {
                            width: this.containerRect.height * mediaAspect, height: this.containerRect.height,
                        }
                        break
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

    static getTouchPoint = (touch) => ({
        x: Number(touch.clientX), y: Number(touch.clientY),
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

    onScroll = (e) => {
        if (!this.currentDoc) return
        e.preventDefault()
        this.saveContainerPosition()
    }

    onTouchStart = (e) => {
        if (!this.currentDoc) return
        this.isTouching = true
        if (this.props.onTouchRequest && !this.props.onTouchRequest(e)) {
            return
        }
        this.currentDoc.addEventListener('touchmove', this.onTouchMove, {passive: false}) // iOS 11 now defaults to passive: true
        this.currentDoc.addEventListener('touchend', this.onDragStopped)
        this.saveContainerPosition()
        if (e.touches.length === 2) {
            this.onPinchStart(e)
        } else if (e.touches.length === 1) {
            this.onDragStart(Cropper.getTouchPoint(e.touches[0]))
        }
    }

    onTouchMove = (e) => {
        // Prevent whole page from scrolling on iOS.
        e.preventDefault()
        if (e.touches.length === 2) {
            this.onPinchMove(e)
        } else if (e.touches.length === 1) {
            this.onDrag(Cropper.getTouchPoint(e.touches[0]))
        }
    }

    onGestureStart = (e) => {
        if (!this.currentDoc) return
        e.preventDefault()
        this.currentDoc.addEventListener('gesturechange', this.onGestureMove)
        this.currentDoc.addEventListener('gestureend', this.onGestureEnd)
        this.gestureZoomStart = this.props.zoom
        this.gestureRotationStart = this.props.rotation
    }

    onGestureMove = (e) => {
        e.preventDefault()
        if (this.isTouching) {
            // this is to avoid conflict between gesture and touch events
            return
        }
        const point = Cropper.getMousePoint(e)
        const newZoom = this.gestureZoomStart - 1 + e.scale
        this.setNewZoom(newZoom, point, {shouldUpdatePosition: true})
        if (this.props.onRotationChange) {
            const newRotation = this.gestureRotationStart + e.rotation
            this.props.onRotationChange(newRotation)
        }
    }

    onGestureEnd = (e) => {
        this.cleanEvents()
    }

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
        this.isTouching = false
        this.cleanEvents()
        this.emitCropData()
        this.props.onInteractionEnd?.()
    }

    onPinchStart(e) {
        const pointA = Cropper.getTouchPoint(e.touches[0])
        const pointB = Cropper.getTouchPoint(e.touches[1])
        this.lastPinchDistance = getDistanceBetweenPoints(pointA, pointB)
        this.lastPinchRotation = getRotationBetweenPoints(pointA, pointB)
        this.onDragStart(getCenter(pointA, pointB))
    }

    onPinchMove(e) {
        if (!this.currentDoc || !this.currentWindow) return
        const pointA = Cropper.getTouchPoint(e.touches[0])
        const pointB = Cropper.getTouchPoint(e.touches[1])
        const center = getCenter(pointA, pointB)
        // this.onDrag(center)
        // if (this.rafPinchTimeout) this.currentWindow.cancelAnimationFrame(this.rafPinchTimeout)
        // this.rafPinchTimeout = this.currentWindow.requestAnimationFrame(() => {
        const distance = getDistanceBetweenPoints(pointA, pointB)
        const newZoom = this.props.zoom * (distance / this.lastPinchDistance)
        this.setNewZoom(newZoom, center, {shouldUpdatePosition: false})
        this.lastPinchDistance = distance
        // const rotation = getRotationBetweenPoints(pointA, pointB)
        // const newRotation = this.props.rotation + (rotation - this.lastPinchRotation)
        // this.props.onRotationChange && this.props.onRotationChange(newRotation)
        // this.lastPinchRotation = rotation
        // })
    }

    onWheel = (e) => {
        if (!this.currentWindow) return
        if (this.props.onWheelRequest && !this.props.onWheelRequest(e)) {
            return
        }

        e.preventDefault()
        const point = Cropper.getMousePoint(e)
        const {pixelY} = normalizeWheel(e)
        const newZoom = this.props.zoom - (pixelY * this.props.zoomSpeed) / 200
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

            const newPosition = this.props.restrictPosition ? restrictPosition(requestedPosition, this.mediaSize, this.state.cropSize, newZoom, this.props.rotation) : requestedPosition

            this.props.onCropChange(newPosition)
        }
        this.props.onZoomChange(newZoom)
    }

    getCropData = () => {
        if (!this.state.cropSize) {
            return null
        }

        // this is to ensure the crop is correctly restricted after a zoom back (https://github.com/ValentinH/react-easy-crop/issues/6)
        const restrictedPosition = this.props.restrictPosition ? restrictPosition(this.props.crop, this.mediaSize, this.state.cropSize, this.props.zoom, this.props.rotation) : this.props.crop
        return computeCroppedArea(restrictedPosition, this.mediaSize, this.state.cropSize, this.getAspect(), this.props.zoom, this.props.rotation, this.props.restrictPosition)
    }

    emitCropData = () => {
        const cropData = this.getCropData()
        if (!cropData) return

        const {croppedAreaPercentages, croppedAreaPixels} = cropData
        if (this.props.onCropComplete) {
            this.props.onCropComplete(croppedAreaPercentages, croppedAreaPixels)
        }

        if (this.props.onCropAreaChange) {
            this.props.onCropAreaChange(croppedAreaPercentages, croppedAreaPixels)
        }
    }

    emitCropAreaChange = () => {
        const cropData = this.getCropData()
        if (!cropData) return

        const {croppedAreaPercentages, croppedAreaPixels} = cropData
        if (this.props.onCropAreaChange) {
            this.props.onCropAreaChange(croppedAreaPercentages, croppedAreaPixels)
        }
    }

    recomputeCropPosition = () => {
        if (!this.state.cropSize) return
        const newPosition = this.props.restrictPosition ? restrictPosition(this.props.crop, this.mediaSize, this.state.cropSize, this.props.zoom, this.props.rotation) : this.props.crop

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
            onTouchStart={this.onTouchStart}
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

export default Cropper