// import { Dropdown1 } from '../../../_metronic/partials'
import "../../../../public/custom.css";

import { FC, useState } from "react";

// import { useLocation } from 'react-router'
// import { Link } from 'react-router-dom'
import { KTIcon } from "../../../_metronic/helpers";
import { Content } from "../../../_metronic/layout/components/content";
import { ToolbarWrapper } from "../../../_metronic/layout/components/toolbar";
import { Overview } from "./components/Overview";
import { Settings } from "./components/settings/Settings";
import DeliveryOrderComponent from "./components/DeliveryOrder";
import { DeliveryBoyWalletComponent } from "./components/DeliveryWallet";
import verifyDeliveryBoyFunction from "../../services/deliveryboy/DeliveryBoy";
import { ToastContainer, toast } from "react-toastify";

export const BASE_URL: string = `https://daeemapi.testenvapp.com/images/`;

interface MyComponentProps {
  setIsTable: React.Dispatch<React.SetStateAction<any>>;
  DeliveryBoyRecord: any;
  // Other props if any
}

const AccountHeader: FC<MyComponentProps> = ({
  setIsTable,
  DeliveryBoyRecord,
}) => {
  // const location = useLocation()
  const [activeTab, setActiveTab] = useState<any>(1);
  const [date, setDate] = useState(DeliveryBoyRecord?.drivingLicenceExpiryDate);
  const [verify, setVerify] = useState(
    DeliveryBoyRecord?.admin_verify || false
  );
  const [loading, setLoading] = useState(false);
  const notifySuccess = () => toast.success("Delivery Boy added successfully");
  const notifyError = (errorMessage: any) => toast.error(errorMessage);
  console.log(DeliveryBoyRecord);

  const handleClick = async () => {
    // Check if the date is not null
    setLoading(true);
    if (!date) {
      notifyError("Date cannot be null");
      setLoading(false);
      return;
    }
    try {
      const res = await verifyDeliveryBoyFunction(
        DeliveryBoyRecord._id,
        verify,
        date
      );
      if (res?.data?.status == true) {
        notifySuccess();
        setVerify(!verify);
        setLoading(false);
      } else {
        notifyError(res?.data?.message || "An error occurred");
        setLoading(false);
      }
    } catch (error) {
      // Handle any errors that occur during the function call
      notifyError("An error occurred while verifying the delivery boy");
      setLoading(false);
    }
  };

  return (
    <>
      <ToolbarWrapper />
      <Content>
        <div className="card mb-5 mb-xl-5">
          <div className="card-body pt-9 pb-0">
            <div className="d-flex flex-wrap flex-sm-nowrap mb-3">
              <div className="me-7 mb-4">
                <div className="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative">
                  <img
                    src={
                      BASE_URL +
                      (DeliveryBoyRecord?.driver_photo ||
                        "../../../../public/media/logos/2.png")
                    }
                    onError={(
                      e: React.SyntheticEvent<HTMLImageElement, Event>
                    ) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/../media/logos/2.png";
                    }}
                    alt="Metronic"
                  />

                  {/* <div className='position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px'></div> */}
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
                        {DeliveryBoyRecord.name}
                      </a>
                      <a href="javascript:void(0)">
                        <KTIcon
                          iconName="verify"
                          className="fs-1 text-primary"
                        />
                      </a>
                    </div>

                    <div className="d-flex flex-wrap fw-bold fs-6 mb-4 pe-2">
                      <a
                        href="javascript:void(0)"
                        className="d-flex align-items-center text-gray-500 text-hover-primary me-5 mb-2"
                      >
                        <KTIcon
                          iconName="profile-circle"
                          className="fs-4 me-1"
                        />
                        +{DeliveryBoyRecord.country_code}
                      </a>
                      <a
                        href="javascript:void(0)"
                        className="d-flex align-items-center text-gray-500 text-hover-primary me-5 mb-2"
                      >
                        <KTIcon iconName="geolocation" className="fs-4 me-1" />
                        {DeliveryBoyRecord.phone}
                      </a>
                      <a
                        href="javascript:void(0)"
                        className="d-flex align-items-center text-gray-500 text-hover-primary mb-2"
                      >
                        <KTIcon iconName="sms" className="fs-4 me-1" />
                        {DeliveryBoyRecord.email}
                      </a>
                    </div>
                  </div>

                  <div className="d-flex my-4">
                    {/*  <button className='btn btn-sm me-3 btnRed' onClick={handleClick}>
                      {!verify ? 'unverify' : 'verify'}
                    </button> */}

                    <button
                      type="submit"
                      id="kt_sign_in_submit"
                      className="btn btn-sm me-3 btnRed"
                      // style={{backgroundColor:"#f90505", color:"white"}}
                      // disabled={formik.isSubmitting || !formik.isValid}
                    >
                      {!loading && (
                        <span className="indicator-label" onClick={handleClick}>
                          {!verify ? "unverify" : "verify"}
                        </span>
                      )}
                      {loading && (
                        <span
                          className="indicator-progress"
                          style={{ display: "block" }}
                        >
                          Please wait...
                          <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                        </span>
                      )}
                    </button>
                    <div className="me-0">
                      <button
                        className="btn btn-sm  btn-bg-light btn-active-color-primary"
                        data-kt-menu-trigger="click"
                        data-kt-menu-placement="bottom-end"
                        data-kt-menu-flip="top-end"
                        onClick={() => setIsTable(false)}
                      >
                        Go Back
                        {/* <i className='bi bi-three-dots fs-3'></i> */}
                      </button>
                      {/* <Dropdown1 /> */}
                    </div>
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
                            iconName="arrow-down"
                            className="fs-3 text-danger me-2"
                          />
                          <div className="fs-2 fw-bolder">75</div>
                        </div>

                        <div className="fw-bold fs-6 text-gray-500">Order</div>
                      </div>

                      <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                        <div className="d-flex align-items-center">
                          <KTIcon
                            iconName="arrow-up"
                            className="fs-3 text-success me-2"
                          />
                          <div className="fs-2 fw-bolder">60%</div>
                        </div>

                        <div className="fw-bold fs-6 text-gray-500">
                          Complete Order
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex overflow-auto h-55px">
              <ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap">
                <li className="nav-item">
                  <a
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (activeTab === 1 && "active")
                    }
                    onClick={() => setActiveTab(1)}
                    href="javascript:void(0)"
                  >
                    Overview
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (activeTab === 2 && "active")
                    }
                    onClick={() => setActiveTab(2)}
                    href="javascript:void(0)"
                  >
                    Document
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (activeTab === 3 && "active")
                    }
                    onClick={() => setActiveTab(3)}
                    href="javascript:void(0)"
                  >
                    My Orders
                  </a>
                </li>

                <li className="nav-item">
                  <a
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (activeTab === 4 && "active")
                    }
                    onClick={() => setActiveTab(4)}
                    href="javascript:void(0)"
                  >
                    Wallet
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <ToastContainer />
      </Content>
      {activeTab === 1 && <Overview data={DeliveryBoyRecord} />}
      {activeTab === 2 && (
        <Settings data={DeliveryBoyRecord} date={date} setDate={setDate} />
      )}
      {activeTab === 3 && <DeliveryOrderComponent id={DeliveryBoyRecord} />}
      {activeTab === 4 && (
        <DeliveryBoyWalletComponent
          data={DeliveryBoyRecord}
          setActiveTab={setActiveTab}
        />
      )}
    </>
  );
};

export default AccountHeader;
