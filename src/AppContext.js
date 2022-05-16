import React from 'react';

const Context = React.createContext({});

export default Context;

export function withContext(WrappedComponent) {
    return React.forwardRef((props, ref) => (
        <Context.Consumer>
            {(value) => <WrappedComponent ref={ref} {...value} {...props} />}
        </Context.Consumer>
    ));
}
