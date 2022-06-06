import classNames from "../../../../classNames";

function InputSelect({className, field, object, options=[], onChange, ...props}) {
    const classes = classNames('form-select fs-sm', className);

    function change(e) {
        const value = e.target.value;
        object[field] = value;
        onChange && onChange(value);
    }
    const value = object[field];
    return (
        <select
            className={classes}
            onChange={change}
            {...props}
            defaultValue={value}>
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
