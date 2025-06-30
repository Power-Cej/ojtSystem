import { Button, dialog, FormFactory, printComponent } from "nq-component";
import BaseListPresenter from "../../base/BaseListPresenter";
import { renderToStaticMarkup } from "react-dom/server";
import PrintCOC from "./PrintCOC/printCOC";

class DashboardMainPresenter extends BaseListPresenter {
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
    this.limit = 20000;
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
    const query = {
      limit: this.limit,
      skip: skip,
      where: { ...this.where, ...this.search, ...this.filter, ...where },
      include: this.include,
    };
    if (this.sort) {
      query.sort = this.sort;
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

      // for (const object of objects) {
      //   const users = await this.findObjectUseCase.execute("users", {
      //     where: { username: object.user },
      //     keys: ["batch"],
      //   });
      //   object.batch = users[0]?.batch;
      // }

      this.view.setObjects(objects);
      // this.view.setCurrent(this.current);
      this.hideProgress();
    } catch (error) {
      this.hideProgress();
      this.view.showError(error);
    }
    this.progress = false;
  }

  onChange(value, field) {
    this.view.setState((prevState) => ({
      object: {
        ...prevState.object,
        [field]: value,
      },
    }));
  }

  async openModal(user, times) {
    const currentUser = await this.findObjectUseCase.execute("users", {
      where: { username: user },
    });
    this.view.setState({ object: { ...(currentUser[0] || {}), times } });
    const cocSchema = {
      fields: {
        timeRendered: {
          type: "Number",
          required: true,
        },
        dateFrom: {
          type: "Date",
          required: true,
        },
        dateTo: {
          type: "Date",
          required: true,
        },
        nameOfSignatory: {
          type: "String",
          required: true,
          uppercase: true,
        },
        position: {
          type: "String",
          required: true,
        },
      },
    };

    dialog.fire({
      html: (
        <form
          className="p-3"
          onSubmit={(e) => {
            e.preventDefault();
            this.handlePrintCOC();
          }}
        >
          <h5>Print COC</h5>
          <FormFactory
            schema={cocSchema}
            // object={object}
            className="col-lg-12 mb-2"
            onChange={(value, field) => this.onChange(value, field)}
          />
          <div className="gap-3 d-flex justify-content-end mt-3">
            <Button type="submit" className="btn btn-success">
              Submit
            </Button>
            <Button type="button" onClick={() => dialog.close()}>
              Cancel
            </Button>
          </div>
        </form>
      ),
      footer: false,
    });
  }

  async handlePrintCOC() {
    // printComponent(this.view.contractPDF.current, "Tasks");
    // const object = this.view.state;
    const iframe = document.createElement("iframe");
    iframe.style.position = "absolute";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "none";

    document.body.appendChild(iframe);

    const iframeDoc = iframe.contentWindow.document;

    // const printContentElement = PrintCOC({
    //   object: object,
    // });
    const printContentHTML = this.view.contractPDF.current.outerHTML;

    iframeDoc.open();
    iframeDoc.write(`
  <html>
    <head>
      <title>Print PDS</title>
      <style>
        * {
          margin: 0 !important;
          padding: 0 !important;
          box-sizing: border-box;
        }

        html, body {
          font-family: Arial, sans-serif;
          width: 100%;
          height: 100%;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          color-adjust: exact !important;
        }

        .print-content-container {
          display: flex;
          flex-direction: row;
          justify-content: center;
          width: 100%;
        }

        .print-content {
          position: relative;
          width: 100%;
        }

        @page {
          size: auto;
          margin: 0;
        }
      </style>
    </head>
    <body>
`);
    // iframeDoc.write('<div class="print-content-container">');
    // iframeDoc.write('<div class="print-content">');
    iframeDoc.write(printContentHTML);
    iframeDoc.write("</body></html>");
    iframeDoc.close();

    iframe.onload = () => {
      iframe.contentWindow.print();
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 1000);
    };
  }
}

export default DashboardMainPresenter;
