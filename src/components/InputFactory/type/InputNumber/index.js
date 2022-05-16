import classNames from "../../../../classNames";

const defaultProps = {
    object: {},
    type: 'text',
};

function InputNumber({className, field, options, object, ...props}) {
    const classes = classNames('form-control', className);

    function onInput(e) {
        e.target.value = e.target.value.replace(/[^\d]/gi, '');
        if (e.target.value === '' || !e.target.validity.valid) {
            return;
        }
        object[field] = parseInt(e.target.value);
    }

    const value = object[field];
    return (
        <input
            type="tel"
            defaultValue={value}
            className={classes}
            name={field}
            onInput={onInput}
            {...props}/>
    )
}

InputNumber.defaultProps = defaultProps;

export default InputNumber;
