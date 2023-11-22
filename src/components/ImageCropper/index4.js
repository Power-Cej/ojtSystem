import React from "react";

const MIN_ZOOM = 1;
const MAX_ZOOM = 3;

class Cropper extends React.Component {
    touchPoints = {};

    constructor(props) {
        super(props);
        this.state = {
            position: {x: 0, y: 0}, zoom: 1, rotation: 0, crop: {width: 0, height: 0},
        };
        this.imageRef = React.createRef();
        this.containerRef = React.createRef();
        this.lastPinchDistance = 0;
        this.dragStart = null;
        this.lastPosition = null;
    }

    componentDidMount() {
        this.containerRef.current.addEventListener('pointerdown', this.onPointerDown);
        this.containerRef.current.addEventListener('wheel', this.onWheel, {passive: false});
        this.containerRef.current.addEventListener('pointermove', this.onPointerMove);
        this.containerRef.current.addEventListener('pointerup', this.onPointerUp);
    }

    componentWillUnmount() {
        this.containerRef.current.removeEventListener('pointerdown', this.onPointerDown);
        this.containerRef.current.removeEventListener('wheel', this.onWheel);
        this.containerRef.current.removeEventListener('pointermove', this.onPointerMove);
        this.containerRef.current.removeEventListener('pointerup', this.onPointerUp);
    }

    onPointerDown = (e) => {
        e.preventDefault();
        this.touchPoints[e.pointerId] = {x: e.clientX, y: e.clientY};
        if (Object.keys(this.touchPoints).length === 1) {
            // Single touch (drag start)
            this.dragStart = {x: e.clientX, y: e.clientY};
            this.lastPosition = this.state.position;
        } else if (Object.keys(this.touchPoints).length === 2) {
            // Two touches (pinch start)
            const touchPointsArray = Object.values(this.touchPoints);
            this.lastPinchDistance = this.calculateDistance(touchPointsArray[0], touchPointsArray[1]);
        }
        this.containerRef.current.setPointerCapture(e.pointerId);
    }

    onDrag(point) {
        if (!this.dragStart || !this.lastPosition) return;
        const offsetX = point.x - this.dragStart.x;
        const offsetY = point.y - this.dragStart.y;
        const newPosition = {
            x: this.lastPosition.x + offsetX, y: this.lastPosition.y + offsetY,
        };
        const crop = this.state.crop;
        const bound = this.calculateBound(crop, this.state.zoom);
        newPosition.x = Math.max(-bound.width, Math.min(bound.width, newPosition.x));
        newPosition.y = Math.max(-bound.height, Math.min(bound.height, newPosition.y));
        this.setState({position: newPosition});
    }

    onPinchStart(point1, point2) {
        this.lastPinchDistance = this.calculateDistance(point1, point2);
        this.onDrag(this.getCenter(point1, point2));
    }

    onPinch(point1, point2) {
        const distance = this.calculateDistance(point1, point2);
        const delta = distance / this.lastPinchDistance;
        const newZoom = this.state.zoom * delta;
        const center = this.getCenter(point1, point2)
        this.onDrag(center);
        this.updateZoom(newZoom);
        this.lastPinchDistance = distance;
    }

    onPointerMove = (e) => {
        e.preventDefault();
        // Update the current touch point
        this.touchPoints[e.pointerId] = {x: e.clientX, y: e.clientY};
        const touchPointsArray = Object.values(this.touchPoints);
        if (touchPointsArray.length === 1) {
            // Single touch (dragging)
            this.onDrag(touchPointsArray[0]);
        } else if (touchPointsArray.length === 2) {
            // Two touches (pinching)
            if (!touchPointsArray[0] || !touchPointsArray[1]) {
                return; // Ensure both touch points are set
            }
            this.onPinch(touchPointsArray[0], touchPointsArray[1]);
        }
    }


