import classNames from "../../../../classNames";

const defaultProps = {
    object: {},
    type: 'text',
};

function InputString({className, field, options, object, ...props}) {
    const classes = classNames('form-control', className);
    function onInput(e) {
        const value = e.target.value;
        object[field] = value;
    }

    const value = object[field];
    return (
        <input
            defaultValue={value}
            className={classes}
            name={field}
            onInput={onInput}
            {...props}/>
    )
}

InputString.defaultProps = defaultProps;

export default InputString;
