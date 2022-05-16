import React from "react";
import PointerHandler from "../../PointerHandler";
import Cropper from "./Cropper";
import roundedRect from "./roundedRect";
import urlToImage from "../../urlToImage";
import blobToDataUrl from "../../blobToDataUrl";

const defaultProps = {
    width: 500,
    height: 500,
    border: 50,
    borderRadius: 50,
    scale: 1,
    rotate: 0,
};

class ImageCropperControl extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        const border = props.border * 2;
        this.cropper = new Cropper(props.width + border, props.height + border);
    }

    componentDidMount() {
        if (this.props.src) {
            this.loadImage(this.props.src);
        }
        const canvas = this.ref.current;
        this.pointer = new PointerHandler(canvas, this.handleEvent.bind(this));
    }

    componentDidUpdate(prevProps, prevState) {
        const oldScale = prevProps.scale;
        const newScale = this.props.scale;
        if (oldScale !== newScale) {
            this.cropper.photo.setScale(newScale);
            this.draw();
        }
    }

    loadImage(src) {
        if (typeof src === "string") {
            urlToImage(src, "anonymous")
                .then(image => {
                    this.handleImageReady(image);
                });
        } else if (src instanceof File) {
            blobToDataUrl(src)
                .then((url) => {
                    this.loadImage(url);
                });
        }
    }

    handleImageReady(image) {
        this.image = image;
        this.cropper.setCLip(this.props.width, this.props.height);
        this.cropper.setPhoto(this.image.width, this.image.height, this.props.scale);
        this.draw();
    }

    handleEvent() {
        const events = this.pointer.getEvents();
        if (events.length === 1) {
            const event = events[0];
            switch (event.type) {
                case 'pointerdown':
                    this.lastDistance = null;
                    this.cropper.photo.offset.x = event.x - this.cropper.photo.x;
                    this.cropper.photo.offset.y = event.y - this.cropper.photo.y;
                    break;
                case 'pointermove':
                    if (this.lastDistance) return;
                    this.cropper.movePhoto(event.x, event.y);
                    this.draw();
                    break;
            }
        } else if (events.length === 2) {
            const zoom = this.getZoom(events);
            if (zoom) {
                const currentScale = this.cropper.photo.getScale() + zoom / 100;
                this.cropper.scalePhoto(currentScale);
                this.draw();
            }
        }
    }

    getZoom(events) {
        let zoom = false;
        const currentDistance = getDistance(events[0].x, events[0].y, events[1].x, events[1].y);
        if (this.lastDistance) {
            const distance = currentDistance - this.lastDistance;
            zoom = distance;
        }
        this.lastDistance = currentDistance;
        return zoom;
    }


    draw() {
        const canvas = this.ref.current;
        const width = canvas.width;
        const height = canvas.height;
        const c = canvas.getContext('2d';
        // clear canvas
        c.clearRect(0, 0, width, height);
        // start drawing
        this.drawPhoto(c);
        this.drawClip(c);
        // this.drawPointer(c);
    }


    drawPointer(c) {
        // use for debugging
        const events = this.pointer.getEvents();
        c.fillStyle = 'rgba(255,0,0,0.5)';
        for (const event of events) {
            switch (event.type) {
                case 'pointerdown':
                    c.beginPath();
                    c.arc(event.x, event.y, 5, 0, Math.PI * 2);
                    c.fill();
                    break;
                case 'pointermove':
                    c.beginPath();
                    c.arc(event.x, event.y, 5, 0, Math.PI * 2);
                    c.fill();
                    break;
            }
        }
    }

    drawClip(c) {
        c.beginPath();
        const x = this.cropper.clip.x;
        const y = this.cropper.clip.y;
        const width = this.cropper.clip.width;
        const height = this.cropper.clip.height;
        const borderRadius = this.props.borderRadius;
        roundedRect(c, x, y, width, height, borderRadius);
        //backdrop
        c.fillStyle = 'rgba(0,0,0,0.5)';
        c.rect(this.cropper.width, 0, -this.cropper.width, this.cropper.height);
        c.fill();
    }

    drawPhoto(c) {
        const x = this.cropper.photo.x;
        const y = this.cropper.photo.y;
        const width = this.cropper.photo.getWidth();
        const height = this.cropper.photo.getHeight();
        c.drawImage(this.image, x, y, width, height);
    }

    render() {
        const defaultStyle = {
            cursor: "move",
            touchAction: 'none',
            userSelect: 'none'
        }
        const attributes = {
            className: this.props.className,
            width: this.cropper.width,
            height: this.cropper.height,
            style: {
                ...defaultStyle,
            },
        }
        return (
            <canvas ref={this.ref}  {...attributes}></canvas>
        );
    }


}

ImageCropperControl.defaultProps = defaultProps;
export default ImageCropperControl;
