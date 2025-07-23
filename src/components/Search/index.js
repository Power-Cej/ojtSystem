import React, { useState } from "react";
import { dialog } from "nq-component";
import Filter from "../Filter/Filter";
import classNames from "../../classNames";
import { Drawer } from "antd";
import InputFactory from "../InputFactory";
import { label } from "framer-motion/client";
import FormFactory from "../FormFactory";

let timeout;

function Search({ className, schemas, fields, onSubmit }) {
  function onChange(value) {
    const where = {};
    clearTimeout(timeout);
    const or = [];
    Object.keys(fields).forEach((field) => {
      const options = fields[field];
      if (options.type === "String") {
        const query = {};
        query[field] = { $regex: value, $options: "i" };
        or.push(query);
      } else if (options.type === "Boolean") {
        const query = {};
        query[field] = value === "true";
        or.push(query);
      } else if (options.type === "Pointer") {
        const query = {};
        query[field] = { $eq: value }; // Assuming `value` is the object ID to search for
        or.push(query);
      }
    });
    where.$or = or;
    timeout = setTimeout(() => {
      onSubmit(where);
    }, 300);
  }

  const [isClicked, setIsClicked] = useState(false);

  const showDrawer = () => {
    setIsClicked(true);
  };

  function _onSubmit(where) {
    // dialog.close();
    onSubmit(where);
  }

  // function onClickFilter() {

  //   dialog.fire({
  //     html: (
  //       <Filter
  //         schemas={schemas}
  //         fields={fields}
  //         onSubmit={_onSubmit}
  //         onCancel={() => dialog.close()}
  //       />
  //     ),
  //     footer: false,
  //   });
  // }
  const isMobile = window.innerWidth <= 768;
  const schemaFields = {
    fields: {
      batch: {
        type: "String",
        _type: "Enum",
        options: Array.from({ length: 10 }, (_, i) => (i + 1).toString()),
      },
    },
  };

  const handleChange = (value, field) => {
    const where = {
      [field]: value,
    };
    if (value) {
      _onSubmit(where);
    } else {
      _onSubmit({});
    }
    setIsClicked(false);
  };
  return (
    <div className={classNames("input-group", className)}>
      {/* <i
        className="bi bi-search position-absolute"
        style={{
          zIndex: 4,
          width: "50px",
          height: "50px",
          lineHeight: "40px",
          textAlign: "center",
        }}
      /> */}
      <input
        onChange={(e) => onChange(e.target.value)}
        type="search"
        className="form-control rounded-3 ps-2"
        placeholder="Search"
        style={{ width: "100px" }}
      />
      <button
        onClick={showDrawer}
        className="btn btn-link border-0 p-0 ms-1 d-flex align-items-center bg-transparent"
        type="button"
      >
        <i className="bi bi-filter fs-4" />
      </button>

      {/* show Drawer  */}
      <Drawer
        title="Basic Drawer"
        width={isMobile ? "70vw" : "30vw"}
        closable={{ "aria-label": "Close Button" }}
        onClose={() => setIsClicked(false)}
        open={isClicked}
      >
        {/* <Filter
            schemas={schemas}
            fields={fields}
            onSubmit={_onSubmit}
            onCancel={() => dialog.close()}
          /> */}
        <FormFactory
          className="w-100"
          schema={schemaFields}
          onChange={(value, field) => handleChange(value, field)}
        />
      </Drawer>
    </div>
  );
}

export default Search;
