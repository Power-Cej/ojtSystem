import {
  Button,
  InfiniteScroll,
  InputFactory,
  printComponent,
  Progress,
  Search,
} from "nq-component";
import BaseListPage from "../../base/BaseListPage";
import {
  countObjectUseCase,
  findObjectUseCase,
  upsertUseCase,
} from "../../usecases/object";
import DailyTimerecordPresenter from "./DailyTimerecordPresenter";
import NavBar from "../../components/navbar";
import Table from "../../components/Table";
import withRouter from "../../withRouter";
import PrintDTR from "./PrintDTR/PrintDTR";
import { createRef } from "react";

class DailyTimerecord extends BaseListPage {
  constructor(props) {
    super(props);
    this.presenter = new DailyTimerecordPresenter(
      this,
      findObjectUseCase(),
      upsertUseCase(),
      countObjectUseCase()
    );
    this.state = {
      objects: [],
      object: {},
      selected: [],
      month: [
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
      ],
      currentUser: {},
    };
    this.printPDF = createRef();
  }

  componentDidMount() {
    this.presenter.componentDidMount();
  }

  getCollectionName() {
    return "daily_time_record";
  }

  paramsTest() {
    return this.getParams();
  }

  render() {
    const schema = this.getSchema(this.getCollectionName());
    const { objects, selected, count, progress, object, currentUser } =
      this.state;
    if (!schema) return <Progress />;
    const user = this.getCurrentUser();
    return (
      <>
        <NavBar
          action={() => {
            return (
              <div
                className="dropdown dropstart d-inline-block"
                style={{ fontSize: "clamp(1.5rem, 2vw, 1.8rem)" }}
              >
                <i
                  role="button"
                  data-bs-toggle="dropdown"
                  className="bi bi-three-dots-vertical text-white"
                ></i>
                <div className="dropdown-menu fs-xs text-center">
                  <Button
                    className="btn btn-primary"
                    onClick={() => this.presenter.exportCSVToCSV(schema)}
                  >
                    Export CSV
                  </Button>
                </div>
              </div>
            );
          }}
        />
        <div
          className="overflow-auto"
          style={{
            fontSize: "clamp(12px, 2vw, 1rem)",
          }}
        >
          <InfiniteScroll
            className="h-100"
            loadMore={this.loadMore.bind(this)}
            hasMore={!progress && count > objects?.length}
          >
            <div className="d-none mt-5">
              <div ref={this.printPDF} id="printPDF">
                <PrintDTR objects={objects} object={object} />
              </div>
            </div>
            <div className="p-3 p-lg-4">
              <div className="d-flex justify-content-between align-items-center">
                <h1
                  className="fw-bold text-capitalize"
                  style={{
                    fontSize: "clamp(1.5rem, 4vw, 2.5rem)", // scales between 1rem and 2.5rem based on viewport
                  }}
                >
                  {schema.label || this.getCollectionName()}
                </h1>
                <div className="text-nowrap d-grid">
                  <div className="d-flex gap-2">
                    <span>
                      {selected.length > 0 ? "Selected: " : "Total: "}
                    </span>
                    <span
                      className="fs-sm text-nowrap"
                      style={{
                        fontSize: "clamp(12px, 2vw, 1rem)",
                      }}
                    >
                      {selected.length > 0 ? selected.length : objects.length}
                    </span>
                    <span>of </span>
                    <span
                      className="fs-sm text-nowrap"
                      style={{
                        fontSize: "clamp(12px, 2vw, 1rem)",
                      }}
                    >
                      {count}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <form
                  className="d-flex justify-content-between"
                  style={{ margin: "1rem 0" }}
                  onSubmit={(e) => {
                    e.preventDefault();
                    printComponent(this.printPDF.current, "Task");
                  }}
                >
                  <div style={{ width: "clamp(200px, 20vw, 25%)" }}>
                    <InputFactory
                      className="ms-1"
                      type="String"
                      _type="Enum"
                      required={true}
                      onChange={(value) => {
                        this.setState({
                          object: {
                            fullName: `${currentUser?.firstName || ""} ${
                              currentUser?.middleName || ""
                            } ${currentUser?.lastName || ""}`,
                            selectedMonth: value,
                          },
                        });
                        this.onChangeFilter("String", value, "month");
                      }}
                      placeholder="Select Month"
                      options={this.state.month.map((item) => {
                        const value = {
                          January: "0",
                          February: "1",
                          March: "2",
                          April: "3",
                          May: "4",
                          June: "5",
                          July: "6",
                          August: "7",
                          September: "8",
                          October: "9",
                          November: "10",
                          December: "11",
                        };
                        return {
                          label: item,
                          value: value[item],
                        };
                      })}
                    />
                  </div>

                  <Button type="submit">Print DTR</Button>
                </form>
              </div>
              <Table
                fields={schema.fields}
                objects={objects}
                collection={this.getCollectionName()}
                selectable
                collapsable={
                  user?.username === "mweeb@company.com" ? true : false
                }
                excludeFields={Object.keys(schema.fields).reduce(
                  (acc, key) => {
                    const options = schema.fields[key];
                    if (options.read === false) {
                      acc.push(key);
                    }
                    switch (options._type || options.type) {
                      case "Relation":
                      case "Object":
                      case "File":
                        acc.push(key);
                        break;
                      default:
                    }
                    return acc;
                  },
                  ["id", "acl", "password"]
                )}
                selected={selected}
                onSelect={this.onSelect.bind(this)}
                onSelectAll={this.onSelectAll.bind(this)}
                progress={progress}
                onClickItem={this.onClickItem.bind(this)}
                onClickView={this.onClickView.bind(this)}
                className="mt-3"
              />
            </div>
          </InfiniteScroll>
        </div>
        <div className="position-fixed bottom-0 end-0 m-4">
          <Button
            className="btn text-white shadow-sm bg-primary"
            onClick={this.onClickAdd.bind(this)}
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "25px",
              backgroundColor: "#006BAC",
            }}
          >
            <i className="bi bi-plus-lg" />
          </Button>
        </div>
      </>
    );
  }
}

export default withRouter(DailyTimerecord);
