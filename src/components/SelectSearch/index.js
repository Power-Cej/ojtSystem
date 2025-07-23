import React from "react";
import classNames from "../../classNames";

const noop = () => {};
const defaultProps = {
  loadOptions: noop,
  onChange: noop,
  onSearch: noop,
  onClickAdd: noop,
  onClickClear: noop,
  onFocus: noop,
  value: { label: "", value: "" },
  placeholder: "Select",
  dynamic: false,
};

function SelectSearch({
  className,
  value,
  placeholder,
  onChange,
  onSearch,
  onClickAdd,
  onClickClear,
  onFocus,
  focus,
  options,
  required,
  dynamic,
  uppercase,
  disabled,
}) {
  const [search, setSearch] = React.useState("");
  const [text, setText] = React.useState("");
  const [isOpen, setOpen] = React.useState(false);
  const ref = React.useRef(null);

  // handle click outside event
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setOpen(false);
      onFocus(false);
    }
  };

  React.useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", handleClickOutside);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  // when value change
  React.useEffect(() => {
    setText(value.label);
    setSearch("");
  }, [value]);

  function _onChange(e) {
    const value = e.target.value;
    // Get the new character input by the user by removing the previous text from the current value.
    const character = value.replace(text, "");
    if (search === "") {
      e.target.value = character;
    }
    if (uppercase) {
      e.target.value = value.toUpperCase();
    }
    // set the new character input by the user
    setSearch(e.target.value);
    setText(e.target.value);

    onSearch(e.target.value);
  }

  function onClick(e) {
    // e.target.setSelectionRange(0, 0);
    if (!isOpen) {
      e.target.blur();
    }
    setOpen(!isOpen || focus);
  }

  function onSelect(value, index) {
    onChange(value, index);
    setOpen(false);
    if (search) {
      // reset the options if has search
      onSearch("");
    }
  }

  function _onFocus(e) {
    if (!focus) {
      e.target.blur();
    }
    onFocus(true);
  }

  function onClickIcon(e) {
    if (text) {
      onClickClear(e);
    } else if (dynamic) {
      onClickAdd(e);
    } else {
      onClick(e);
    }
  }

  const style = { cursor: isOpen && focus ? "text" : "default" };
  const icon = text ? "bi bi-x" : dynamic ? "bi bi-plus" : "bi bi-chevron-down";
  const sort = (a, b) => {
    // Check if 'a' contains 'd' and 'b' does not
    const aContainsInput = a.label.includes(search);
    const bContainsInput = b.label.includes(search);
    if (aContainsInput && !bContainsInput) {
      return -1; // Move 'a' before 'b'
    } else if (!aContainsInput && bContainsInput) {
      return 1; // Move 'b' before 'a'
    } else {
      return 0; // Keep original order if both contain 'd' or neither does
    }
  };
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <div className="input-group">
        <input
          onClick={onClick}
          type="text"
          className={classNames(className, "form-control border-end-0 pe-0")}
          placeholder={placeholder}
          value={text}
          onChange={_onChange}
          onFocus={_onFocus}
          style={style}
          required={required}
          disabled={disabled}
        />
        <button
          onClick={onClickIcon}
          className="btn btn-link"
          type="button"
          disabled={disabled}
        >
          <i className={icon}></i>
        </button>
      </div>

      {isOpen && (
        <ul
          className="list-group rounded-0 bg-white"
          style={{
            position: "absolute",
            top: "100%",
            width: "100%",
            maxHeight: "200px",
            overflowY: "auto",
            zIndex: 1000,
          }}
        >
          {options.sort(sort).map((option, index) => (
            <li
              key={option.value}
              type="button"
              className="list-group-item list-group-item-action"
              onClick={() => onSelect(option, index)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

SelectSearch.defaultProps = defaultProps;
export default SelectSearch;
