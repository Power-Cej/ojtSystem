import React from 'react';
import AccordionContext from './AccordionContext';

function AccordionProvider({children}) {
    const [isOpen, setIsOpen] = React.useState(false);
    const handleToggle = () => {
        setIsOpen(!isOpen);
    };
    return <AccordionContext.Provider value={{isOpen, handleToggle}}>{children}</AccordionContext.Provider>;
}

export default AccordionProvider;
