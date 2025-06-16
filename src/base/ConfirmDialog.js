import classNames from "../classNames";

function noop() {}

const defaultProps = {
  positiveButton: "YES",
  negativeButton: "CANCEL",
  onPositiveClick: noop,
  onNegativeClick: noop,
  type: "danger",
  icon: "bi bi-exclamation-circle",
};

function ConfirmDialog({ title, message, icon, type }) {
  const isImage = icon.includes("/");
  return (
    <div className="text-end">
      <div className="text-center text-primary ">
        {isImage ? (
          <img
            className={classNames("mt-2")}
            src={icon}
            width={80}
            height={80}
            alt="icon"
          />
        ) : (
          <i
            className={classNames(icon, "text-" + type)}
            style={{ fontSize: "5rem" }}
          />
        )}

        <h4 className="fw-bold pt-3">{title}</h4>
        <p className="m-0" style={{ fontSize: "clamp(14px, 2vw, 1rem)" }}>
          {message}
        </p>
      </div>
    </div>
  );
}

ConfirmDialog.defaultProps = defaultProps;
export default ConfirmDialog;
