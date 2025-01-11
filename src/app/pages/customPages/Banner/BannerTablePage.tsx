// BannerTablePage.tsx
import React, { useEffect, useState } from "react";
import PaginationComponent from "../../../components/PaginationComponent"; // Adjust the import path as needed
import TableComponent from "../../../components/TableComponent";
import { EditBannerFunction, getBannersFunction,deleteBannerFunction } from "../../../services/banner/Banner";
import { BackgroundBeams } from "../../../UI/background-beams";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const BannerTablePage: React.FC = () => {
  const [tableData, setTableData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalLimit, setLimit] = useState<number>(1);
  const [TotalRecords, setTotalRecords] = useState<number>(1);

  useEffect(() => {
    getBanners(currentPage, 10);
  }, [currentPage]); // Refetch data when the ccurrentPage: numberurrentPage changes

  const getBanners = async (currentPage: any, limit: any) => {
    const resp: any = await getBannersFunction(currentPage, limit);
    console.log("resp",resp.data.data); // Pass currentPage to API call
    if (resp?.data.status) {
      setTableData(resp?.data);
      setTotalPages(resp?.data?.data?.totalPage);
      setLimit(resp?.data?.data?.pageLimit);
      setTotalRecords(resp?.data?.data?.totalRecords);
    } else {
      setTableData([]);
    }
  };

  console.log("tableData",tableData);

  

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleUpdate = async(formData:any) => {
const response = await EditBannerFunction(formData)
if(response.data.status){
  getBanners(currentPage , 10)
}
return response
}

  const handleDelete = async (item: any) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      background:"#ffffff",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result:any) => {
      if (result.isConfirmed) {
        // Perform deletion action here, for now, let's just log
        const res = await deleteBannerFunction(item._id);
        if (!res.data.status) {
          return Swal.fire("Error!", "Something went wrong.", "error");
        }else{
        getBanners(currentPage , 10)
        Swal.fire("Deleted!", "Your record has been deleted.", "success");
        }
      }
    });
  };

  return (
    <div className="app-main flex-column flex-row-fluid" id="kt_app_main">
      <div className="d-flex flex-column flex-column-fluid">
        <BackgroundBeams />
        <div id="kt_app_toolbar" className="app-toolbar py-3 py-lg-6">
          <div
            id="kt_app_toolbar_container"
            className="app-container container-xxl d-flex flex-stack"
          >
            <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
              <h1 className="page-heading d-flex text-gray-900 fw-bold fs-3 flex-column justify-content-center my-0">
                Banner Table
              </h1>
            </div>
          </div>
        </div>
        
        <div className="app-content flex-column-fluid" id="kt_app_content">
        <div className="d-flex mb-4 align-items-center justify-content-end position-relative z-30">
            <Link to={"/banner/add"} style={{ marginRight: "31px" }}>
              <button className="py-3 px-5 border-0 custom_btn fw-semibold  fs-5 rounded-2">
                Add New Banner
              </button>
            </Link>
          </div>
          <div
            className="app-container container-xxl"
            id="kt_app_content_container"
          >
            <div
              id="kt_ecommerce_add_product_form"
              className="form d-flex flex-column flex-lg-row fv-plugins-bootstrap5 fv-plugins-framework"
            >
              <TableComponent data={tableData}  handleUpdate={handleUpdate} handleDelete={handleDelete} />
            </div>
            <div className="card mb-5">
              <div className="row p-1">
                <div className="col-sm-12 text-sm-center  pb-sm-2 col-md-12 text-md-center text-xl-start pb-md-2 col-xl-6">
                  <div className="pt-2 px-2">
                    Showing page {`${(currentPage - 1) * totalLimit + 1}`} to{" "}
                    {`${Math.min(
                      currentPage * totalLimit,
                      totalPages * totalLimit
                    )} of ${TotalRecords}`}
                  </div>
                </div>
                <div className="col-md-12 col-xl-6">
                  <PaginationComponent
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerTablePage;
