import BaseListPresenter from "../../base/BaseListPresenter";
import saveAs from "../../saveAs";
import * as XLSX from "xlsx";

class CollectionListPresenter extends BaseListPresenter {
  constructor(
    view,
    findObjectUseCase,
    countObjectUseCase,
    deleteObjectUseCase,
    upsertUseCase,
    exportCSVUseCase,
    addSchemaUseCase,
    updateSchemaUseCase,
    deleteSchemaUseCase
  ) {
    super(view, findObjectUseCase, countObjectUseCase, deleteObjectUseCase);
    this.upsertUseCase = upsertUseCase;
    this.exportCSVUseCase = exportCSVUseCase;
    this.addSchemaUseCase = addSchemaUseCase;
    this.updateSchemaUseCase = updateSchemaUseCase;
    this.deleteSchemaUseCase = deleteSchemaUseCase;
  }

  componentDidUpdate(prevProps) {
    const prevClassName = prevProps.params.name;
    const newClassName = this.view.getCollectionName();
    //if collection change
    if (prevClassName !== newClassName) {
      this.init();
      this.getObjects();
    }
  }

  init() {
    this.limit = 20;
    this.where = {};
    this.search = {};
    this.filter = {};
    this.include = [""];
    this.keys = undefined; // if keys are specified, only those keys will be returned
    this.sort = { createdAt: -1 };
    this.progress = true;
    this.reset();
  }

  createQuery() {
    const skip = (this.current - 1) * this.limit;
    const collection = this.view.getCollectionName();
    const user = this.view.getCurrentUser();
    const roles = this.view.getCurrentRoles();
    let where = {};
    if (
      collection === "daily_time_record" &&
      user?.username &&
      roles?.[0]?.id.includes("OJT")
    ) {
      where = { user: user?.username };
    }
    // collection === "biometric_logs" && user?.username
    //   ? { username: user?.username }
    //   : {};
    const query = {
      limit: this.limit,
      skip: skip,
      where: { ...this.where, ...this.search, ...this.filter, ...where },
      include: this.include,
    };
    if (this.sort) {
      query.sort =
        collection === "daily_time_record" ? { date: -1 } : this.sort;
    }
    const keys = this.keys || this.view.getKeys() || [];
    if (keys.length > 0) {
      query.keys = keys;
    }
    return query;
  }

  async findObjects() {
    const collection = this.view.getCollectionName();
    const query = this.createQuery();
    try {
      this.showProgress();
      this.findObjectUseCase.abort();
      const objects = await this.findObjectUseCase.execute(collection, query);
      this.objects = this.objects.concat(objects);
      this.view.setTotal(this.objects.length);
      this.view.setObjects(this.objects);
      this.hideProgress();
    } catch (error) {
      this.hideProgress();
      this.view.showError(error);
    }
    this.progress = false;
  }