    onPointerUp = (e) => {
        e.preventDefault();
        delete this.touchPoints[e.pointerId];
        if (Object.keys(this.touchPoints).length === 0) {
            // Reset drag state
            this.dragStart = null;
            this.lastPosition = null;
        } else if (Object.keys(this.touchPoints).length === 1) {
            // Reset pinch state
            const remainingTouch = Object.values(this.touchPoints)[0];
            this.dragStart = {x: remainingTouch.x, y: remainingTouch.y};
            this.lastPosition = this.state.position;
        }
        this.containerRef.current.releasePointerCapture(e.pointerId);
    }

    calculateDistance(a, b) {
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    getCenter(a, b) {
        return {
            x: (b.x + a.x) / 2, y: (b.y + a.y) / 2,
        }
    }

    onWheel = (e) => {
        e.preventDefault();
        const {deltaY} = e;
        const newZoom = this.state.zoom - (deltaY * this.props.zoomSpeed) / 200;
        this.updateZoom(newZoom);
    }

    updateZoom(zoom) {
        const crop = this.state.crop;
        let newPosition = {...this.state.position};
        const newZoom = Math.max(this.props.minZoom, Math.min(zoom, this.props.maxZoom));
        const bound = this.calculateBound(crop, newZoom);
        newPosition = this.restrictPosition(newPosition, bound);
        this.setState({zoom: newZoom, position: newPosition});
    }

    restrictPosition(position, bound) {
        return {
            x: Math.max(-bound.width, Math.min(bound.width, position.x)),
            y: Math.max(-bound.height, Math.min(bound.height, position.y))
        };
    }

    calculateBound(crop, zoom) {
        const imageRect = this.imageRef.current;
        // original size of the image multiplied by the zoom factor
        const scaledImageWidth = imageRect.offsetWidth * zoom;
        const scaledImageHeight = imageRect.offsetHeight * zoom;
        // get the extra space around the image
        const width = (scaledImageWidth - crop.width) / 2;
        const height = (scaledImageHeight - crop.height) / 2;
        return {width, height};
    }

    getCropSize() {
        if (!this.imageRef.current || !this.containerRef.current) return null;
        const containerRect = this.containerRef.current.getBoundingClientRect();
        const imageRect = this.imageRef.current;
        const aspect = this.props.aspect;
        // Determine the maximum possible width and height within the container
        const maxPossibleWidth = Math.min(imageRect.offsetWidth, containerRect.width);
        const maxPossibleHeight = Math.min(imageRect.offsetHeight, containerRect.height);
        // Adjust dimensions based on aspect ratio
        const widthBasedOnHeight = maxPossibleHeight * aspect;
        const heightBasedOnWidth = maxPossibleWidth / aspect;
        // Decide whether to limit by width or height based on aspect ratio
        if (widthBasedOnHeight <= maxPossibleWidth) {
            return {width: widthBasedOnHeight, height: maxPossibleHeight};
        } else {
            return {width: maxPossibleWidth, height: heightBasedOnWidth};
        }
    }

    onMediaLoad = () => {
        const crop = this.getCropSize();
        this.setState({crop});
    }

    render() {
        const {image} = this.props;
        const {position: {x, y}, zoom, rotation} = this.state;
        const crop = this.state.crop;
        const containerStyles = {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflow: 'hidden',
            userSelect: 'none',
            touchAction: 'none',// prevents scrolling on touch devices
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
            width: crop && crop.width,
            height: crop && crop.height,
            background: `
            linear-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px)`,
            backgroundSize: '50% 50%',
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
            ref={this.containerRef}
            style={containerStyles}>
            <img
                alt="Crop area"
                src={image}
                ref={this.imageRef}
                style={imageStyles}
                onLoad={this.onMediaLoad}
            />
            <div
                style={cropStyles}/>
        </div>)
    }

}

const defaultProps = {
    zoom: 1, rotation: 0, aspect: 4 / 3, maxZoom: MAX_ZOOM, minZoom: MIN_ZOOM, zoomSpeed: 1
};
Cropper.defaultProps = defaultProps;
export default Cropper;