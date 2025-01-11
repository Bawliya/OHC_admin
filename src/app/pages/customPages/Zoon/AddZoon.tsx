/* eslint-disable @typescript-eslint/no-unused-vars */
//

// import { useState } from "react";
// import AddBannerComponent from "../../../components/AddBannerComponent";
import { useState } from "react";
// import AddReportCard from "../../../components/AddReportComponent";
import { BackgroundBeams } from "../../../UI/background-beams";
// import ReportOrderTablePage from "../Report/ReportOrderTable";
import AddZoonCard from "../../../components/AddZoon";
// import MapComponent from "../../../components/MapComponent";
import ZoonMapComponent from "../../../components/ZoonMap";
import AddZoonSettingCard from "../../../components/ZoneSetting";
import ZoonTable from "./ZoonTable";
import Modal from "react-bootstrap/Modal";
import ZoneTable from "../../../components/ZoneTable";
// import '/public/custom.css';

const ZoonPage = () => {
  const [showTable, setShowTable] = useState(false);
  const [reportData, setReportData] = useState([]);
  const [isPopup , setIsPopup] = useState(false)
  const [updateId , setUpdateId] = useState(null)

  return (
    <div className="app-main flex-column flex-row-fluid" id="kt_app_main">
      <div className="d-flex flex-column flex-column-fluid">
        <BackgroundBeams />
        {/* <div id="kt_app_toolbar" className="app-toolbar py-3 py-lg-6">
          <div
            id="kt_app_toolbar_container"
            className="app-container container-xxl d-flex flex-stack"
          >
            <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
              <h1 className="page-heading d-flex text-gray-900 fw-bold fs-3 flex-column justify-content-center my-0">
                Add Coupons
              </h1>
            </div>
          </div>
        </div> */}
        <div className="app-content flex-column-fluid" id="kt_app_content">
          <div
            className="app-container container-xxl"
            id="kt_app_content_container"
          >
            <div id="kt_ecommerce_add_product_form" className="">
              <AddZoonCard
                setTable={setShowTable}
                setReportDataTable={setReportData}
                setIsPopup={setIsPopup}
                setUpdateId={setUpdateId}
              />
             {updateId && <Modal show={isPopup} size="lg" >
                <AddZoonSettingCard
                  setTable={setShowTable}
                  setIsPopup={setIsPopup}
                  setReportDataTable={setReportData}
                  id={updateId}
                />
              </Modal>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZoonPage;
