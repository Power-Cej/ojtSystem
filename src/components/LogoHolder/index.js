import React from "react";
import classNames from "../../classNames";

const defaultProps = {
  width: "80px",
  height: "80px",
  className: "bg-dark",
  textClassName: "text-white",
  name: "",
  alt: "logo",
};

function LogoHolder({
  className,
  textClassName,
  name,
  logo,
  width,
  height,
  alt,
}) {
  const char = name.charAt(0).toUpperCase();
  const style = {
    width: width,
    height: height,
  };
  if (logo === undefined) {
    return (
      <div className="d-flex justify-content-center">
        <div
          className={classNames(
            className,
            "rounded-circle d-flex align-items-center justify-content-center"
          )}
          style={style}
        >
          <h1 className={classNames(textClassName, "fw-bold m-0 align-middle")}>
            {char}
          </h1>
        </div>
      </div>
    );
  }
  return (
    <div className="d-inline-block" style={style}>
      <img
        className="w-100 h-100 rounded-circle img-thumbnail p-0"
        src={logo}
        style={{ objectfit: "cover" }}
        alt={alt}
      />
    </div>
  );
}

LogoHolder.defaultProps = defaultProps;
export default LogoHolder;
