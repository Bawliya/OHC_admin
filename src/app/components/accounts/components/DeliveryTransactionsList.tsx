/* eslint-disable @typescript-eslint/no-unused-vars */

// import '../../../public/modeldeliveryboy.css';

// import { useState } from "react";
import {
  useEffect,
  useState,
} from 'react';

// import verifyDelixveryBoyFunction from '../services/deliveryboy/DeliveryBoy';
import ModalOrderComponent from '../../OrderModel';
import { GetOneOrderFunction } from '../../../services/order/order';
// import { GetOneOrderFunction } from '../services/order/order';

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

const DeliveryBoyTransactionComponent: React.FC<props> = ({
  data,
}) => {
  const [TableData, setTableData] = useState(data?.data);
  const [isModal, setIsModal] = useState<any>(false);
  const [orderData, setOrderData] = useState({});
  useEffect(() => {
    setTableData(data?.data);
  }, [data]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    
    

    setTableData(newData);
    console.log("hello");
    
    // const res = await RefundFunction(id);
    // console.log(res);
  };

  async function getOrder(item:any){
    console.log(item._id);
    const res = await GetOneOrderFunction(item._id)
    console.log(res);
    setOrderData(res)
    setIsModal(true);
  }

  console.log("TableData",TableData);

  const formatDate = (dateString:any) => {
    const options:any = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'UTC',
    };

    return new Date(dateString).toLocaleString('en-US', options).replace(',', '');
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
              <table className="table table-hover  p-0 m-0 table-rounded  border gy-7 gs-7">
                <thead>
                  <tr className="fw-bold fs-6 text-gray-800 border-bottom-2 border-gray-200">
                    <th>Sr. No.</th>
                    <th>Amount</th>
                    <th>Payment Type</th>
                    <th>Payment Id</th>
                    <th>Description</th>

                    <th className="">Date</th>
                    {/* <th className="text-center">Payment Status</th> */}
                    {/* <th className="text-end">Actions</th> */}
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
                        <td>{item?.amount}</td>
                        <td>{item?.type}</td>
                        <td>{item?.payment_id}</td>
                        <td>{item?.description}</td>
                        {/* <td>{item?.created_at}</td> */}
                        <td>{item?.createdAt ? formatDate(item.createdAt) : '-'}</td>
                        {/* <td className="text-end align-items-center">
                          <a
                            rel="noopener noreferrer"
                            href="javascript:void(0)"
                            onClick={() => getOrder(item)}
                          >
                            <i className="ki-duotone fs-1 text-primary ki-eye">
                              <span className="path1"></span>
                              <span className="path2"></span>
                              <span className="path3"></span>
                            </i>
                          </a>
                        </td> */}
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
      <ModalOrderComponent
        show={isModal}
        onHide={() => setIsModal(false)}
        values={orderData}
      />
    </div>
  );
};

export default DeliveryBoyTransactionComponent;
