import { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
// import { toAbsoluteUrl } from '../../../_metronic/helpers'
import auth_image from "../../../../public/media/logos/login.png";
import { Login } from "./components/Login";

const AuthLayout = () => {
  useEffect(() => {
    const root = document.getElementById("root");
    if (root) {
      root.style.height = "100%";
    }
    return () => {
      if (root) {
        root.style.height = "auto";
      }
    };
  }, []);

  return (
    <div
      className="d-flex flex-column justify-content-center min-vh-100 overflow-hidden flex-lg-row flex-column-fluid h-100 "
      style={{ backgroundColor: "#f2f2f2" }}
    >
      {/* begin::Body */}
      <div className="d-flex flex-column flex-lg-row-fluid w-lg-50 p-10 order-2 order-lg-1">
        {/* begin::Form */}
        <div className="d-flex flex-center flex-column flex-lg-row-fluid">
          {/* begin::Wrapper */}

          <div
            className="w-lg-450px rounded-2  p-10"
            style={{
              backgroundColor: "#ffffff",
              // border: "1px solid #ccc",
            }}
          >
            <Outlet />
          </div>
          {/* end::Wrapper */}
        </div>
        {/* end::Form */}

        {/* begin::Footer */}

        {/* end::Footer */}
      </div>
      {/* end::Body */}

      {/* begin::Aside */}
      <div
        className="  d-lg-flex d-none flex-lg-row-fluid  bgi-size-cover bgi-position-center order-1 order-lg-2"
        // style={{backgroundImage: `url(${toAbsoluteUrl('media/misc/auth-bg.png')})`}}
      >
        {/* begin::Content */}
        <div className="w-100">
          {/* begin::Logo */}
          {/* <Link to="/" className="mb-12"></Link> */}
          {/* end::Logo */}

          {/* begin::Image */}
          {/* <img
            className='mx-auto w-275px w-md-50 w-xl-500px mb-10 mb-lg-20'
            src={toAbsoluteUrl('media/logos/applogo.png')}
            alt=''
          /> */}

          <div className="col-12 px-0">
            <img
              className="w-100 object-fit-cover"
              src={auth_image}
              alt="auth_image"
            />
          </div>

          {/* end::Text */}
        </div>
        {/* end::Content */}
      </div>
      {/* end::Aside */}
    </div>
  );
};

export { AuthLayout };
