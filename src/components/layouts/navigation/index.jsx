import { Link } from "react-router-dom";
import HyperLink from "../../pages/HyperLink";

export const Navigation = ({ children }) => {
  return (
    <nav id="storm-nav" className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">{children}</div>
    </nav>
  );
};

export const NavBrand = ({ logo = null, name = "" }) => {
  return (
    <Link to="/dashboard" className="navbar-brand">
      <div className="flex center-align gap-sm">
        {logo !== null && <img src={logo} alt={name} className="logo" />}
        <span>{name}</span>
      </div>
    </Link>
  );
};

export const ToggleMenu = () => {
  return (
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
  );
};

export const Menu = ({
  items = [],
  toggle = false,
  handleNavToggle = undefined,
  navSelected = "",
}) => {
  return (
    <ul style={{ marginLeft: 16 }} className="navbar-nav me-auto mb-2 mb-lg-0">
      {items.map(
        (item, i) =>
          item?.type === "application" && (
            <li
              key={i}
              className={`nav-item ${item?.has_children && "dropdown"}`}
              onClick={() => handleNavToggle({ current: item.name })}
            >
              <HyperLink
                path={item?.path}
                text={item?.name}
                category="parent"
                type={item?.type}
                isDropdown={item?.has_children}
                icon={item?.icon}
              />

              {/* If this item is a dropdown */}
              {item?.has_children && (
                <ul
                  className={`dropdown-menu ${
                    navSelected === item.name && toggle ? "menu-selected" : ""
                  }`}
                >
                  {item?.children.map((child, j) => (
                    <li key={j}>
                      <HyperLink
                        icon={child?.icon}
                        path={child?.path}
                        text={child.name}
                        category="child"
                        type="module"
                        isDropdown={child?.has_children}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </li>
          )
      )}
    </ul>
  );
};

export const Search = () => (
  <form className="d-flex" role="search">
    <input
      className="form-control me-2"
      type="search"
      placeholder="Search"
      aria-label="Search"
    />
    <button className="btn btn-outline-success" type="submit">
      Search
    </button>
  </form>
);

export const Profile = () => {
  return (
    <ul style={{ marginLeft: 12 }} className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item">
        <Link to="/accounts/member-profile" className="nav-link">
          Profile Settings
        </Link>
      </li>
    </ul>
  );
};
