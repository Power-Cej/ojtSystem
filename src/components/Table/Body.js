import React, { useState } from "react";
import CollapseView from "./CollapseView";
import { Checkbox } from "nq-component";
import AccordionCollapse from "nq-component/dist/Accordion/AccordionCollapse";
import AccordionProvider from "nq-component/dist/Accordion/AccordionProvider";
import { motion } from "framer-motion";
import { container, item } from "../../animationUtils";
import Accordion from "../Accordion";
import OutputFactory from "../OutputFactory";

let timeoutId;

function Body({
  collection,
  objects,
  fields,
  excludeFields,
  selected,
  selectable,
  onSelect,
  onClick,
  onLongPress,
  actionsList,
  collapsable,
  toggleable,
  actions,
  onClickItem,
  onClickView,
  fieldImage,
  onCollapse,
}) {
  // State to track which rows are collapsable (open or closed)
  const [collapsedRows, setCollapsedRows] = useState([]);

  const onPointerDown = () => {
    timeoutId = setTimeout(onLongPress, 500); // set long press time to 500ms
  };

  const onPointerUp = () => {
    clearTimeout(timeoutId);
  };

  const toggleCollapse = (index) => {
    setCollapsedRows((prevState) => {
      const newCollapsedRows = [...prevState];
      if (newCollapsedRows.includes(index)) {
        // If already collapsed, remove it (toggle to not collapsed)
        return newCollapsedRows.filter((i) => i !== index);
      } else {
        // If not collapsed, add it (toggle to collapsed)
        return [...newCollapsedRows, index];
      }
    });
  };

  return objects.map((object, index) => {
    const id = object.id || object._id;
    const checked = selected.includes(object);
    const isCollapsed = collapsedRows.includes(index);

    // onClick(object, index);

    return (
      <AccordionProvider key={id}>
        <motion.tr
          variants={container(0.1)}
          initial="hidden"
          animate="show"
          onClick={() => onClick(object, index)}
        >
          {/* <tr onClick={() => toggleCollapse(index)}> */}
          {selectable && (
            <th className="align-middle">
              <Checkbox
                checked={checked}
                id={"check_" + id}
                onChange={() => onSelect(index)}
              />
            </th>
          )}

          {Object.keys(fields).map((field, i) => {
            const options = fields[field];
            if (excludeFields.includes(field)) return null;
            return (
              <Accordion
                // as="td"
                as={motion.td}
                eventKey={`_${id}`}
                variants={item}
                key={field}
                className="fs-sm text-truncate"
                onPointerDown={onPointerDown}
                onPointerUp={onPointerUp}
                style={{
                  cursor: "pointer",
                  maxWidth: "15em",
                }}
              >
                <OutputFactory
                  field={field}
                  object={object}
                  {...options}
                  collection={collection}
                />
              </Accordion>
            );
          })}
          {actionsList.length > 0 && (
            <td>
              <div style={{ width: "50px" }}></div>
            </td>
          )}
          {actionsList.map((action) => (
            <td className="text-truncate" key={action.label}>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent table row click when action button is clicked
                  action.onClick && action.onClick(index);
                }}
                className="btn btn-outline-primary btn-sm fs-xs shadow-none"
              >
                <i className={action.icon} /> {action.label}
              </button>
            </td>
          ))}
          <td>
            <div>
              <i
                className={
                  !isCollapsed ? "bi bi-chevron-down" : "bi bi-chevron-up"
                }
                style={{ color: "#FFB200" }}
              ></i>
            </div>
          </td>
          {/* </tr> */}
        </motion.tr>

        {collapsable && (
          <tr>
            <td className="p-0" colSpan={Object.keys(fields).length + 1}>
              <AccordionCollapse
                toggleable={toggleable}
                className="collapse p-3"
                eventKey={`_${id}`}
              >
                {onCollapse(index, object, excludeFields) ||
                  CollapseView(
                    index,
                    object,
                    excludeFields,
                    fields,
                    actions,
                    onClickItem,
                    onClickView,
                    fieldImage
                  )}
              </AccordionCollapse>
            </td>
          </tr>
        )}
      </AccordionProvider>
    );
  });
}

export default Body;
