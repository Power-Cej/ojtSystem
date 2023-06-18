import React from "react";
import SelectSearch from "../components/SelectSearch";

function App() {
    const [value, setValue] = React.useState();

    function loadOptions(word, callback) {
        callback([{label: 'aa', value: 'aa'}, {label: 'bb', value: 'bb'}, {label: 'cc', value: 'cc'}])
    }

    return <SelectSearch
        value={value}
        onChange={setValue}
        loadOptions={loadOptions}/>

}

export default App;