  onClickImport(file) {
    this.view.showProgress();
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target.result);
        this.saveObjects(json);
      } catch (error) {
        console.error("Error parsing the JSON file:", error);
        alert("An error occurred while reading the JSON file.");
      }
    };
    reader.readAsText(file);
  }
  async saveObjects(objects) {
    const collection = this.view.getCollectionName();
    this.view.setCount(objects.length);
    const size = 20;
    let i = 0;
    while (i < objects.length) {
      const batch = objects.slice(i, i + size);
      // Process each batch
      await Promise.all(
        batch.map(async (object, index) => {
          try {
            await this.upsertUseCase.execute(collection, object);
            // Update the total count in the view
            this.view.setTotal(i + index + 1);
          } catch (error) {
            // Log and ignore errors
            console.log(object);
            console.log(error);
          }
        })
      );
      // Move to the next batch
      i += size;
    }
    // Hide the progress indicator
    this.view.hideProgress();
    this.init();
    await this.getObjects();
  }
  async onClickExport() {
    this.view.showProgress();
    const collection = this.view.getCollectionName();
    let objects = this.view.getSelected();
    if (objects.length === 0) {
      try {
        const query = {
          where: { ...this.where, ...this.search, ...this.filter },
          include: this.include,
        };
        await this.view.showConfirmDialog(
          "Export all data take longer!",
          "Export all data?",
          "EXPORT"
        );
        objects = await this.findObjectUseCase.execute(collection, query);
      } catch (e) {
        return;
      }
    }
    const blob = new Blob([JSON.stringify(objects, null, 2)], {
      type: "application/json",
    });
    const date = new Date();
    const day = date.toISOString().slice(0, 10);
    const time = date.toLocaleTimeString("en-GB").replaceAll(":", "");
    saveAs(blob, `${collection}-${day}-${time}.json`);
    this.view.hideProgress();
  }

  onSubmitDeleteField(field) {
    const collection = this.view.getCollectionName();
    const schema = this.view.getSchema(collection);
    delete schema["fields"][field];
    this.updateSchemaUseCase
      .execute(schema)
      .then(() => {
        this.view.forceUpdate();
        this.view.closeDialog();
      })
      .catch((error) => {
        this.view.showError(error);
      });
  }

  onSubmitAddCollection(schema) {
    this.view.closeDialog();
    this.addSchemaUseCase
      .execute(schema)
      .then((schema) => {
        const schemas = this.view.getSchemas();
        schemas.push(schema);
        this.view.setSchemas(schemas);
        this.view.navigateTo("/collection/" + schema.collection);
      })
      .catch((error) => {
        this.view.showError(error);
      });
  }

  onSubmitEditCollection(schema) {
    this.view.closeDialog();
    this.updateSchemaUseCase
      .execute(schema)
      .then((schema) => {
        const schemas = this.view.getSchemas();
        const index = schemas.findIndex(
          (s) => s.collection === schema.collection
        );
        schemas[index] = schema;
        this.view.setSchemas(schemas);
      })
      .catch((error) => {
        this.view.showError(error);
      });
  }

  onSubmitDeleteCollection(collection) {
    if (collection !== this.view.getCollectionName()) {
      this.view.closeDialog();
      this.view.showError("Please enter correct Class name");
      return;
    }
    this.deleteSchemaUseCase
      .execute(collection)
      .then(() => {
        this.view.closeDialog();
        const schemas = this.view.getSchemas();
        const index = schemas.findIndex((s) => s.collection === collection);
        schemas.splice(index, 1);
        this.view.setSchemas(schemas);
        this.view.navigateTo("/collection/" + schemas[0].collection);
      })
      .catch((error) => {
        this.view.closeDialog();
        this.view.showError(error);
      });
  }

  onSubmitAccess(acl) {
    const selected = this.view.getSelected();
    const collection = this.view.getCollectionName();
    const promises = selected.map((o) => {
      const change = { id: o.id, acl };
      o.acl = acl; // mutate the object
      return this.upsertUseCase.execute(collection, change);
    });
    Promise.all(promises)
      .then(() => {
        this.view.closeDialog();
      })
      .catch((error) => {
        this.view.closeDialog();
        this.view.showError(error);
      });
  }

  async exportCSVToCSV(schema) {
    const objects = await this.findObjectUseCase.execute(
      this.view.getCollectionName(),
      {
        where: { ...this.createQuery().where, "acl.read": { $exists: true } },
        include: ["employee", "position", "employmentType"],
      }
    );

    if (!objects || !Array.isArray(objects)) {
      this.view.showError("No data found for export.");
      return;
    }

    const camelToLabel = (str) =>
      str.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());

    const label = Object.keys(schema.fields)
      .filter((fieldName) => {
        const config = schema.fields[fieldName];
        return config && config.read !== false;
      })
      .map((fieldName) => ({
        key: fieldName,
        label: schema.fields[fieldName].label || camelToLabel(fieldName),
      }));

    const processedData = objects.map((obj, index) => {
      const rowObj = { ...obj };

      if (rowObj.timeRecStats) {
        rowObj.timeRecStats = rowObj.timeRecStats.join(", ");
      }
      if (rowObj.month) {
        const monthNames = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        const monthIndex = parseInt(rowObj.month, 10) - 1;
        rowObj.month = monthNames[monthIndex] || rowObj.month;
      }
      if (rowObj.date) {
        const date = new Date(rowObj.date);

        rowObj.date = date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
      }
      // if (rowObj.employmentType) {
      //   rowObj.employmentType = rowObj?.employmentType?.name;
      // }
      // if (rowObj.employee) {
      //   rowObj.employee = `${rowObj.employee.Firstname || ""} ${
      //     rowObj.employee.Middlename || ""
      //   } ${rowObj.employee.surname || ""}`.trim();
      // }
      // if (rowObj.updatedAt) {
      //   rowObj.updatedAt = formatDate(rowObj.updatedAt);
      // }

      const processedRow = {};
      label.forEach(({ key, label: headerLabel }) => {
        const val = rowObj[key];
        processedRow[headerLabel] = val == null ? "" : String(val);
      });

      return processedRow;
    });

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(processedData);

    // Set column widths
    const colWidths = label.map(({ label: header }) => {
      const maxWidth = Math.max(
        header.length,
        ...processedData.map((row) => (row[header] || "").length)
      );
      return { wch: Math.min(Math.max(maxWidth + 2, 10), 50) };
    });
    worksheet["!cols"] = colWidths;

    // 2. Get range of worksheet
    const range = XLSX.utils.decode_range(worksheet["!ref"]);

    // 3. Apply bold style to header row (row 0)
    for (let col = range.s.c; col <= range.e.c; col++) {
      const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
      if (worksheet[cellAddress]) {
        worksheet[cellAddress].s = {
          font: {
            bold: true,
          },
          alignment: {
            vertical: "center",
            horizontal: "center",
          },
        };
      }
    }

    // Append sheet and write with cellStyles enabled
    XLSX.utils.book_append_sheet(workbook, worksheet, "Export Data");

    XLSX.writeFile(workbook, `${schema.label || schema.collection}.xlsx`, {
      cellStyles: true,
    });
  }
}

export default CollectionListPresenter;
