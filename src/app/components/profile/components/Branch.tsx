import { useState } from 'react';
// import RestaurantDetailsCard from "../../../components/AddRestaurantComponent";
import ProductThumbnail from "../../../components/ImageComponent";
// import { BackgroundBeams } from "../../../UI/background-beams";
import BranchDetailsCard from './AddBranch';

const AddBranchPage = () => {
  const [file,setFile] = useState<any>("")
//   const [file2,setFile2] = useState<any>("")
  return (
    <div className="app-main flex-column flex-row-fluid mb-5" id="kt_app_main">
      <div className="d-flex flex-column flex-column-fluid">
      {/* <BackgroundBeams /> */}
        {/* <div id="kt_app_toolbar" className="app-toolbar py-3 py-lg-6">
          <div id="kt_app_toolbar_container" className="app-container container-xxl d-flex flex-stack">
            <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
              <h1 className="page-heading d-flex text-gray-900 fw-bold fs-3 flex-column justify-content-center my-0">Add Branch</h1>
            </div>
          </div>
        </div> */}
        <div className="" id="kt_app_content">
      <div className="" id="kt_app_content_container">
        <div id="kt_ecommerce_add_product_form" className="form d-flex flex-column flex-lg-row fv-plugins-bootstrap5 fv-plugins-framework">
        <div className=''>
        <ProductThumbnail  imageName="Image" setFile={setFile} />
         {/* <ProductThumbnail imageName="Logo"   setFile={setFile2}/> */}
         </div>
        <div className=''>
        <BranchDetailsCard file={file} />
         {/* file2={file2} */}
        </div> 
         
        </div>
      </div>
    </div>
    
      </div>
    </div>
  );
};

export default AddBranchPage;