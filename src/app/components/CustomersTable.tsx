/* eslint-disable @typescript-eslint/no-unused-vars */
// import React, { useState } from "react";
// import CardStack from "../components/CardStackComponenet"
// import ModalCategoryComponent from "./ModelCategoryComponent";

import "../../../public/modeldeliveryboy.css";

// import { useState } from "react";
import { useEffect, useState } from "react";

import verifyDeliveryBoyFunction from "../services/deliveryboy/DeliveryBoy";
import { toggleBlockUserFunction } from "../services/User/User";
import { string } from "yup";

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
  currentPage: any;
};

const CustomersTableComponent: React.FC<props> = ({
  data,
  deliveryBoyData,
  setIsTable,
  currentPage,
}) => {
  const [currentData, setCurrent] = useState<any>({});
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
  console.log(handleClick);

  const handleBlockToggle = async (userId: string) => {
    try {
      const response = await toggleBlockUserFunction(userId);
      if (response?.status === 200) {
        const updatedData = TableData.map((item: any) =>
          item._id === userId ? { ...item } : item
        );
        setTableData(updatedData);
      } else {
        console.error("Failed to update block status");
      }
    } catch (error) {
      console.error("Error toggling block status:", error);
    }
  };

  const setFunction = async (data: any) => {
    console.log(data);
    // setCurrentDeiveryBoyData(data);
    setIsTable(true);
    deliveryBoyData(data);
  };

  const formatDate = (dateString: any) => {
    const options: any = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "UTC",
    };

    return new Date(dateString)
      .toLocaleString("en-US", options)
      .replace(",", "");
  };

  return (
    <div className="d-flex flex-column flex-row-fluid gap-7 gap-lg-10">
      <div className="tab-content">
        <div
          className="tab-pane fade show active"
          id="kt_ecommerce_add_product_general"
          role="tab-panel"
        >
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive card">
                <table className="table table-hover  p-0 m-0 table-rounded  border gy-7 gs-7">
                  <thead>
                    <tr className="fw-bold fs-6 text-gray-800 border-bottom-2 border-gray-200">
                      <th className="text-nowrap">No.</th>
                      <th className="text-nowrap">Name</th>
                      <th className="text-nowrap">Email</th>
                      <th className="text-nowrap">Whatsapp NUmber</th>
                      <th className="text-nowrap">Type</th>
                      <th className="text-nowrap">Verified</th>
                      {/* <th className="text-nowrap">Blocked</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {TableData?.length > 0 ? (
                      TableData?.map((item: any, i: any) => (
                        <tr key={i}>
                          <td>{(currentPage - 1) * 10 + i + 1}</td>
                          <td>{item.fullName || "N/A"}</td>
                          <td>{item.email || "N/A"}</td>
                          <td>{item.whatsapp_number || "N/A"}</td>
                          <td>{item.userType || "N/A"}</td>
                          <td>{item.verify ? "Yes" : "No"}</td>
                          {/* <td> 
                            <div className="form-check form-switch">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                id={`flexSwitchCheckDefault-${item._id}`}
                                checked={!item.isBlocked}
                                onChange={() => handleBlockToggle(item._id)}
                                style={{ zIndex: 100, position: "relative" }}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={`flexSwitchCheckDefault-${item._id}`}
                              >
                                {item.isBlocked ? "Unblock" : "Block"}
                              </label>
                            </div>
                          </td> */}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6}>No users found</td>
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
      /> */}
    </div>
  );
};

export default CustomersTableComponent;
