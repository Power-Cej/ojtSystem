import { Button } from "nq-component";
import {
  countObjectUseCase,
  deleteObjectUseCase,
  findObjectUseCase,
  upsertUseCase,
} from "../../usecases/object";
import {
  addSchemaUseCase,
  deleteSchemaUseCase,
  updateSchemaUseCase,
} from "../../usecases/schema/usecases";
import withRouter from "../../withRouter";
import InputFactory from "../../components/InputFactory";
import BaseListPage from "../../base/BaseListPage";
import { exportCSVUseCase } from "../../usecases/csv/usecases";
import PrintCOC from "./PrintCOC/printCOC";
import { createRef } from "react";
import DashboardMainPresenter from "./DashboardMainPresenter";
import NavBar from "../../components/navbar";
import { Popover, Tooltip } from "antd";

class DashboardMain extends BaseListPage {
  constructor(props) {
    super(props);
    this.state = {
      object: {},
    };
    this.presenter = new DashboardMainPresenter(
      this,
      findObjectUseCase(),
      countObjectUseCase(),
      deleteObjectUseCase(),
      upsertUseCase(),
      exportCSVUseCase(),
      addSchemaUseCase(),
      updateSchemaUseCase(),
      deleteSchemaUseCase()
    );
    this.contractPDF = createRef();
  }

  getCollectionName() {
    return "daily_time_record";
  }

  timeToSeconds(time) {
    const [h, m, s] = time.split(":").map(Number);
    return h * 3600 + m * 60 + s;
  }

  secondsToTime(totalSeconds, user) {
    const additionH = user === "gestanestle" ? 106 : user === "jalen" ? 84 : 0;
    const h = Math.floor(totalSeconds / 3600) + additionH;
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    // console.log("TOTAL : ", h);
    // console.log("MIN : ", m);
    // console.log("SEC : ", s);
    return `${String(h).padStart(2, "0")}:${String(m).padStart(
      2,
      "0"
    )}:${String(s).padStart(2, "0")}`;
  }

  groupByUser(record) {
    return record.reduce((acc, record) => {
      if (!acc[record.user]) {
        acc[record.user] = { totalSeconds: 0 };
      }

      // Check if timeIn or timeOut is "--:--", if so, skip this record
      if (record.timeIn === "--:--" || record.timeOut === "--:--") {
        return acc;
      }

      // Convert time values to seconds
      let inSeconds = this.timeToSeconds(record.timeIn);
      let outSeconds = this.timeToSeconds(record.timeOut);

      // Define threshold times in seconds
      const minTimeIn = this.timeToSeconds("09:00:00");
      const maxTimeOut = this.timeToSeconds("17:00:00");

      // Adjust timeIn: If it's before 09:00:00, set it to 09:00:00
      if (inSeconds < minTimeIn) {
        inSeconds = minTimeIn;
      }

      // Adjust timeOut: If it's after 17:00:00, set it to 17:00:00
      if (outSeconds > maxTimeOut) {
        outSeconds = maxTimeOut;
      }

      acc[record.user].totalSeconds += outSeconds - inSeconds;
      return acc;
    }, {});
  }
  setObjects(objects) {
    this.setState({ objects });
  }
  getUser() {
    return this.getCurrentUser();
  }

  render() {
    const { objects } = this.state;
    const schema = this.getSchema(this.getCollectionName());
    const minTimeDuration = "286";
    return (
      <>
        <NavBar />
        <div className="overflow-auto">
          <div className="p-3 p-lg-4">
            <h1 className="fw-bold mt-3 text-capitalize">{schema.label}</h1>

            <div className="mt-2 d-none">
              <div ref={this.contractPDF} id="contractPDF">
                <PrintCOC object={this.state.object} />
              </div>
            </div>
            <div className="d-flex mt-3">
              {Object.keys(schema.filters || {}).map((field) => {
                let { type, ...options } = schema.filters[field];
                return (
                  <InputFactory
                    key={field}
                    className="ms-1"
                    type={type}
                    field={field}
                    where={{}}
                    onChange={this.onChangeFilter.bind(this, type)}
                    {...options}
                  />
                );
              })}
            </div>
            <div className="row d-flex">
              {/* {this.TimeLogs()} */}
              {Array.isArray(objects) && objects.length > 0 ? (
                Object.entries(this.groupByUser(objects)).map(
                  ([user, times]) => {
                    const isComplete =
                      this.secondsToTime(times.totalSeconds, user) >=
                      minTimeDuration;
                    return (
                      <div className="col-lg-4 p-2" key={user}>
                        <div
                          className="d-grid text-center p-2 border rounded shadow-sm"
                          style={{
                            backgroundColor: isComplete
                              ? "rgb(0, 107, 172)"
                              : "white",
                            color: isComplete ? "white" : "black",
                          }}
                        >
                          <Popover
                            trigger="hover"
                            placement="bottomRight"
                            content={
                              <div className="d-grid gap-2">
                                <Button
                                  type="primary"
                                  size="small"
                                  style={{
                                    backgroundColor: "green",
                                    borderColor: "green",
                                  }}
                                  disabled={!isComplete}
                                  onClick={() =>
                                    this.presenter.openModal(user, times)
                                  }
                                >
                                  Print COC
                                </Button>
                                <Button
                                  type="primary"
                                  size="small"
                                  style={{
                                    backgroundColor: "red",
                                    borderColor: "red",
                                  }}
                                  onClick={() => {
                                    this.navigateTo(
                                      `/collection/daily_time_record/${user}`
                                    );
                                  }}
                                >
                                  DTR
                                </Button>
                                {this.getCurrentRoles().some((data) =>
                                  data.id.includes("ADMIN")
                                ) && (
                                  <Button
                                    type="primary"
                                    size="small"
                                    style={{
                                      backgroundColor: "gray",
                                      borderColor: "gray",
                                    }}
                                    onClick={() => {
                                      this.navigateTo(
                                        `/collection/biometric_logs/${user}`
                                      );
                                    }}
                                  >
                                    Biometric Logs
                                  </Button>
                                )}
                              </div>
                            }
                          >
                            <div
                              className="p-2 ms-auto"
                              style={{ cursor: "pointer" }}
                            >
                              <i className="bi bi-three-dots-vertical" />
                            </div>
                          </Popover>
                          <h2 style={{ fontSize: "clamp(1.2rem,2vw, 1.5rem)" }}>
                            <b>{user.toUpperCase()}</b>
                          </h2>
                          <h5 style={{ fontSize: "clamp(1rem, 2vw, 1.3rem)" }}>
                            Duration:{" "}
                            {this.secondsToTime(times.totalSeconds, user)}
                          </h5>
                        </div>
                      </div>
                    );
                  }
                )
              ) : (
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ height: "20rem" }}
                >
                  <progress />
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(DashboardMain);
