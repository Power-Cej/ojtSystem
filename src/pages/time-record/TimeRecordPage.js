import { NavBar, Table } from "nq-component";
import { Progress } from "nq-component";
import { Button } from "nq-component";
import {
  countObjectUseCase,
  deleteObjectUseCase,
  findObjectUseCase,
  getObjectUseCase,
  upsertUseCase,
} from "../../usecases/object";
import {
  addSchemaUseCase,
  deleteSchemaUseCase,
  updateSchemaUseCase,
} from "../../usecases/schema/usecases";
import withRouter from "../../withRouter";
import React from "react";
import BaseFormPage from "../../base/BaseFormPage";
import InputFactory from "../../components/InputFactory";
import RoleFormPresenter from "../role-form/RoleFormPresenter";
import BaseListPage from "../../base/BaseListPage";
import { exportCSVUseCase } from "../../usecases/csv/usecases";

import { Schema } from "nq";
import CollectionListPresenter from "./CollectionListPresenter";

class TimeRecordPage extends BaseListPage {
  constructor(props) {
    super(props);
    this.state = {
      object: {},
    };
    this.presenter = new CollectionListPresenter(
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

  render() {
    const { objects } = this.state;
    const schema = this.getSchema(this.getCollectionName());
    // console.log("OBJECTS: ", this.groupByUser(this.state.objectss));

    return (
      <>
        <NavBar />
        <div className="overflow-auto">
          <div className="p-3 p-lg-4">
            <h1 className="fw-bold mt-3 text-capitalize">{schema.label}</h1>
            <div className="row d-flex">
              {/* {this.TimeLogs()} */}
              {Array.isArray(objects) && objects.length > 0 ? (
                Object.entries(this.groupByUser(objects)).map(
                  ([user, times]) => (
                    <div className="col-lg-4 p-2" key={user}>
                      <div className="d-grid text-center p-2 border rounded bg-white shadow-sm">
                        <h2>
                          <b>{user.toUpperCase()}</b>
                        </h2>

                        <h5>
                          Duration:{" "}
                          {this.secondsToTime(times.totalSeconds, user)}
                        </h5>
                      </div>
                    </div>
                  )
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

export default withRouter(TimeRecordPage);
