import React, { useState } from "react";
import dialog from "../Modal/dialog";
import SelectSearch from "../SelectSearch";
import RelationDialog from "../RelationDialog";
import GetOption from "./GetOption";
import filterFields from "../../filterFields";
import objectToOption from "./objectToOption";

const defaultProps = {
  includes: [],
};

function InputPointer({
  schema,
  object,
  pick,
  target,
  onChange,
  isMulti,
  where,
  indexes,
  field,
  defaultValue,
  findObject,
  saveObject,
  saveFile,
  saveImage,
  schemas,
  keys,
  dynamic,
  sort,
  includes,
  ...props
}) {
  const [value, setValue] = useState(isMulti ? [] : { label: "", value: "" });
  const [options, setOptions] = useState([]);
  const [focus, setFocus] = useState(false);

  function onClickAdd() {
    const onClickItem = (object) => {
      _onChange(objectToOption(object, _indexes));
      dialog.close();
    };
    dialog.fire({
      html: (
        <RelationDialog
          onClickItem={onClickItem}
          schema={schema}
          objects={object}
          onCancel={() => dialog.close()}
          findObject={findObject}
          saveObject={saveObject}
          saveFile={saveFile}
          saveImage={saveImage}
          schemas={schemas}
        />
      ),
      footer: false,
    });
  }

  // indexes use for display
  const _indexes = React.useMemo(() => {
    const items = indexes || filterFields(schema.fields, "_index");
    // if no index use name
    return items.length > 0 ? items : ["name"];
  }, [schema]);

  // keys use for selected keys for query
  const _keys = React.useMemo(() => {
    const items = keys || filterFields(schema.fields, "key");
    return items;
  }, [schema]);

  // set default value
  React.useEffect(() => {
    if (isMulti) {
      defaultValue &&
        setValue(defaultValue.map((obj) => objectToOption(obj, _indexes)));
    } else {
      defaultValue && setValue(objectToOption(defaultValue, _indexes));
    }
  }, [_indexes, defaultValue, isMulti]);

  function callback(options) {
    setOptions(options);
    // find default value
    if (defaultValue) {
      const option = options.find((o) => o.value === defaultValue.id);
      option && setValue(option);
    }
  }

  // load the initial select
  React.useEffect(() => {
    new GetOption(
      target,
      "",
      _indexes,
      findObject,
      where,
      callback,
      _keys,
      sort,
      includes
    );
  }, [target, _indexes]);

  function _onChange(option) {
    if (isMulti) {
      const newValue = [...value, option];
      setValue(newValue);
      onChange(newValue.map((o) => o.object));
    } else {
      setValue(option);
      onChange(option.object);
    }
  }

  function onClickClear() {
    setValue(isMulti ? [] : { label: "", value: "" });
    onChange(isMulti ? [] : {});
  }

  function onSearch(word) {
    new GetOption(
      target,
      word,
      _indexes,
      findObject,
      where,
      setOptions,
      _keys,
      sort,
      includes
    );
  }

  function getValue() {
    if (isMulti && !focus) {
      const values = value.map((v) => v.label).reverse();
      return { label: values.join(", ") };
    }
    return value;
  }

  function getOptions() {
    // remove the selected from the option
    if (isMulti) {
      return options.filter((o) => !value.includes(o));
    }
    return options.filter((o) => o !== value);
  }

  return (
    <SelectSearch
      label={`Select ${target}`}
      value={getValue()}
      onChange={_onChange}
      onSearch={onSearch}
      options={getOptions()}
      onFocus={setFocus}
      onClickAdd={onClickAdd}
      onClickClear={onClickClear}
      dynamic={dynamic}
      focus
      {...props}
    />
  );
}

InputPointer.defaultProps = defaultProps;
export default InputPointer;
