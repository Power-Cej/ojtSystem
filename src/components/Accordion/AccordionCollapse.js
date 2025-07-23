import React from 'react';
import AccordionContext from "./AccordionContext";

const defaultProps = {
    as: 'div',
    toggleable: false
}

function AccordionCollapse({children, eventKey, toggleable, as: Comp, ...props}) {
    const {isOpen} = React.useContext(AccordionContext);
    return (<Comp
        className="collapse"
        id={eventKey.replaceAll(':', '') + '-collapse'}
        {...props}>
        {(!toggleable || isOpen) && children}
    </Comp>);
}

AccordionCollapse.defaultProps = defaultProps;

export default AccordionCollapse;