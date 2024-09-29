import { items } from "src/assets/data/navigation";
import {
  Menu,
  NavBrand,
  Navigation,
  Profile,
  Search,
  ToggleMenu,
} from "src/components/layouts/navigation";

/* eslint-disable jsx-a11y/anchor-is-valid */
const Home = () => {
  return (
    <div>
      <Navigation>
        {/* Brand Section */}
        <NavBrand name="NCDMB Multipurpose Cooperative" />
        {/* End Brand Section */}
        {/* Toggle Button */}
        <ToggleMenu />
        {/* End Toggle Button */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <Menu items={items} />
          {/* Search Input Section */}
          <Search />
          {/* End Search Section */}
        </div>
        {/* Profile Section */}
        <Profile name="Bobby Ekaro" />
        {/* End Profile Section */}
      </Navigation>
    </div>
  );
};

export default Home;
