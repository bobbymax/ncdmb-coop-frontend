import React from "react";
import { Link } from "react-router-dom";
import Icon from "../forms/Icon";

interface HyperLinkProps {
  path: string;
  icon?: string;
  text: string;
  category: "parent" | "child";
  isDropdown: boolean;
  position?: number;
  type: "application" | "module" | "page";
  currentPage?: string;
  groups?: [];
  action?: (value?: string | number) => void;
}

const HyperLink = (data: HyperLinkProps) => {
  const getChildOrParentLinkClasses = () => {
    let classes;

    switch (data.category) {
      case "parent":
        classes = `nav-link ${data.currentPage === data.path ? "active" : ""} ${
          data.isDropdown ? "dropdown-toggle" : ""
        }`;
        break;

      default:
        classes = "dropdown-item";
        break;
    }

    return classes;
  };
  return (
    <Link
      to={`${data.isDropdown ? "#" : data.path}`}
      className={getChildOrParentLinkClasses()}
      aria-current="page"
    >
      <div className="flex center-align gap-md">
        {data.icon !== "" && <Icon icon={data.icon} />}
        <span>{data.text}</span>
        {data.isDropdown && <Icon icon="caret-forward-circle" />}
      </div>
    </Link>
  );
};

export default HyperLink;
