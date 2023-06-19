import React from "react";
import SelectSearch from "../components/SelectSearch";

function App() {
    const [value, setValue] = React.useState();
    const items = [{label: 'aa', value: 'aa'}, {label: 'bb', value: 'bb'}, {label: 'cc', value: 'cc'}];
    const [options, setOptions] = React.useState(items);

    function onSearch(word) {
        setOptions(items.filter(i => i.label === word));
    }

    return <SelectSearch
        value={value}
        onSearch={onSearch}
        onChange={setValue}
        options={options}/>

}

export default App;