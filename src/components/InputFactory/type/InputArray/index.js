import React from 'react';
import CreatableSelect from "react-select/creatable";
import classNames from "../../../../classNames";
import optionToObject from "./optionToObject";
import createOption from "./createOption";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated({
    DropdownIndicator: null
});
const noop = () => "Type something to create options";
const components = {
    DropdownIndicator: null,
};

function InputArray({className, field, object}) {
    const classes = classNames(className);
    const [values, setValues] = React.useState((object[field] || []).map(createOption));
    const [value, setValue] = React.useState('');

    function onChange(_values) {
        setValues(_values);
    }

    function onInputChange(value) {
        setValue(value);
    }

    function onKeyDown(e) {
        switch (e.key) {
            case 'Enter':
            case 'Tab':
                e.preventDefault();
                setValues([...values, createOption(value)]);
                setValue('');
                object[field] = values.map(v => v.value);
        }
    }


    return (
        <CreatableSelect
            components={components}
            inputValue={value}
            isClearable
            isMulti
            menuIsOpen={false}
            onChange={onChange}
            onInputChange={onInputChange}
            onKeyDown={onKeyDown}
            placeholder="Type something and press enter..."
            value={values}
        />
    );
}

export default InputArray;
