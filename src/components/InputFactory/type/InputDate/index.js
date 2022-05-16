import React from "react";
import classNames from "../../../../classNames";

const defaultProps = {
    object: {},
    type: 'date',
};

function InputDate({className, field, object, ...options}) {
    const classes = classNames('form-control', className);
    const [value, setValue] = React.useState();
    React.useEffect(() => {
        object[field] && setValue(object[field].slice(0, 10));
    }, [object, field])

    function onInput(e) {
        const value = e.target.value;
        object[field] = value;
        setValue(value);
    }

    return (
        <input
            value={value}
            className={classes}
            name={field}
            onInput={onInput}
            {...options}/>
    )
}

InputDate.defaultProps = defaultProps;

export default InputDate;
