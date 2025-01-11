/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";

import ModalComponent from "./ModelComponent";
import { verifyBannerFunction } from "../services/banner/Banner";
import ZoneEditModal from "./ZoneEditModal";
import { Modal } from "react-bootstrap";
import UpdateZoon from "./UpdateZoon";
import { updateZoonFunction } from "../services/Zoon/Zoon";
import { toast } from "react-toastify";
const API_URL: string = import.meta.env.VITE_APP_API_URL as string;
export const BASE_URL: string = `${API_URL}/images/banner/`;

type props = {
  data: any;
  handleUpdate: any;
  handleDelete: any;
};

const ZoneTable: React.FC<props> = ({ data, handleUpdate, handleDelete }) => {
  const [isModal, setIsModal] = useState<any>(false);
  const [isSettingModal, setIsSettingModal] = useState<any>(false);
  const [currentData, setCurrentData] = useState<any>({});
  const [updateId, setUpdateId] = useState<any>(null);

  const [TableData, setTableData] = useState(data?.data);
  useEffect(() => {
    if (data?.data) {
      setTableData(data?.data);
    }
  }, [data]);

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

    const res = await verifyBannerFunction(id);
    console.log(res);
  };

  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    throw new Error("Local data not found");
  }
  const role = JSON.parse(localData).data;
  const roleArray = role?.role?.roleArray;

  const handleChangePaymentMethod = async (id: any, event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    const updateData = { id, [name]: checked };
    const updatedData = TableData?.map((item: any) => {
      if (item?._id === id) {
        return { ...item, [name]: checked };
      }
      return item;
    });
    setTableData(updatedData);
    await updateZoonFunction(updateData).then((res) => {
      toast.success(res?.data?.message)
    }).catch((e: any) => {
      toast.error(e?.message)
    })
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
                <table className="table table-hover p-0 m-0 table-rounded table-striped border gy-7 gs-7">
                  <thead>
                    <tr className="fw-bold fs-6 text-gray-800 border-bottom-2 border-gray-200">
                      <th>Sr. No.</th>
                      <th>Name</th>
                      <th>Cash on Delivery</th>
                      <th className="">Digital Payment</th>
                      {/* <th className="">Offline Payment</th> */}
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
                          <tr key={index}>
                            <td>{(data?.currentPage - 1) * 10 + index + 1}</td>
                            <td>{item?.zoon_name}</td>
                            <td>
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input h-20px w-35px"
                                  type="checkbox"
                                  role="switch"
                                  id="flexSwitchCheckDefault"
                                  name="cash_on_delivery"
                                  checked={
                                    item?.cash_on_delivery === "false"
                                      ? false
                                      : item?.cash_on_delivery
                                  }
                                  onChange={(e) => { handleChangePaymentMethod(item?._id, e) }}
                                />
                              </div>
                            </td>
                            <td>
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input h-20px w-35px"
                                  type="checkbox"
                                  role="switch"
                                  id="flexSwitchCheckDefault"
                                  name="digital_payment"
                                  checked={
                                    item?.digital_payment === "false"
                                      ? false
                                      : item?.digital_payment
                                  }
                                  onChange={(e) => { handleChangePaymentMethod(item?._id, e) }}
                                />
                              </div>
                            </td>

                            {/* <td>
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input h-20px w-35px"
                                  type="checkbox"
                                  role="switch"
                                  id="flexSwitchCheckDefault"
                                  name="offline_payment"
                                  checked={
                                    item?.offline_payment === "false"
                                      ? false
                                      : item?.offline_payment
                                  }
                                  onChange={(e) => { handleChangePaymentMethod(item?._id, e) }}
                                />
                              </div>
                            </td> */}
                            
                            <td className="text-end align-items-center">
                              {role?.type === "Admin" ||
                                roleArray?.some(
                                  (item: { [x: string]: string | string[] }) =>
                                    "Banner" in item &&
                                    item["Banner"].includes("Edit")
                                ) ? (
                                <>
                                  <a
                                    href="javascript:void(0)"
                                    onClick={() => {
                                      setCurrentData({});
                                      setIsModal(true);
                                      setCurrentData(item);
                                      setUpdateId(item?._id);
                                    }}
                                  >
                                    <i className="ki-duotone fs-1 ki-notepad-edit">
                                      <span className="path1"></span>
                                      <span className="path2"></span>
                                    </i>
                                  </a>
                                  <a
                                    href="javascript:void(0)"
                                    onClick={() => {
                                      setCurrentData({});
                                      setIsSettingModal(true);
                                      setCurrentData(item);
                                      setUpdateId(item?._id);
                                    }}
                                  >
                                    <i className="ki-duotone text-success fs-1 ki-setting-3">
                                      <span className="path1"></span>
                                      <span className="path2"></span>
                                      <span className="path3"></span>
                                      <span className="path4"></span>
                                      <span className="path5"></span>
                                    </i>
                                  </a>
                                </>
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

      {updateId && (
        <Modal show={isSettingModal} size="lg">
          <ZoneEditModal
            setTable={setTableData}
            setIsPopup={setIsSettingModal}
            setReportDataTable={() => { }}
            id={updateId}
            currentData={currentData}
            table={TableData}
          />
        </Modal>
      )}

      {updateId && (
        <Modal show={isModal} size="lg" onHide={() => setIsModal(false)}>
          <Modal.Header closeButton ><h2 className="m-0">Update Business Zone</h2></Modal.Header>
          <UpdateZoon
            setTable={() => { }}
            setIsPopup={setIsModal}
            setReportDataTable={() => { }}
            allData={TableData}
            setAllData={setTableData}
            currentData={currentData}
          // id={updateId}
          />
        </Modal>
      )}
    </div>
  );
};

export default ZoneTable;
