// import { useState } from 'react';
// import BrowseDetailsCard from "../../../components/AddBrowseComponent";
// import ProductThumbnail from "../../../components/ImageComponent";
import ViewBranchComponent from "../../../components/ViewBranchCompnent";
import { BackgroundBeams } from "../../../UI/background-beams";

const ViewRestaurantPage = () => {
  //   const [file,setFile] = useState<any>("")
  return (
    <div className="app-main flex-column flex-row-fluid" id="kt_app_main">
      <div className="d-flex flex-column flex-column-fluid">
        <BackgroundBeams />

        <div className="app-content flex-column-fluid" id="kt_app_content">
          <div
            className="app-container container-xxl"
            id="kt_app_content_container"
          >
            <div
              id="kt_ecommerce_add_product_form"
              className="form d-flex flex-column flex-lg-row fv-plugins-bootstrap5 fv-plugins-framework"
            >
              <ViewBranchComponent />
              {/* <BrowseDetailsCard file={file} /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewRestaurantPage;
