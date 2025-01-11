/* eslint-disable @typescript-eslint/no-unused-vars */
// import React, { useState } from "react";
// import CardStack from "../components/CardStackComponenet"
// import ModalCategoryComponent from "./ModelCategoryComponent";

import "../../../public/modeldeliveryboy.css";

// import { useState } from "react";
import { useEffect, useState } from "react";

// import verifyDeliveryBoyFunction from "../services/deliveryboy/DeliveryBoy";

// import DeliveryBoyComponent from "./ModelDeliveryBoy";

// import { Link } from "react-router-dom";

// const API_URL: string = import.meta.env.VITE_APP_API_URL as string;
export const BASE_URL: string = `https://daeemapi.testenvapp.com/images/`;

type props = {
  data: any;
  handleDelivery: any;
  handleDeliveryShow: any;
  setIsTable: any;
  deliveryBoyData: any;
};

const DeliveryBoyTableComponent: React.FC<props> = ({
  data,
  setIsTable,
  deliveryBoyData,
}) => {
  const [currentData, setCurrentDeliveryBoyData] = useState<any>({});
  const [TableData, setTableData] = useState(data?.data);
  useEffect(() => {
    setTableData(data?.data);
  }, [data]);
  const handleClick = async (id: any) => {
    const newData: any = TableData.map((item: any) => {
      console.log(item._id, id);

      if (item._id == id) {
        item.admin_verify = !item.admin_verify;
        return item;
      } else {
        return item;
      }
    });
    console.log(TableData);

    setTableData(newData);

    // const res = await verifyDeliveryBoyFunction(id);
    // console.log(res);
  };

  console.log(currentData);

  const setFunction = async (data: any) => {
    console.log(data);
    // setCurrentDeiveryBoyData(data);
    setIsTable(true);
    deliveryBoyData(data);
  };

  return (
    <div className="d-flex flex-column flex-row-fluid gap-7 gap-lg-10">
      <div className="tab-content">
        <div
          className="tab-pane fade show active"
          id="kt_ecommerce_add_product_general"
          role="tab-panel"
        >
          <div className="d-flex flex-column gap-7 gap-lg-10">
            <div className="card">
              <div className="table-responsive">
                <table className="table table-hover  p-0 m-0 table-rounded  border gy-7 gs-7 table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer">
                  <thead>
                    <tr className="fw-bold fs-6 text-gray-800 border-bottom-2 border-gray-200">
                      <th>Sr. No.</th>
                      <th>Name</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th className="w-100px">Image</th>
                      {/* <th className="text-center">Publish</th> */}
                      <th className="text-center">User</th>
                      <th className="text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TableData ? (
                      TableData.length > 0 ? (
                        TableData.map((
                          item: any,
                          index: any // Remove "return" here
                        ) => (
                          <tr
                            key={index}
                            className={
                              item.verify === false
                                ? "bg-light-danger"
                                : item.admin_verify === false
                                ? "bg-light-warning"
                                : "bg-light-success"
                            }
                          >
                            <td>{(data?.currentPage - 1) * 10 + index + 1}</td>
                            <td>{item?.name}</td>
                            <td>{item?.phone }</td>
                            <td>{item?.email || "Na"}</td>
                            <td>
                              <img
                                src={
                                  BASE_URL +
                                  (item?.driver_photo ||
                                    "/../media/logos/usericon.png")
                                }
                                onError={(
                                  e: React.SyntheticEvent<
                                    HTMLImageElement,
                                    Event
                                  >
                                ) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = "/../media/logos/usericon.png";
                                }}
                                className="symbol-label symbol symbol-circle symbol-30px w-45px h-45px"
                                width={"30px"}
                                height={"30px"}
                                style={{ objectFit: "cover" }}
                                alt=""
                              />
                            </td>

                            {/* <td className="text-center">
                              <a href="javascript:void(0)">
                                <span
                                  className={`badge ${
                                    item?.admin_verify
                                      ? "badge-light-success"
                                      : "badge-light-danger"
                                  } ${item.verify === false ? "disabled" : ""}`}
                                  style={
                                    item.verify === false
                                      ? {
                                          display: "disabled",
                                          fontSize: "14px",
                                        }
                                      : { fontSize: "14px" }
                                  }
                                  onClick={
                                    item.verify === false
                                      ? () => {}
                                      : () => handleClick(item._id)
                                  }
                                >
                                  {item?.admin_verify.toString()}
                                </span>
                              </a>
                            </td> */}

                            <td className="text-center">
                              <a href="javascript:void(0)">
                                <span
                                  className={`badge ${
                                    item?.verify
                                      ? "badge-light-success"
                                      : "badge-light-danger"
                                  }`}
                                  style={{ fontSize: "14px" }}
                                >
                                  {item?.verify.toString()}
                                </span>
                              </a>
                            </td>
                            <td className="text-end align-items-center">
                              <a
                                rel="noopener noreferrer"
                                href="javascript:void(0)"
                                onClick={() => {
                                  setFunction(item);
                                  setCurrentDeliveryBoyData(item);
                                }}
                              >
                                <i className="ki-duotone fs-1 text-primary ki-eye">
                                  <span className="path1"></span>
                                  <span className="path2"></span>
                                  <span className="path3"></span>
                                </i>
                              </a>
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
                            style={{  height: "10px" }}
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
      {/* <DeliveryBoyComponent
        show={isModal}
        onHide={() => setIsModal(false)}
        values={currentData}
        id="#kt_modal_2"
        // updateFunc={handleUpdate}
      /> */}
    </div>
  );
};

export default DeliveryBoyTableComponent;
