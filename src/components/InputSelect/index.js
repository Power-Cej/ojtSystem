import React from "react";
import SelectSearch from "../SelectSearch";


const noop = () => {

}
const defaultProps = {
    defaultValue: '',
    selected: -1,
    onChange: noop,
    options: []
}

// map the options
function map(option) {
    if (typeof option === 'string') {
        return {label: option, value: option};
    }
    return option;
}

function InputSelect({className, options, onChange, selected, ...props}) {
    const [value, setValue] = React.useState();

    function change(option) {
        setValue(option);
        onChange(option.value);
    }

    return (
        <SelectSearch
            className={className}
            value={value}
            options={options.map(map)}
            onChange={change}
            {...props}/>
    )
}

InputSelect.defaultProps = defaultProps;

export default InputSelect;
