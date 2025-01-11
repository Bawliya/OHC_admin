import React, { useEffect, useState } from "react";

import ModalCategoryComponent from "./ModelCategoryComponent";
import { verifyCategoryFunction } from "../services/category/Category";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
// import { KTIcon } from "../../_metronic/helpers";
const API_URL: string = import.meta.env.VITE_APP_API_URL as string;
export const BASE_URL: string = `${API_URL}uploads/`;

type props = {
  data: any;
  handleUpdate: any;
  handleDelete: any;
  currentPage: any;
};

const TableCategoryComponent: React.FC<props> = ({
  data,
  handleUpdate,
  handleDelete,
  currentPage,
}) => {
  const [isModal, setIsModal] = useState<any>(false);
  const [currentData, setCurrentData] = useState<any>({});
  console.log(data);

  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    throw new Error("Local data not found");
  }
  const role = JSON.parse(localData).data;
  // console.log("role", role);
  const roleArray = role?.role?.roleArray;
  console.log(roleArray);

  const [TableData, setTableData] = useState(data);

  useEffect(() => {
    if (data) {
      setTableData(data);
    }
  }, [data]);

  console.log(TableData);

  const handleClick = async (id: any) => {
    const newData: any = TableData.map((item: any) => {
      console.log(item._id, id);

      if (item._id == id) {
        item.publish = !item.publish;
        return item;
      } else {
        return item;
      }
    });

    setTableData(newData);

    const res = await verifyCategoryFunction(id);
    console.log(res);
  };

  const notifySuccess = () => toast.success("ID copied to clipboard");
  // const notifyError = (errorMessage: any) => toast.error(errorMessage);
  const copyToClipboard = (id: any) => {
    const tempInput = document.createElement("input");
    tempInput.value = id;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    // alert(`ID copied to clipboard: ${id}`);
    notifySuccess();
  };

  return (
    <div className="d-flex flex-column flex-row-fluid">
      <div className="tab-content">
        <div
          className="tab-pane fade show active"
          id="kt_ecommerce_add_product_general"
          role="tab-panel"
        >
          <div className="d-flex mb-4 align-items-center justify-content-end position-relative z-30">
            <Link to={"/category/add"}>
              <button className="py-3 px-5 border-0 custom_btn fw-semibold  fs-5 rounded-2">
                Add New Category
              </button>
            </Link>
          </div>
          <div className="d-flex flex-column gap-7 gap-lg-10">
            <div className="card">
              {/* <div className='d-flex flex-wrap flex-stack mx-2 mt-2'>
                <h3 className='fw-bolder my-2'>
                
                  <span className='fs-6 text-gray-500 fw-bold ms-1'></span>
                </h3>

                <div className='d-flex '>
                  <div className='d-flex align-items-center position-relative '>
                    <KTIcon iconName='magnifier' className='fs-3 position-absolute ms-3' />
                    <input
                      type='text'
                      id='kt_filter_search'
                      className='form-control form-control-white form-control-sm w-150px ps-9'
                      placeholder='Search'
                    />
                  </div>
                </div>
              </div> */}

              <table className="table table-hover p-0 m-0 table-rounded table-striped  gy-7 gs-7">
                <thead>
                  <tr className="fw-bold fs-6 text-gray-800 border-bottom-2 border-gray-200">
                    <th>Sr. No.</th>
                    <th>Name</th>
                    <th>Image</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                {TableData ? (
  TableData.length > 0 ? (
    TableData.map((item: any, index: any) => (
      <tr key={index}>
        <td>{(currentPage - 1) * 10 + index + 1}</td>
        <td>{item?.name}</td>
        <td>
          <img
            src={`${BASE_URL}${item?.image}`}
            alt="Category"
            style={{ width: '50px', height: '50px', objectFit: 'cover' }} // Add styles if needed
          />
        </td>
        <td className="text-end align-items-center">
          {role?.type === 'Admin' ||
          roleArray?.some(
            (item: { [x: string]: string | string[] }) =>
              'Category' in item && item['Category'].includes('Edit')
          ) ? (
            <a
              href="javascript:void(0)"
              onClick={() => {
                setCurrentData({});
                setIsModal(true);
                setCurrentData(item);
              }}
            >
              <i className="ki-duotone fs-1 ki-notepad-edit">
                <span className="path1"></span>
                <span className="path2"></span>
              </i>
            </a>
          ) : null}
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={6} className="text-center">
        No data found
      </td>
    </tr>
  )
) : (
  <tr>
    <td colSpan={12} className="text-center">
      <div
        className="d-flex justify-content-center mb-5 align-items-center"
        style={{ height: '10px' }}
      >
        <div className="loader-wrapper">
          <span className="loader"></span>
          <span className="loading-text px-5">Loading...</span>
        </div>
      </div>
    </td>
  </tr>
)}

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      <ModalCategoryComponent
        show={isModal}
        onHide={() => setIsModal(false)}
        values={currentData}
        updateFunc={handleUpdate}
      />
    </div>
  );
};

export default TableCategoryComponent;
