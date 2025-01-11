import React, { useEffect, useState } from "react";

// import CardStack from "../components/CardStackComponenet"
// import ModalCategoryComponent from "./ModelCategoryComponent";
import { verifyRestaurantFunction } from "../services/Restaurant/Restaurant";
// import RestaurantModelDetailsCard from "./RestaurantModel";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import AddBranchPage from "./profile/components/Branch";
import BranchModelDetailsCard from "./BranchModel";

const API_URL: string = import.meta.env.VITE_APP_API_URL as string;
export const BASE_URL: string = `${API_URL}/images/restaurant/`;

type props = {
  data: any;
  handleUpdate: any;
  handleDelete: any;
  setActiveTab: any;
};

const BranchTable: React.FC<props> = ({
  data,
  // handleUpdate,
  handleDelete,
  setActiveTab,
}) => {
  const [isModal, setIsModal] = useState<any>(false);
  const [currentData, setCurrentData] = useState<any>({});
  // const [isAddingBranch, setIsAddingBranch] = useState(false);
  console.log(handleDelete);

  const [TableData, setTableData] = useState(data?.data);
  useEffect(() => {
    if (data?.data) {
      setTableData(data?.data);
    }
  }, [data]);

  console.log(TableData);

  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    throw new Error("Local data not found");
  }
  const role = JSON.parse(localData).data;
  console.log("role", role);
  const roleArray = role?.role?.roleArray;
  console.log(roleArray);

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

    const res = await verifyRestaurantFunction(id);
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
    <div className="d-flex flex-column  flex-row-fluid gap-7 gap-lg-10">
      <div className="tab-content">
        {/* {isAddingBranch ? (
          // Render AddBranchComponent when adding a branch
          <AddBranchPage />
        ) : ( */}
        <div
          className="tab-pane fade show active"
          id="kt_ecommerce_add_product_general"
          role="tab-panel"
        >
          <div className="d-flex flex-column gap-7 gap-lg-10">
            <div className="card">
              <div className="table-responsive">
                <div className="d-flex justify-content-end m-5 mb-0">
                  <button
                    className="btn btnRed"
                    onClick={() => setActiveTab(3)}
                  >
                    Add Branch
                  </button>
                </div>
                <table className="table branch table-hover position-relative table-rounded p-0 m-0 table-striped  gy-7 gs-7">
                  <div className="m-3"></div>
                  <thead>
                    <tr className="fw-bold fs-6  text-gray-800 border-bottom-2 border-gray-200">
                      <th className="pt-4">Sr. No.</th>
                      <th className="pt-4">Name En</th>
                      <th className="pt-4">Phone</th>
                      <th className="pt-4">Index</th>
                      <th className="w-100px ">Image</th>
                      <th className="text-center ">Publish</th>
                      <th className="text-end ">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TableData ? (
                      TableData.length > 0 ? (
                        TableData.map((
                          item: any,
                          index: any // Remove "return" here
                        ) => (
                          <tr key={index}>
                            <td>{(data?.currentPage - 1) * 10 + index + 1}</td>
                            <td>
                              {item?.nameEn}{" "}
                              <p>
                                <Link
                                  to=""
                                  onClick={() => copyToClipboard(item?._id)}
                                >
                                  <span>ID : </span> {item?._id}
                                </Link>
                              </p>
                            </td>
                            <td>{item?.phone}</td>
                            <td>{item?.position}</td>
                            <td>
                              <img
                                src={BASE_URL + item?.background_image}
                                className="card-rounded"
                                width={"50px"}
                                height={"30px"}
                                style={{ objectFit: "cover" }}
                                alt=""
                              />
                              {/* <CardStack cards={cards} /> */}
                            </td>
                            <td className="text-center">
                              {role?.type === "Admin" ||
                              roleArray?.some(
                                (item: { [x: string]: string | string[] }) =>
                                  "Business" in item &&
                                  item["Business"].includes("Public")
                              ) ? (
                                <a href="javascript:void(0)">
                                  <span
                                    className={`badge ${
                                      item?.publish
                                        ? "badge-light-success"
                                        : "badge-light-danger"
                                    } ${
                                      item.verify === false ? "disabled" : ""
                                    }`}
                                    style={
                                      item.verify === false
                                        ? {
                                            display: "disabled",
                                            fontSize: "14px",
                                          }
                                        : { fontSize: "14px" }
                                    }
                                    onClick={() => handleClick(item._id)}
                                  >
                                    {item?.publish.toString()}
                                  </span>
                                </a>
                              ) : null}
                            </td>
                            <td className="text-end align-items-center">
                              <a
                                href={`/branch/view/${item._id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <i className="ki-duotone fs-1 text-primary ki-eye">
                                  <span className="path1"></span>
                                  <span className="path2"></span>
                                  <span className="path3"></span>
                                </i>
                              </a>
                              {role?.type === "Admin" ||
                              roleArray?.some(
                                (item: { [x: string]: string | string[] }) =>
                                  "Business" in item &&
                                  item["Business"].includes("Edit")
                              ) ? (
                                <a
                                  href="javascript:void(0)"
                                  onClick={() => {
                                    setCurrentData({});
                                    setIsModal(true);
                                    setCurrentData(item);
                                  }}
                                >
                                  <i className="ki-duotone text-success fs-1 ki-notepad-edit">
                                    <span className="path1"></span>
                                    <span className="path2"></span>
                                  </i>
                                </a>
                              ) : null}

                              {/* <a
                            href="javascript:void(0)"
                            onClick={() => handleDelete(item)}
                          >
                            <i className="ki-duotone text-danger fs-1 ki-trash">
                              <span className="path1"></span>
                              <span className="path2"></span>
                              <span className="path3"></span>
                              <span className="path4"></span>
                              <span className="path5"></span>
                            </i>
                          </a> */}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="text-center">
                            {" "}
                            {/* Change colSpan to 6 */}
                            No data found
                          </td>
                        </tr>
                      )
                    ) : (
                      <tr>
                        <td colSpan={12} className="text-center">
                          {" "}
                          {/* Change colSpan to 6 */}
                          {/* Show loader if Data is null */}
                          <div
                            className="d-flex justify-content-center mb-5 align-items-center"
                            style={{ height: "10px" }}
                          >
                            <div className="loader-wrapper">
                              <span className="loader"></span>
                              <span className="loading-text px-5">
                                Loading...
                              </span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <ToastContainer />
            </div>
          </div>
        </div>
        {/* // )} */}
      </div>
      <BranchModelDetailsCard
        show={isModal}
        onHide={() => setIsModal(false)}
        values={currentData}
        setTableData={setTableData}
        tableData={TableData}
        // id="#kt_modal_2"
        // updateFunc={handleUpdate}
      />
    </div>
  );
};

export default BranchTable;
