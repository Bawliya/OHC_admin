import clsx from "clsx";
import { KTIcon, toAbsoluteUrl } from "../../../helpers";
import { ThemeModeSwitcher } from "../../../partials"; // Search, HeaderUserMenu, HeaderNotificationsMenu
import { useLayout } from "../../core";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const itemClass = "ms-1 ms-md-4";
const userAvatarClass = "symbol-35px";
const btnIconClass = "fs-2";

const Navbar = () => {
  const { config } = useLayout();
  // const history = useHistory();
  const logout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1a6896",
      cancelButtonColor: "#ee1d23",
      color: "#1a6896",
      background: "#ffffff",
      confirmButtonText: "Yes, logout",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        redirectToAuthPage();
      }
    });
  };

  const redirectToAuthPage = () => {
    // Replace '/auth' with the route to your authentication page
    window.location.href = "/auth";
  };
  return (
    <div className="app-navbar flex-shrink-0">
      <div className={clsx("app-navbar-item align-items-stretch", itemClass)}>
        {/* <Search /> */}
      </div>

      {/* <div className={clsx('app-navbar-item', itemClass)}>
        <div id='kt_activities_toggle' className={btnClass}>
          <KTIcon iconName='chart-simple' className={btnIconClass}  color='' />
        </div>
      </div> */}

      {/* <div className={clsx('app-navbar-item', itemClass)}>
        <div
          data-kt-menu-trigger="{default: 'click'}"
          data-kt-menu-attach='parent'
          data-kt-menu-placement='bottom-end'
        >
          <KTIcon iconName='map' className={btnIconClass} color='red' />
        </div>
        <Link to="/zone-management/view" className='mb-2 m-1 text-danger'><b>Zone Setup</b></Link>
      </div>

      <div className={clsx('app-navbar-item', itemClass)}>
        <div
          data-kt-menu-trigger="{default: 'click'}"
          data-kt-menu-attach='parent'
          data-kt-menu-placement='bottom-end'
        >
          <KTIcon iconName='delivery-2' className={btnIconClass} color='#1b84ff' />
        </div>
        <Link to="/dispatch-management" className='mb-2 m-1 text-parimery'><b>Dispatch Management</b></Link>
      </div>
      <div className={clsx('app-navbar-item', itemClass)}>
        <ThemeModeSwitcher toggleBtnClass={clsx('btn-active-light-primary btn-custom')} />
      </div> */}

      <div className={clsx("app-navbar-item", itemClass)}>
        <div
          className={clsx("cursor-pointer symbol", userAvatarClass)}
          data-kt-menu-trigger="{default: 'click'}"
          data-kt-menu-attach="parent"
          data-kt-menu-placement="bottom-end"
          onClick={logout}
        >
          <img src={toAbsoluteUrl("../media/logos/usericon.png")} alt="" />
        </div>
        {/* <HeaderUserMenu /> */}
      </div>

      {config.app?.header?.default?.menu?.display && (
        <div
          className="app-navbar-item d-lg-none ms-2 me-n3"
          title="Show header menu"
        >
          <div
            className="btn btn-icon btn-active-color-primary w-35px h-35px"
            id="kt_app_header_menu_toggle"
          >
            <KTIcon
              iconName="text-align-left"
              className={btnIconClass}
              color=""
            />
          </div>
        </div>
      )}
    </div>
  );
};

export { Navbar };
