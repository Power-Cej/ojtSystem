export default function PrintDTR({ objects, object }) {
  const monthOf = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December",
  };

  const PRINT_STYLES = {
    container: {
      //   width: "8.27in",
      width: "100%",
      height: "auto",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      //   border: "1px solid",
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    },
  };

  const tableStyle = (style) => ({
    border: "1px solid",
    textAlign: "center",
    ...style,
  });
  return (
    <div style={PRINT_STYLES.container}>
      <label style={{ fontSize: "25px" }}>Daily Time Record</label>
      <span style={{ marginTop: "2rem" }}>{object?.fullName}</span>
      <div
        style={{
          width: "45%",
          borderTop: "1px solid black",
          textAlign: "center",
        }}
      >
        Name
      </div>
      <div
        style={{
          textAlign: "left",
          width: "50%",
          margin: "1rem",
          fontSize: "12px",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <label style={{ whiteSpace: "nowrap" }}>For the month of </label>
        <div
          style={{
            borderBottom: "1px solid",
            width: "100%",
            textAlign: "center",
          }}
        >
          {monthOf[object?.selectedMonth]}
        </div>
      </div>
      <table
        style={{
          tableLayout: "fixed",
          borderCollapse: "collapse",
          width: "50%",
        }}
      >
        <colgroup>
          <col width="25%" />
        </colgroup>
        <thead>
          <tr>
            <th rowSpan={2} style={tableStyle()}>
              Day
            </th>
            <th colSpan={2} style={tableStyle()}>
              AM
            </th>
            <th colSpan={2} style={tableStyle()}>
              PM
            </th>
          </tr>
          <tr>
            <th style={tableStyle()}>IN</th>
            <th style={tableStyle()}>OUT</th>
            <th style={tableStyle()}>IN</th>
            <th style={tableStyle()}>OUT</th>
          </tr>
        </thead>
        <thead>
          {(() => {
            const selectedMonth = object?.selectedMonth; // Should be 0-based (0 = January)
            const selectedYear =
              object?.selectedYear || new Date().getFullYear();

            if (selectedMonth === undefined || selectedMonth === "")
              return null;

            // Get the number of days in the selected month
            const daysInMonth = new Date(
              selectedYear,
              Number(selectedMonth) + 1,
              0
            ).getDate();

            return Array.from({ length: daysInMonth }, (_, index) => {
              const date = new Date(
                selectedYear,
                Number(selectedMonth),
                index + 1
              );
              const dayNumber = index + 1;
              const dayName = date.toLocaleDateString("en-US", {
                weekday: "short",
              }); // e.g., "Mon"

              const record = objects.find((data) => {
                const recordDate = new Date(data.date);
                return (
                  recordDate.getDate() === date.getDate() &&
                  recordDate.getMonth() === date.getMonth()
                );
              });

              return (
                <tr key={dayNumber}>
                  <td
                    style={tableStyle({ fontSize: "12px", textAlign: "left" })}
                  >{`${dayNumber} - ${dayName}`}</td>
                  <td style={tableStyle({ fontSize: "12px" })}>
                    {record?.timeIn}
                  </td>
                  <td style={tableStyle({ fontSize: "12px" })}></td>
                  <td style={tableStyle({ fontSize: "12px" })}></td>
                  <td style={tableStyle({ fontSize: "12px" })}>
                    {record?.timeOut}
                  </td>
                </tr>
              );
            });
          })()}
        </thead>
      </table>
      <div style={{ width: "50%", fontSize: "12px", margin: "1rem 0" }}>
        <p>
          I certify on my honor that the above is a true and correct report on
          the hours of work performed, record of which was made daily at the
          time of arrival at and departure from office
        </p>
      </div>

      {/* <span style={{ marginTop: "2rem" }}>{object?.fullName}</span> */}
      <div
        style={{
          width: "45%",
          borderTop: "1px solid black",
          textAlign: "center",
        }}
      >
        (Signature)
      </div>
      <p style={{ margin: "1rem 0" }}>
        Verified as to the prescribed office hours
      </p>
      <div
        style={{
          marginTop: "1rem",
          width: "45%",
          borderTop: "1px solid black",
          textAlign: "center",
        }}
      >
        (in-charge)
      </div>
    </div>
  );
}
