import React from "react";

const MIN_ZOOM = 1;
const MAX_ZOOM = 3;

function rotateSize(width, height, rotation) {
    return {
        width: Math.abs(Math.cos(rotation) * width) + Math.abs(Math.sin(rotation) * height),
        height: Math.abs(Math.sin(rotation) * width) + Math.abs(Math.cos(rotation) * height),
    }
}

class Cropper extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            position: {x: 0, y: 0},
            zoom: 1,
            rotation: 0,
            cropSize: null,
        };
        // internal state to avoid re-rendering
        this.lastPosition = {x: 0, y: 0};
        this.dragStart = {x: 0, y: 0};

        this.imageRef = React.createRef();
        this.containerRef = React.createRef();
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onWheel = this.onWheel.bind(this);
    }

    componentDidMount() {
        this.containerRef.current.addEventListener('wheel', this.onWheel, {passive: false});
    }

    onMouseMove(e) {
        e.preventDefault();
        // Get the current mouse position
        const {x, y} = {x: e.clientX, y: e.clientY};
        // Calculate the offset from the point where the mouse was initially pressed
        const offsetX = x - this.dragStart.x;
        const offsetY = y - this.dragStart.y;
        // Compute the new position of the image by adding the offset to the last recorded position
        const newPosition = {
            x: this.lastPosition.x + offsetX,
            y: this.lastPosition.y + offsetY,
        };
        // Calculate the bounds to restrict the image position and ensure it doesn't move outside the crop area
        const cropSize = this.getCropSize();
        if (cropSize) {
            const bounds = this.calculateBounds(cropSize, this.state.zoom);
            // Restrict the new position within the calculated bounds
            newPosition.x = Math.max(-bounds.width, Math.min(bounds.width, newPosition.x));
            newPosition.y = Math.max(-bounds.height, Math.min(bounds.height, newPosition.y));
        }
        this.setState({position: newPosition});
    }

    calculateBounds(cropSize) {
        // Retrieve the current size of the image element
        const imageRect = this.imageRef.current.getBoundingClientRect();
        // Calculate the actual size of the image considering the current zoom level
        const scaledImageWidth = imageRect.width * this.state.zoom;
        const scaledImageHeight = imageRect.height * this.state.zoom;
        // get the extra space around the image
        const width = (scaledImageWidth - cropSize.width) / 2;
        const height = (scaledImageHeight - cropSize.height) / 2;
        return {width, height};
    }

    onWheel(e) {
        e.preventDefault();
        const {deltaY} = e;
        // Calculate the new zoom value
        const newZoom = Math.min(Math.max(this.state.zoom - (deltaY * this.props.zoomSpeed) / 200, MIN_ZOOM), MAX_ZOOM);
        // Assuming the zoom is centered around the current position,
        // calculate the position shift due to zoom change
        let newPosition = {...this.state.position};
        if (newZoom !== this.state.zoom) {
            const scaleChange = newZoom / this.state.zoom;
            newPosition.x *= scaleChange;
            newPosition.y *= scaleChange;
            // Recalculate the bounds with the new zoom
            const cropSize = this.getCropSize();
            if (cropSize) {
                const bounds = this.calculateBounds(cropSize, newZoom);
                newPosition.x = Math.max(-bounds.width, Math.min(bounds.width, newPosition.x));
                newPosition.y = Math.max(-bounds.height, Math.min(bounds.height, newPosition.y));
            }
        }
        // Update the state with the new zoom and position
        this.setState({zoom: newZoom, position: newPosition});
    }

// Updated calculateBounds to include zoom parameter
    calculateBounds(cropSize, zoom) {
        const imageRect = this.imageRef.current.getBoundingClientRect();
        const scaledImageWidth = imageRect.width * zoom;
        const scaledImageHeight = imageRect.height * zoom;
        const width = (scaledImageWidth - cropSize.width) / 2;
        const height = (scaledImageHeight - cropSize.height) / 2;
        return {width, height};
    }

    onMouseDown(e) {
        e.preventDefault();
        this.dragStart = {x: e.clientX, y: e.clientY};
        this.lastPosition = this.state.position;
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);
    }

    onMouseUp() {
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
    }

    getCropSize() {
        if (!this.imageRef.current || !this.containerRef.current) return null;
        const containerRect = this.containerRef.current.getBoundingClientRect()
        const image = this.imageRef.current;
        const mediaSize = {
            width: image.offsetWidth, height: image.offsetHeight,
        }
        const aspect = this.props.aspect;
        const {width, height} = rotateSize(mediaSize.width, mediaSize.height, this.state.rotation)
        const fittingWidth = Math.min(width, containerRect.width);
        const fittingHeight = Math.min(height, containerRect.height);
        if (fittingWidth > (fittingHeight * aspect)) {
            return {
                width: fittingHeight * aspect,
                height: fittingHeight,
            }
        }
        return {
            width: fittingWidth,
            height: fittingWidth / aspect,
        }
    }

    render() {
        const {image} = this.props;
        const {position: {x, y}, zoom, rotation} = this.state;
        const cropSize = this.getCropSize();
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
            width: cropSize && cropSize.width,
            height: cropSize && cropSize.height,
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
            onMouseDown={this.onMouseDown}
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
    zoom: 1,
    rotation: 0,
    aspect: 4 / 3,
    maxZoom: MAX_ZOOM,
    minZoom: MIN_ZOOM,
    zoomSpeed: 1,
    zoomWithScroll: true,
};
Cropper.defaultProps = defaultProps;
export default Cropper;