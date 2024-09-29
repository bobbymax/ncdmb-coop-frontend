import React from "react";
import "ionicons";
import Icon from "./Icon";

interface ButtonProps {
  label?: string;
  variant?: "success" | "info" | "warning" | "danger";
  type?: "submit" | "button";
  size?: "nm" | "sm" | "md" | "lg";
  icon?: string;
  fontSize?: number;
  isDisabled?: boolean;
  place?: "left" | "right";
  additionalClass?: string;
  fullWidth?: boolean;
  rounded?: boolean;
  handleClick?: (value: string | number | object | []) => void;
}

const Button: React.FC<ButtonProps> = ({
  label,
  variant = "info",
  type = "button",
  size = "nm",
  icon = "",
  fontSize = 13,
  place = "left",
  isDisabled = false,
  additionalClass = "",
  fullWidth = false,
  rounded = false,
  handleClick = undefined,
}) => {
  return (
    <div className="bttn-group flex align gap-md">
      <button
        type={type}
        className={`storm-bttn storm-bttn-${size} storm-bttn-${variant} ${additionalClass} ${
          fullWidth ? " storm-bttn-full " : ""
        } ${rounded ? " rounded " : ""} ${isDisabled ? " is-disabled " : ""}`}
        onClick={handleClick}
        disabled={isDisabled}
      >
        {place === "left" && icon && <Icon fontSize={fontSize} icon={icon} />}
        {label && <span>{label}</span>}
        {place === "right" && icon && <Icon fontSize={fontSize} icon={icon} />}
      </button>
    </div>
  );
};

export default Button;
