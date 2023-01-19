import React from "react";
import Scroll from "../Scroll";

const defaultProps = {
    element: 'div',
    hasMore: false,
    threshold: 100,
    useWindow: true,
};

class InfiniteScroll extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        this.loadMore = false;
        console.log("componentDidUpdate");
    }

    onScroll(position) {
        if (!this.props.hasMore) {
            return;
        }
        if (this.loadMore) {
            return;
        }

        const element = this.scrollComponent;
        this.offset = this.calculateOffset(element, position);

        // check if the offset is in the threshold
        // check if the element is still in the DOM and visible
        // to avoid trying to load more content after element has removed.
        if (this.offset < Number(this.props.threshold) && (element && element.offsetParent !== null)) {
            if (typeof this.props.loadMore === 'function') {
                this.loadMore = true;
                this.props.loadMore();
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
            hasMore,
            loadMore,
            ...props
        } = this.props;
        props.reff = node => {
            this.scrollComponent = node;
        };
        return (
            <Scroll
                {...props}
                onScroll={this.onScroll.bind(this)}>
                {children}
            </Scroll>
        )
    }
}

InfiniteScroll.defaultProps = defaultProps;
export default InfiniteScroll;