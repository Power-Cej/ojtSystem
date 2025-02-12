import React from "react";
import Modal from "./";
import classNames from "../../classNames";

function noop() {}

const defaultProps = {
  positiveButton: "YES",
  negativeButton: "CANCEL",
  onPositiveClick: noop,
  onNegativeClick: noop,
  footer: true,
  size: "md",
};

function ModalContent({
  children,
  isOpen,
  onClosed,
  size,
  positiveButton,
  negativeButton,
  onPositiveClick,
  onNegativeClick,
  footer,
  className,
  closable,
}) {
  const [open, setOpen] = React.useState(isOpen);
  React.useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);
  const style = {
    minWidth: "6em",
  };
  return (
    <Modal isOpen={open} onClosed={onClosed} size={size} closable={closable}>
      <Modal.Body className={classNames("p-0", className)}>
        {children}
      </Modal.Body>
      {footer && (
        <div className="modal-footer border-0 p-4">
          <button
            style={style}
            onClick={() => {
              setOpen(false);
              onPositiveClick();
            }}
            type="submit"
            className="btn btn-primary fs-sm"
          >
            {positiveButton}
          </button>
          {negativeButton && (
            <button
              style={style}
              onClick={() => {
                setOpen(false);
                onNegativeClick();
              }}
              type="button"
              className="btn btn-light fs-sm ms-2"
            >
              {negativeButton}
            </button>
          )}
        </div>
      )}
    </Modal>
  );
}

ModalContent.defaultProps = defaultProps;
export default ModalContent;
