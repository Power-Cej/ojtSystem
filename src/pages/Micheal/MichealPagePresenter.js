import * as XLSX from "xlsx";
import BaseListPresenter from "../../base/BaseListPresenter";

class MichealPagePresenter extends BaseListPresenter {
  constructor(view, findObjectUseCase, upsertUseCase, countObjectUseCase) {
    super(view, findObjectUseCase);
    this.upsertUseCase = upsertUseCase;
    this.countObjectUseCase = countObjectUseCase;
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

    // const user = this.view.getCurrentUser();
    // const roles = this.view.getCurrentRoles();

    let where = {};
    // if (
    //   collection === "daily_time_record" &&
    //   user?.username &&
    //   roles?.[0]?.id.includes("OJT")
    // ) {
    //   where = { user: user?.username };
    // }
    if (this.view.paramsTest()?.id) {
      where = {
        logMessage: { $regex: this.view.paramsTest()?.id, $options: "i" },
      };
    }
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
      objects.forEach((object) => {
        if (object?.createdAt) {
          const formatDate = new Date(object.createdAt).toLocaleDateString(
            "en-US",
            {
              year: "numeric",
              month: "long",
              day: "numeric",
            }
          );
          return (object.createdAt = formatDate);
        }
      });
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

export default MichealPagePresenter;
