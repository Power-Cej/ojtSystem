import React from 'react';

const defaultProps = {
    element: 'div',
    hasMore: false,
    initialLoad: true,
    ref: null,
    threshold: 0,
    useWindow: true,
    useCapture: false,
    loader: null,
    getScrollParent: null
};

class Scroll extends React.Component {
    constructor(props) {
        super(props);
        this.scrollListener = this.scrollListener.bind(this);
        this.eventListenerOptions = this.eventListenerOptions.bind(this);
        this.mousewheelListener = this.mousewheelListener.bind(this);
    }

    componentDidMount() {
        this.options = this.eventListenerOptions();
        this.attachScrollListener();
    }

    componentWillUnmount() {
        this.detachScrollListener();
        this.detachMousewheelListener();
    }

    isPassiveSupported() {
        let passive = false;
        const testOptions = {
            get passive() {
                passive = true;
            }
        };
        try {
            document.addEventListener('test', null, testOptions);
            document.removeEventListener('test', null, testOptions);
        } catch (e) {
            // ignore
        }
        return passive;
    }

    eventListenerOptions() {
        let options = this.props.useCapture;
        if (this.isPassiveSupported()) {
            options = {
                useCapture: this.props.useCapture,
                passive: true
            };
        } else {
            options = {
                passive: false
            };
        }
        return options;
    }

    // Set a defaut loader for all your `Scroll` components
    setDefaultLoader(loader) {
        this.defaultLoader = loader;
    }

    detachMousewheelListener() {
        let scrollElement = window;
        if (this.props.useWindow === false) {
            scrollElement = this.scrollComponent.parentNode;
        }

        scrollElement.removeEventListener(
            'mousewheel',
            this.mousewheelListener,
            this.options ? this.options : this.props.useCapture
        );
    }

    detachScrollListener() {
        let scrollElement = window;
        if (this.props.useWindow === false) {
            scrollElement = this.getParentElement(this.scrollComponent);
        }
        scrollElement.removeEventListener(
            'scroll',
            this.scrollListener,
            this.options ? this.options : this.props.useCapture
        );
        scrollElement.removeEventListener(
            'resize',
            this.scrollListener,
            this.options ? this.options : this.props.useCapture
        );
    }

    getParentElement(element) {
        const scrollParent = this.props.getScrollParent && this.props.getScrollParent();
        if (scrollParent != null) {
            return scrollParent;
        }
        return element && element.parentNode;
    }

    attachScrollListener() {
        const parentElement = this.getParentElement(this.scrollComponent);
        if (!parentElement) {
            return;
        }
        let scrollElement = window;
        if (this.props.useWindow === false) {
            scrollElement = parentElement;
        }
        scrollElement.addEventListener(
            'mousewheel',
            this.mousewheelListener,
            this.options ? this.options : this.props.useCapture
        );
        scrollElement.addEventListener(
            'scroll',
            this.scrollListener,
            this.options ? this.options : this.props.useCapture
        );
        scrollElement.addEventListener(
            'resize',
            this.scrollListener,
            this.options ? this.options : this.props.useCapture
        );
        if (this.props.initialLoad) {
            this.scrollListener();
        }
    }

    mousewheelListener(e) {
        // Prevents Chrome hangups
        // See: https://stackoverflow.com/questions/47524205/random-high-content-download-time-in-chrome/47684257#47684257
        if (e.deltaY === 1 && !this.isPassiveSupported()) {
            e.preventDefault();
        }
    }

    scrollListener() {
        const element = this.scrollComponent;
        const scrollElement = window;
        const parentNode = this.getParentElement(element);
        let offset;
        if (this.props.useWindow) {
            // get the root element
            const doc = document.documentElement || document.body.parentNode || document.body;
            // get the scroll top position
            const scrollTop = scrollElement.pageYOffset !== undefined ? scrollElement.pageYOffset : doc.scrollTop;
            this.props.onScroll && this.props.onScroll(scrollTop);
        } else {
            offset = element.scrollHeight - parentNode.scrollTop - parentNode.clientHeight;
        }
    }

    render() {
        const {
            children,
            element,
            hasMore,
            initialLoad,
            loader,
            loadMore,
            pageStart,
            reff,
            threshold,
            useCapture,
            useWindow,
            getScrollParent,
            ...props
        } = this.props;
        // get reference of the element
        props.ref = node => {
            this.scrollComponent = node;
            reff && reff(node);
        };
        return React.createElement(element, props, children);
    }
}

Scroll.defaultProps = defaultProps;
export default Scroll;