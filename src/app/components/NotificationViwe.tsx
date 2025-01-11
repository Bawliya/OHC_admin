import React, { useEffect, useState } from "react";
import { getOrderFunction } from "../services/notification/notification";
import PaginationComponent from "./PaginationComponent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NotificationView = () => {
  const [tableData, setTableData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalLimit, setLimit] = useState<number>(1);
  const [TotalRecords, setTotalRecords] = useState<number>(1);
  const [selectedType, setSelectedType] = useState<string>("HBOT"); // Default value: HBOT

  const getNotifications = async (currentPage: any, limit: any, type: any) => {
    try {
      const resp: any = await getOrderFunction(currentPage, limit, type);

      if (resp?.data.status === true) {
        setTableData(resp?.data?.data);
        setTotalPages(resp?.data?.pagination?.totalPages);
        setLimit(resp?.data?.pagination?.limit);
        setTotalRecords(resp?.data?.pagination?.totalRecords);
      } else {
        setTableData([]);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setTableData([]);
    }
  };

  useEffect(() => {
    getNotifications(currentPage, 10, selectedType);
  }, [currentPage, selectedType]);

  // Handle pagination click
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle type change
  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(event.target.value);
    setCurrentPage(1); // Reset to the first page on type change
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()}`;
  };

  return (
    <div className="p-10">
      {/* Dropdown for selecting order type */}
      <div className="mb-5">
        <label htmlFor="orderType" className="me-3">
          Select Order Type:
        </label>
        <select
          id="orderType"
          className="form-select form-select-sm w-auto"
          value={selectedType}
          onChange={handleTypeChange}
        >
          <option value="HBOT">HBOT</option>
          <option value="LAB">LAB</option>
        </select>
      </div>

      {/* Table */}
      <div className="table-responsive overflow-auto w-100">
        <table className="table table-hover p-0 m-0 table-rounded table-striped border gy-7 gs-7">
          <thead className="w-100 bg-white">
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Type</th>
              <th>Appointment Date/Time</th>
              <th>Address</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {tableData.length > 0 ? (
              tableData.map((item, index) => (
                <tr key={item._id}>
                  <td>{(currentPage - 1) * 10 + index + 1}</td>
                  <td>{item.fullname}</td>
                  <td>{item.phone_number}</td>
                  <td>{item.type}</td>
                  <td>
                    {formatDateTime(item.date)} {item.start_time}-
                    {item.end_time}
                  </td>
                  <td>
                    {item.address}, {item.city}, {item.state}, {item.zip_code}
                  </td>
                  <td>{formatDateTime(item.createdAt)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ToastContainer />

      {/* Pagination */}
      <div className="mt-10">
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default NotificationView;
