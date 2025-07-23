import React from 'react';

import AccordionContext from "./AccordionContext";
import AccordionCollapse from "./AccordionCollapse";
import AccordionProvider from "./AccordionProvider";
import classNames from '../../classNames';


function Accordion({className, children, eventKey, as: Comp, ...props}) {
    const {handleToggle} = React.useContext(AccordionContext);
    const classes = classNames(className, 'accordion-toggle collapsed');
    return (
        <Comp
            className={classes}
            onClick={handleToggle}
            href={'#' + eventKey.replaceAll(':', '')+ '-collapse'}
            data-bs-toggle="collapse"
            aria-expanded="true"
            {...props}>
            {children}
        </Comp>
    );
}

Accordion.defaultProps = {
    as: 'a'
};
Accordion.Collapse = AccordionCollapse;
Accordion.Provider = AccordionProvider;
export default Accordion;
