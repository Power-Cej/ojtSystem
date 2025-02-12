import React from "react";
import SelectSearch from "../SelectSearch";


const noop = () => {

}
const defaultProps = {
    defaultValue: '', selected: -1, onChange: noop, options: []
}

// map the options
function map(option) {
    if (typeof option === 'string') {
        return {label: option, value: option};
    }
    return option;
}

function InputSelect({className, options, onChange, selected, defaultValue, dynamic, ...props}) {
    const [value, setValue] = React.useState();

    function change(option) {
        setValue(option);
        onChange(option.value);
    }

    function onSearch(text) {
        if (dynamic) {
            onChange(text);
        }
    }

    function onClickClear() {
        onChange("");
        setValue({label: "", value: ""});
    }

    return (<SelectSearch
            focus={dynamic}
            value={value || map(defaultValue)}
            className={className}
            options={options.map(map)}
            onChange={change}
            onSearch={onSearch}
            onClickClear={onClickClear}
            {...props}/>)
}

InputSelect.defaultProps = defaultProps;

export default InputSelect;
