import { FC, useEffect, useState } from "react";

import { Link, useLocation } from "react-router-dom";

import { KTIcon } from "../../../_metronic/helpers";
// import { ToolbarWrapper } from '../../../_metronic/layout/components/toolbar'
import { Content } from "../../../_metronic/layout/components/content";
import { getRestaurantByIdFunction } from "../../services/Restaurant/Restaurant";
// import { Campaigns } from './components/Campaigns';
import { Product } from "./components/Overview";
// import ProductTableComponent from './components/ProductList';
import ProductTablePage from "./components/Table";
import { useAuth } from "../../../app/modules/auth";
// import AddBranchPage from "./components/Branch";
// import BranchTablePage from "./components/BranchTable";

interface types {
  data: any;
}

const ProfileHeader: FC<types> = ({ data }) => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<any>(1);
  const [RestaurantData, setRestaurantData] = useState([]);
  const { logout } = useAuth();

  useEffect(() => {
    const currentPageUrl = window.location.href;
    const parts = currentPageUrl.split("/"); // Split the URL by '/'
    const id = parts[parts.length - 1];
    restaurantData(id);
    setActiveTab(1);
  }, []);

  const restaurantData = async (id: any) => {
    const res: any = await getRestaurantByIdFunction(id);

    setRestaurantData(res?.data?.data);
  };

  console.log("dataaaaaaaaaaaaaaaaa data", data);

  return (
    <>
      {/* <ToolbarWrapper /> */}
      <Content>
        <div className="card mb-5 mb-xl-5">
          <div className="card-body pt-9 pb-0">
            <div className="d-flex flex-wrap flex-sm-nowrap mb-3">
              <div className="me-7 mb-4">
                <div className="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative">
                  <img
                    src={`https://daeemadminapi.testenvapp.com/images/restaurant/${data?.background_image}`}
                    alt="Image"
                  />
                  <div className="position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px"></div>
                </div>
              </div>

              <div className="flex-grow-1">
                <div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
                  <div className="d-flex flex-column">
                    <div className="d-flex align-items-center mb-2">
                      <a
                        href="javascript:void(0)"
                        className="text-gray-800 text-hover-primary fs-2 fw-bolder me-1"
                      >
                        {data?.nameEn}
                      </a>
                      <a href="javascript:void(0)">
                        <KTIcon
                          iconName="verify"
                          className="fs-1 text-primary"
                          color=""
                        />
                      </a>
                    </div>
                    <a
                      href="javascript:void(0)"
                      className="text-gray-800 text-hover-primary fs-2 fw-bolder me-1"
                      dir="rtl"
                    >
                      {data?.nameAr}
                    </a>

                    <div className="d-flex flex-wrap fw-bold fs-6 mb-4 pe-2">
                      <a
                        href="javascript:void(0)"
                        className="d-flex align-items-center text-gray-500 text-hover-primary me-5 mb-2"
                      >
                        <KTIcon
                          iconName="profile-circle"
                          className="fs-4 me-1"
                          color=""
                        />
                        {data?.business_category_nameEn}
                      </a>
                      {/* <a
                        href='javascript:void(0)'
                        className='d-flex align-items-center text-gray-500 text-hover-primary me-5 mb-2'
                      >
                        <KTIcon iconName='geolocation' className='fs-4 me-1' />
                        SF, Bay Area
                      </a> */}
                      <a
                        href="javascript:void(0)"
                        className="d-flex align-items-center text-gray-500 text-hover-primary me-5 mb-2"
                      >
                        <KTIcon
                          iconName="geolocation"
                          className="fs-4 me-1"
                          color=""
                        />
                        {data?.phone}
                      </a>
                      <a
                        href="javascript:void(0)"
                        className="d-flex align-items-center text-gray-500 text-hover-primary mb-2"
                      >
                        <KTIcon iconName="sms" className="fs-4 me-1" color="" />
                        {data?.email}
                      </a>
                    </div>
                  </div>

                  <div className="d-flex my-4">
                    <a
                      href="javascript:void(0)"
                      className="btn btn-sm btnRed me-3"
                      data-bs-toggle="modal"
                      data-bs-target="#kt_modal_offer_a_deal"
                      onClick={logout}
                    >
                      Logout
                    </a>
                    {/* <div className='me-0'>
                       <button
                        className='btn btn-sm btn-icon btn-bg-light btn-active-color-primary'
                        data-kt-menu-trigger='click'
                        data-kt-menu-placement='bottom-end'
                        data-kt-menu-flip='top-end'
                      >
                        <i className='bi bi-three-dots fs-3'></i>
                      </button>
                      <Dropdown1 />
                    </div> */}
                  </div>
                </div>

                <div className="d-flex flex-wrap flex-stack">
                  <div className="d-flex flex-column flex-grow-1 pe-8">
                    <div className="d-flex flex-wrap">
                      <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                        <div className="d-flex align-items-center">
                          <KTIcon
                            iconName="arrow-up"
                            className="fs-3 text-success me-2"
                            color=""
                          />
                          <div className="fs-2 fw-bolder">4500</div>
                        </div>

                        <div className="fw-bold fs-6 text-gray-500">
                          Earnings In SAR
                        </div>
                      </div>

                      <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                        <div className="d-flex align-items-center">
                          <KTIcon
                            iconName="arrow-up"
                            className="fs-3 text-success me-2"
                            color=""
                          />
                          <div className="fs-2 fw-bolder">90</div>
                        </div>

                        <div className="fw-bold fs-6 text-gray-500">Order</div>
                      </div>

                      <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                        <div className="d-flex align-items-center">
                          <KTIcon
                            iconName="arrow-up"
                            className="fs-3 text-success me-2"
                            color=""
                          />
                          <div className="fs-2 fw-bolder">60%</div>
                        </div>

                        <div className="fw-bold fs-6 text-gray-500">
                          Success Rate
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex align-items-center w-200px w-sm-300px flex-column mt-3">
                    <div className="d-flex justify-content-between w-100 mt-auto mb-2">
                      <span className="fw-bold fs-6 text-gray-500">
                        Order Compleation Rate
                      </span>
                      <span className="fw-bolder fs-6">50%</span>
                    </div>
                    <div className="h-5px mx-3 w-100 bg-light mb-3">
                      <div
                        className="bg-success rounded h-5px"
                        role="progressbar"
                        style={{ width: "50%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex overflow-auto h-55px">
              <ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap">
                {/* <li className='nav-item'>
                  <a
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (activeTab === 0 && 'active')
                    }
                    href='javascript:void(0)'
                    onClick={()=>setActiveTab(0)}
                  >
                    Variant
                  </a>
                </li> */}
                <li className="nav-item">
                  <a
                    href="javascript:void(0)"
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (activeTab === 1 && "active")
                    }
                    onClick={() => setActiveTab(1)}
                  >
                    Product List
                  </a>
                </li>

                <li className="nav-item">
                  <a
                    href="javascript:void(0)"
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (activeTab === 2 && "active")
                    }
                    onClick={() => setActiveTab(2)}
                  >
                    Product
                  </a>
                </li>

                {/* <li className='nav-item'>
                  <a
                   className={
                    `nav-link text-active-primary me-6 ` +
                    (activeTab === 3 && 'active')
                  }
                    onClick={()=>setActiveTab(3)}
                    href="javascript:void(0)"
                  >
                    Banner
                  </a>
                </li> */}

                <li className="nav-item">
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname ===
                        "/crafted/pages/profile/documents" && "active")
                    }
                    to="#"
                  ></Link>
                </li>
                {/* <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname === '/crafted/pages/profile/connections' && 'active')
                    }
                    to='/crafted/pages/profile/connections'
                  >
                    Connections
                  </Link>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
        {/* { activeTab === 0 && <Campaigns data={data}/>} */}
        {activeTab === 2 && (
          <Product data={{ data }} setActiveTab={setActiveTab} />
        )}
        {activeTab === 1 && <ProductTablePage data={RestaurantData} />}
      </Content>
    </>
  );
};

export { ProfileHeader };
