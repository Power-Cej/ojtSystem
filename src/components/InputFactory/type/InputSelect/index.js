import classNames from "../../../../classNames";

function InputSelect({className, field, object, options, ...props}) {
    const classes = classNames('form-select fs-sm', className);

    function onChange(e) {
        const value = e.target.value;
        object[field] = value;
    }

    return (
        <select
            className={classes}
            onChange={onChange}
            {...props}
            defaultValue="">
            <option value="" disabled>
                Select {field}
            </option>
            {
                options.map((o, i) => <option key={i}>{o}</option>)
            }
        </select>
    )
}

export default InputSelect;
