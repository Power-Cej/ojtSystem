import classNames from "../../classNames";
import React from "react";

const defaultProps = {
  navigateIcon: "bi bi-list",
};

function NavigationBar({
  className,
  onClickNavigate,
  navigateIcon,
  logo,
  title,
  action,
}) {
  const classes = classNames(className, "navbar navbar-expand-lg navbar-light");
  return (
    <nav className={classes} style={{ backgroundColor: "white" }}>
      <div className="container-fluid">
        <button
          onClick={onClickNavigate}
          type="button"
          className="btn btn-sm btn-link ps-0 text-white"
          style={{ fontSize: "clamp(1.5rem, 2vw, 1.8rem)" }}
        >
          <i className={navigateIcon}></i>
        </button>
        <div
          className="d-flex align-items-center bg-white rounded-circle p-1"
          // style={{ width: "clamp(10px, 1vw, 5%)" }}
        >
          {logo && (
            <img className="w-auto" src={logo} height="30vh" alt="title-logo" />
          )}
          {title && <h6 className="fw-bold m-0 ms-2 text-white">{title}</h6>}
        </div>
        {(action && action()) || <div />}
      </div>
    </nav>
  );
}

NavigationBar.defaultProps = defaultProps;
export default NavigationBar;
