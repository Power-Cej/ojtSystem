import React, {Component} from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    children: PropTypes.node.isRequired,
    element: PropTypes.node,
    hasMore: PropTypes.bool,
    initialLoad: PropTypes.bool,
    loader: PropTypes.node,
    loadMore: PropTypes.func.isRequired,
    ref: PropTypes.func,
    getScrollParent: PropTypes.func,
    threshold: PropTypes.number,
    useCapture: PropTypes.bool,
    useWindow: PropTypes.bool
};
const defaultProps = {
    element: 'div',
    hasMore: false,
    initialLoad: true,
    ref: null,
    threshold: 250,
    useWindow: true,
    useCapture: false,
    loader: null,
    getScrollParent: null
};

class Scroll extends Component {


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

    componentDidUpdate() {
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
        let scrollEl = window;
        if (this.props.useWindow === false) {
            scrollEl = this.scrollComponent.parentNode;
        }

        scrollEl.removeEventListener(
            'mousewheel',
            this.mousewheelListener,
            this.options ? this.options : this.props.useCapture
        );
    }

    detachScrollListener() {
        let scrollEl = window;
        if (this.props.useWindow === false) {
            scrollEl = this.getParentElement(this.scrollComponent);
        }

        scrollEl.removeEventListener(
            'scroll',
            this.scrollListener,
            this.options ? this.options : this.props.useCapture
        );
        scrollEl.removeEventListener(
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
        if (!this.props.hasMore || !parentElement) {
            return;
        }
        let scrollEl = window;
        if (this.props.useWindow === false) {
            scrollEl = parentElement;
        }
        scrollEl.addEventListener(
            'mousewheel',
            this.mousewheelListener,
            this.options ? this.options : this.props.useCapture
        );
        scrollEl.addEventListener(
            'scroll',
            this.scrollListener,
            this.options ? this.options : this.props.useCapture
        );
        scrollEl.addEventListener(
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
        const scrollEl = window;
        const parentNode = this.getParentElement(element);
        let offset;
        if (this.props.useWindow) {
            // get the root element
            const doc = document.documentElement || document.body.parentNode || document.body;
            // get the scroll top position
            const scrollTop = scrollEl.pageYOffset !== undefined ? scrollEl.pageYOffset : doc.scrollTop;
            offset = this.calculateOffset(element, scrollTop);
        } else {
            offset = element.scrollHeight - parentNode.scrollTop - parentNode.clientHeight;
        }
        // check if the offset is in the threshold
        // check if the element is still in the DOM and visible
        // to avoid trying to load more content after element has removed.
        console.log(offset);
        if (offset < Number(this.props.threshold) && (element && element.offsetParent !== null)) {
            this.detachScrollListener();
            this.beforeScrollHeight = parentNode.scrollHeight;
            this.beforeScrollTop = parentNode.scrollTop;
            // Call loadMore after detachScrollListener to allow for non-async loadMore functions
            if (typeof this.props.loadMore === 'function') {
                this.props.loadMore();
                this.loadMore = true;
            }
        }
    }

    calculateOffset(element, scrollTop) {
        if (!element) {
            return 0;
        }
        return (this.calculateTopPosition(element) + (element.offsetHeight - scrollTop - window.innerHeight));
    }

    calculateTopPosition(element) {
        if (!element) {
            return 0;
        }
        return element.offsetTop + this.calculateTopPosition(element.offsetParent);
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
            ref,
            threshold,
            useCapture,
            useWindow,
            getScrollParent,
            ...props
        } = this.props;
        // get reference of the element
        props.ref = node => {
            this.scrollComponent = node;
            // pass reference outside if defined
            ref && ref(node);
        };
        return React.createElement(element, props, children);
    }
}

Scroll.propTypes = propTypes;
Scroll.defaultProps = defaultProps;
export default Scroll;