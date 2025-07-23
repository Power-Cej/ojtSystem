import React from "react";
import { motion } from "framer-motion";
import Head from "./Head";
import Body from "./Body";
import classNames from "../../classNames";
import { AnimatePresence } from "framer-motion";

const noop = () => {};
const defaultProps = {
  fields: {},
  objects: [],
  excludeFields: [],
  selected: [],
  progress: false,
  onClick: noop,
  onClickItem: noop,
  onSelect: noop,
  onSelectAll: noop,
  readOnly: false,
  actions: [],
  actionsList: [],
  selectable: false,
  collapsable: false,
  toggleable: false,
  onCollapse: noop,
  onLongPress: noop,
};

function Table({
  className,
  fields,
  objects,
  progress,
  onClick,
  onClickItem,
  onClickView,
  selected,
  onSelect,
  onSelectAll,
  excludeFields,
  actions,
  actionsList,
  setRef,
  selectable,
  collection,
  onCollapse,
  collapsable,
  toggleable,
  onLongPress,
  style,
  ...props
}) {
  const fieldImage = Object.keys(fields).find(
    (field) =>
      (fields[field]._type === "Image" && fields[field].read !== false) ||
      fields[field].detail
  );

  return (
    <div className="position-relative">
      <div
        className={classNames("table-responsive shadow-sm", className)}
        ref={setRef}
        {...props}
      >
        <table className="table mb-0 w-100 table-striped">
          <thead className="" style={{ backgroundColor: "yellow" }}>
            <Head
              selectable={selectable}
              fields={fields}
              excludeFields={excludeFields}
              actionsList={actionsList}
              selected={selected}
              onSelectAll={onSelectAll}
              objects={objects}
            />
          </thead>

          <tbody className="bg-white">
            {objects.length === 0 && !progress && (
              <tr>
                <td
                  className="text-center fs-lg"
                  colSpan={Object.keys(fields).length + 1}
                >
                  No Data Found
                </td>
              </tr>
            )}
            <Body
              objects={objects}
              collection={collection}
              fields={fields}
              excludeFields={excludeFields}
              selected={selected}
              selectable={selectable}
              onSelect={onSelect}
              onClick={onClick}
              onLongPress={onLongPress}
              actionsList={actionsList}
              collapsable={collapsable}
              toggleable={toggleable}
              onCollapse={onCollapse}
              actions={actions}
              onClickItem={onClickItem}
              onClickView={onClickView}
              fieldImage={fieldImage}
            />

            <AnimatePresence mode="popLayout" presenceAffectsLayout>
              {progress &&
                [0.4, 0.25, 0.1].map((item) => {
                  return (
                    <motion.tr
                      key={item}
                      animate={{ opacity: 1 }}
                      initial={{ opacity: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      <td
                        className="w-100 placeholder-glow p-0"
                        style={{
                          height: "2rem",
                          opacity: item,
                        }}
                        colSpan={Object.keys(fields).length + 1}
                      >
                        <div className="h-100 w-100 placeholder col-12"></div>
                      </td>
                    </motion.tr>
                  );
                })}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}

Table.defaultProps = defaultProps;
export default Table;
