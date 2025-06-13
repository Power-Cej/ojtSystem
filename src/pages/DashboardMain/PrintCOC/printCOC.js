function dateFormatter(date) {
  const newDate = new Date(date);
  if (newDate === "Invalid Date") {
    return "";
  }

  return newDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function PrintCOC({ object }) {
  const PRINT_STYLES = {
    container: {
      width: "11.69in", // landscape width
      height: "8.27in",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      marginLeft: "-10px",
      marginTop: "-10px",
      border: "1px solid",
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      fontSize: "18px",
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: "2px",
      textAlign: "center",
    },
    image: {
      maxWidth: "100%",
      maxHeight: "100%",
      objectFit: "contain",
    },
  };

  const contentText = (style, content) => {
    return (
      <div
        style={{
          width: "40rem",
          position: "absolute",
          textAlign: "center",
          top: "18rem",
          overflow: "hidden",
          // whiteSpace: "nowrap",
          // border: "1px solid",
          ...style,
        }}
      >
        {content}
      </div>
    );
  };

  // data
  const awardDate = dateFormatter(new Date());

  const name = [object?.firstName, object?.middleName, object.lastName];
  const userFullName = name.filter(Boolean).join(" ");

  const timeRender = object?.timeRendered;

  const date = [dateFormatter(object?.dateFrom), dateFormatter(object?.dateTo)];
  const OjtDuration = date.filter(Boolean).join(" - ");

  return (
    <div style={PRINT_STYLES.container}>
      <img
        src="/printCOC.png"
        style={PRINT_STYLES.image}
        alt="Leave Template"
      />
      {contentText(
        {},
        <h1
          style={{
            textAlign: "center",
            // textDecoration: "underline",
            borderBottom: "3px solid",
            borderColor: "grey",
          }}
        >
          {userFullName?.toUpperCase()}
        </h1>
      )}
      {contentText(
        { top: "23.4rem", width: "50rem" },
        <label
          style={{
            fontStyle: "italic",
            fontSize: "20px",
            textAlign: "left",
            color: "#333",
          }}
        >
          &nbsp;&nbsp;&nbsp;&nbsp;has completed the {timeRender} hours
          On-The-Job Training at Mweeb <br />
          Information Technology Inc. from {OjtDuration}
        </label>
      )}
      {contentText(
        { top: "28.2rem", width: "50rem" },
        <label
          style={{
            fontStyle: "italic",
            fontSize: "20px",
            textAlign: "center",
            color: "#333",
          }}
        >
          We found this sincere, hardworking, dedicated, and result oriented.
          <br />
          He workded well as part of the team during his venture. We thnak this
          <br />
          opportunity to thank him and wish him all the best for his future.
        </label>
      )}
      {contentText(
        {
          top: "35rem",
          width: "50rem",
          textAlign: "center",
        },
        <label style={{ fontSize: "20px", color: "#333" }}>
          Awarded this {`${awardDate}`} at Mandaluyong City, Philippines
        </label>
      )}
    </div>
  );
}
