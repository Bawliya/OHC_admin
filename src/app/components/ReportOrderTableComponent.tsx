import React, { useEffect, useState } from "react";

// import ModalCategoryComponent from "./ModelCategoryComponent";
// import { verifyCategoryFunction } from "../services/category/Category";
// import ModalCouponsComponent from "./ViewCouponsModel";
const API_URL: string = import.meta.env.VITE_APP_API_URL as string;
export const BASE_URL: string = `${API_URL}/images/category/`;
import { format } from "date-fns";
// import { Parser } from 'json2csv';

type props = {
  data: any;
  handleUpdate: any;
  handleDelete: any;
};

const ReportOrderTableComponent: React.FC<props> = ({
  data,
  //   handleUpdate,
  handleDelete,
}) => {
  //   const [isModal, setIsModal] = useState<any>(false);
  //   const [isModal2, setIsModal2] = useState<any>(false);
  //   const [currentData, setCurrentData] = useState<any>({});
  //   const [currentData2, setCurrentData2] = useState<any>({});
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

  const [TableData, setTableData] = useState(data?.data);
  useEffect(() => {
    if (data?.data) {
      setTableData(data?.data);
    }
  }, [data]);

  console.log(TableData);

  const handleExport = () => {
    // Define the header for CSV
    const headers = [
      "Sr. No.",
      "Order Id",
      "Restaurant Name",
      "Restaurant No.",
      "User Name",
      "User No.",
      "Order Status",
      "Payment Status",
      "Total Amount",
      "Date",
    ];

    // Create rows for CSV
    const rows = TableData.map((item: any, index: any) => [
      (data?.currentPage - 1) * 10 + index + 1,
      item?.orderId,
      item?.restaurant.nameEn,
      item?.restaurant.phone,
      item?.user.first_name,
      item?.user.phone,
      item?.order_status,
      item?.payment_status,
      item?.total_amount,
      item?.createdAt
        ? format(new Date(item.createdAt), "MM/dd/yyyy HH:mm:ss")
        : "",
    ]);

    // Combine headers and rows
    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell: any) => `"${cell}"`).join(","))
      .join("\n");

    // Create a blob and trigger download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "table_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
              <button onClick={handleExport} className="btn btnRed w-150px m-2">
                Export CSV
              </button>
              <table className="table table-hover p-0 m-0 table-rounded table-striped  gy-7 gs-7">
                <thead>
                  <tr className="fw-bold fs-6 text-gray-800 border-bottom-2 border-gray-200">
                    <th>Sr. No.</th>
                    <th>Order Id</th>
                    <th>Restaurant Name</th>
                    <th>Restaurant No.</th>
                    <th className="">User Name</th>
                    <th className="">User No.</th>
                    <th className="">Order Status</th>
                    <th className="">Payment Satus</th>
                    <th className="text-end">Total Amount</th>
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
                          <td>{item?.orderId}</td>
                          <td>{item?.restaurant.nameEn}</td>
                          <td>{item?.restaurant.phone}</td>
                          <td>{item?.user.first_name}</td>
                          <td>{item?.user.phone}</td>
                          <td>{item?.order_status}</td>
                          <td>{item?.payment_status}</td>
                          <td className="text-end">{item?.total_amount}</td>
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
  );
};

export default ReportOrderTableComponent;
