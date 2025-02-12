import React from "react";
import { Table } from "nq-component";

const defaultProps = {
  where: {},
  limit: 10,
};

function OutputTable({
  schema,
  excludeFields,
  where,
  onClickItem,
  limit,
  className,
  findObject,
  ...props
}) {
  const [objects, setObjects] = React.useState([]);
  const [progress, setProgress] = React.useState(true);
  const [current, setCurrent] = React.useState(1);
  const sort = { createdAt: -1 };

  const getObjects = async () => {
    const skip = (current - 1) * limit;
    const query = {
      count: true,
      limit: limit,
      skip: skip,
      where: where,
      include: ["all"],
      sort: sort,
    };
    setProgress(true);
    try {
      const { count, objects } = await findObject.execute(
        schema.collection,
        query
      );
      setObjects(objects);
    } catch (error) {
      console.error(error);
    }
    setProgress(false);
  };

  function onClick(i) {
    onClickItem(objects[i]);
  }

  React.useEffect(() => {
    getObjects();
  }, [where]);

  return (
    <Table
      onClick={onClick}
      fields={schema.fields}
      objects={objects}
      progress={progress}
      excludeFields={excludeFields}
      className={className}
      {...props}
    />
  );
}

OutputTable.defaultProps = defaultProps;
export default OutputTable;
