import React, { useEffect, useState } from "react";
import BrowseModalComponent from "./ModelBrowseComponent";
import { verifyBrowseFunction } from "../services/browse/Browse";
import { Link } from "react-router-dom";
const API_URL: string = import.meta.env.VITE_APP_API_URL as string;
export const BASE_URL: string = `${API_URL}/images/browse/`;

type props = {
  data: any;
  handleUpdate: any;
  handleDelete: any;
  setLoading: any;
  loading: any;
  currentPage: any;
};

const TableBrowseComponent: React.FC<props> = ({
  data,
  handleUpdate,
  handleDelete,
  setLoading,
  loading,
  currentPage,
}) => {
  console.log("data , ", data);
  const [isModal, setIsModal] = useState<any>(false);
  const [currentData, setCurrentData] = useState<any>({});
  console.log(handleDelete);
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }
  const role = JSON.parse(localData).data;
  console.log("role", role);
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

    const res = await verifyBrowseFunction(id);
    console.log(res);
  };

  return (
    <div className="d-flex flex-column flex-row-fluid gap-7 gap-lg-10">
      <div className="tab-content">
        <div
          className="tab-pane fade show active"
          id="kt_ecommerce_add_product_general"
          role="tab-panel"
        >
          <div className="d-flex mb-4 align-items-center justify-content-end position-relative z-30">
            <Link to={"/browse/add"}>
              <button className="py-3 px-5 border-0 custom_btn fw-semibold  fs-5 rounded-2">
                Add New Breed
              </button>
            </Link>
          </div>
          <div className="d-flex flex-column gap-7 gap-lg-10">
            <div className="card">
              <div className="table-responsive">
                <table className="table table-hover p-0 m-0 table-rounded table-striped border gy-7 gs-7">
                  <thead>
                    <tr className="fw-bold fs-6 text-gray-800 border-bottom-2 border-gray-200">
                      <th>Sr. No.</th>
                      <th>Name En</th>
                      <th>Name Ar</th>
                      <th>Pet Type</th>
                      {/* <th>Index</th>
                      <th className="w-150px">Image</th>
                      <th className="w-50px">Publish</th> */}
                      <th className="text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!loading ? (
                      TableData?.length > 0 ? (
                        TableData.map((
                          item: any,
                          index: any // Remove "return" here
                        ) => (
                          <tr key={index}>
                            <td>{(currentPage - 1) * 10 + index + 1}</td>
                            <td>{item?.name?.en}</td>
                            <td>{item?.name?.ar}</td>
                            <td>
                              {item?.petType?.name?.en} (
                              {item?.petType?.name?.ar})
                            </td>
                            {/* <td>{item?.position}</td> */}
                            {/* <td>
                              <img
                                src={BASE_URL + item?.image}
                                className="card-rounded"
                                width={"50px"}
                                height={"30px"}
                                style={{ objectFit: "cover" }}
                                alt=""
                              />
                            </td> */}
                            {/* <td>
                              {role?.type === "Admin" ||
                              roleArray?.some(
                                (item: { [x: string]: string | string[] }) =>
                                  "BusBusinessCategoryiness" in item &&
                                  item["BusinessCategory"].includes("Public")
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
                            </td> */}
                            <td className="text-end align-items-center">
                              {role?.type === "Admin" ||
                              roleArray?.some(
                                (item: { [x: string]: string | string[] }) =>
                                  "BusBusinessCategoryiness" in item &&
                                  item["BusinessCategory"].includes("Edit")
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

                              {/* <a
                            href="javascript:void(0)"
                            onClick={() => handleDelete(item)}
                          >
                            <i className="ki-duotone fs-1 ki-trash">
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
            </div>
          </div>
        </div>
      </div>
      <BrowseModalComponent
        show={isModal}
        onHide={() => setIsModal(false)}
        values={currentData}
        updateFunc={handleUpdate}
      />
    </div>
  );
};

export default TableBrowseComponent;
