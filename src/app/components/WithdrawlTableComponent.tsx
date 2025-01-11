/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv"; // Import CSVLink from react-csv
import { verifyWithdrawlFunction } from "../services/WithdrawlRequest/WithdrawlRequest";
import ModalWithdrawalComponent from "./ModelWithdrawalComponent";
const API_URL: string = import.meta.env.VITE_APP_API_URL as string;
export const BASE_URL: string = `${API_URL}/images/category/`;

type Props = {
  data: any;
  handleUpdate: any;
  handleDelete: any;
  status: any;
  setStatus: any;
  setType: any;
  type: any;
};

const WithdrawlComponent: React.FC<Props> = ({
  data,
  handleUpdate,
  handleDelete,
  status,
  setStatus,
  setType,
  type
}) => {
  const [isModal, setIsModal] = useState(false);
  const [currentData, setCurrentData] = useState({});
  const [TableData, setTableData] = useState(data?.data || []);
  const [csvData, setCsvData] = useState([]);

  useEffect(() => {
    if (data?.data) {
      setTableData(data?.data);
    }
  }, [data]);

  useEffect(() => {
    // Define CSV data when TableData changes
    const newCsvData = TableData?.map((item: any, index: any) => ({
      srNo: (data?.currentPage - 1) * 10 + index + 1,
      amount: item?.amount,
      account_number: item?.account_number,
      ifsc_code: item?.ifsc_code,
      bank_name: item?.bank_name,
      status: item?.status,
    }));
    setCsvData(newCsvData);
  }, [TableData, data?.currentPage]);

  let selectedType = 'Restaurant'; // Default value
  let selectedStatus = 'All';

  function changeFunction(event: any) {
    const selectName = event.target.name;
    const selectedValue = event.target.value;

    if (selectName === 'type') {
      selectedType = selectedValue;
      setType(selectedValue);
    } else if (selectName === 'status') {
      selectedStatus = selectedValue;
      setStatus(selectedValue);
    }

    console.log("Selected type: " + selectedType);
    console.log("Selected status: " + selectedStatus);
  }

  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    throw new Error("Local data not found");
  }
  const role = JSON.parse(localData).data;
  const roleArray = role?.role?.roleArray;

  const handleClick = async (id: any) => {
    const newData = TableData.map((item: any) => {
      if (item._id === id) {
        item.status = "Success";
      }
      return item;
    });

    setTableData(newData);
    const res = await verifyWithdrawlFunction(id);
    console.log(res);
  };

  // Define CSV headers
  const headers = [
    { label: "Sr. No.", key: "srNo" },
    { label: "Amount", key: "amount" },
    { label: "Account Number", key: "account_number" },
    { label: "IFSC Code", key: "ifsc_code" },
    { label: "Bank Name", key: "bank_name" },
    { label: "Status", key: "status" },
  ];

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
              <div className='d-flex flex-wrap m-2 justify-content-end'>
                <div className='me-4'>
                  <select
                    name='type'
                    data-control='select2'
                    data-hide-search='true'
                    className='form-select form-select-sm form-select-white w-125px'
                    defaultValue='Restaurant'
                    onChange={changeFunction}
                    value={type}
                  >
                    <option value='Restaurant' selected>Partner</option>
                    <option value='Delivery'>Delivery</option>
                  </select>
                </div>
                <div className=''>
                  <select
                    name='status'
                    data-control='select2'
                    data-hide-search='true'
                    className='form-select form-select-sm form-select-white w-125px'
                    defaultValue='All'
                    onChange={changeFunction}
                    value={status}
                  >
                    <option value='All' selected>All</option>
                    <option value='Pending'>Pending</option>
                    <option value='Success'>Success</option>
                  </select>
                </div>
                <div className='ml-2 px-2'>
                  <CSVLink
                    data={csvData}
                    headers={headers}
                    filename={"withdrawal-data.csv"}
                    className="btn btn-primary"
                  >
                    Export Data
                  </CSVLink>
                </div>
              </div>
              <table className="table table-hover p-0 m-0 table-rounded table-striped gy-7 gs-7">
                <thead>
                  <tr className="fw-bold fs-6 text-gray-800 border-bottom-2 border-gray-200">
                    <th>Sr. No.</th>
                    <th>Amount</th>
                    <th>Account Number</th>
                    <th>IFSC Code</th>
                    <th className="">Bank Name</th>
                    <th className="">Publish</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {TableData.length > 0 ? (
                    TableData.map((item: any, index: any) => (
                      <tr key={index}>
                        <td>{(data?.currentPage - 1) * 10 + index + 1}</td>
                        <td>{item?.amount}</td>
                        <td>{item?.account_number}</td>
                        <td>{item?.ifsc_code}</td>
                        <td>{item?.bank_name}</td>
                        <td>
                          {role?.type === 'Admin' ? (
                            <a href="javascript:void(0)">
                              <span
                                className={`badge ${item?.status === "Success"
                                  ? "badge-light-success"
                                  : "badge-light-danger"
                                  } ${item.verify === false ? "disabled" : ""}`}
                                style={
                                  item.status === "Success"
                                    ? { display: "disabled", fontSize: "14px" }
                                    : { fontSize: "14px" }
                                }
                                onClick={() => handleClick(item._id)}
                              >
                                {item?.status}
                              </span>
                            </a>
                          ) : null}
                        </td>
                        <td className="text-end align-items-center">
                          {role?.type === 'Admin' ? (
                            <a
                              href="javascript:void(0)"
                              onClick={() => {
                                setCurrentData({});
                                setIsModal(true);
                                setCurrentData(item);
                              }}
                            >
                              <i className="ki-duotone fs-1 text-primary ki-eye">
                                <span className="path1"></span>
                                <span className="path2"></span>
                                <span className="path3"></span>
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
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <ModalWithdrawalComponent
        show={isModal}
        onHide={() => setIsModal(false)}
        values={currentData}
        updateFunc={handleUpdate}
      />
    </div>
  );
};

export default WithdrawlComponent;
