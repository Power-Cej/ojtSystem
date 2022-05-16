import Select from 'react-select';
import icons from "../../../../icons.json";
import IconItem from "./IconItem";

function InputIcon({className, field, object, ...props}) {
    function onChange(values) {
        object[field] = values.value;
    }

    return (
        <Select
            options={icons.map(i => {
                return {label: i, value: i}
            })}
            onChange={onChange}
            components={{Option: IconItem}}/>
    )
}

export default InputIcon;
