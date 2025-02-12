import React from "react";
import { Transition } from "react-transition-group";
import classNames from "../../classNames";

const defaultProps = {
  as: "div",
  baseClass: "fade",
  timeout: 150,
  appear: true,
  baseClassActive: "show",
};

function Fade({
  as: Comp,
  className,
  baseClass,
  baseClassActive,
  children,
  style,
  onClick,
  ...props
}) {
  return (
    <Transition {...props}>
      {(status) => {
        const isActive = status === "entered";
        const classes = classNames(
          className,
          baseClass,
          isActive && baseClassActive
        );
        return (
          <Comp className={classes} style={style} onClick={onClick}>
            {children}
          </Comp>
        );
      }}
    </Transition>
  );
}

Fade.defaultProps = defaultProps;
export default Fade;
