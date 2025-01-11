import React, { useEffect, useState } from "react";

// import ModalCategoryComponent from "./ModelCategoryComponent";
import { verifyCategoryFunction } from "../services/category/Category";
import { Link } from "react-router-dom";
// import ModalCouponsComponent from "./ViewCouponsModel";

type props = {
  data: any;
  handleUpdate: any;
  handleDelete: any;
};

const TableNotifcationComponent: React.FC<props> = ({
  data,
  // handleUpdate,
  handleDelete,
}) => {
  //   const [isModal, setIsModal] = useState<any>(false);
  // const [isModal2, setIsModal2] = useState<any>(false);
  //   const [currentData, setCurrentData] = useState<any>({});
  // const [currentData2, setCurrentData2] = useState<any>({});
  console.log(handleDelete);

  const [TableData, setTableData] = useState(data?.data);
  const [showFullMessage, setShowFullMessage] = useState(false);

  const toggleMessage = () => {
    setShowFullMessage(!showFullMessage);
  };
  useEffect(() => {
    if (data?.data) {
      setTableData(data?.data);
    }
  }, [data]);

  console.log(TableData);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    console.log(handleClick);
    

    setTableData(newData);

    const res = await verifyCategoryFunction(id);
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
          <div className="d-flex flex-column gap-7 gap-lg-10">
            <div className="card">
              <table className="table table-hover p-0 m-0 table-rounded table-striped border gy-7 gs-7">
                <thead>
                  <tr className="fw-bold fs-6 text-gray-800 border-bottom-2 border-gray-200">
                    <th className="w-90px">Sr. No.</th>
                    <th className="w-150px">Subject</th>
                    <th className="w-100px">Send To</th>
                    <th>Message</th>
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
                        <td>{item?.title}</td>
                        <td>{item?.sendTo}</td>
                        <td>
                          {showFullMessage ? (
                            <>
                              {item?.message}
                              { item?.message.length > 50 && <Link to='' onClick={toggleMessage}>See less</Link>}
                              {/* <Link to='' onClick={toggleMessage}>See less</Link> */}
                            </>
                          ) : (
                            <>
                              {item?.message.slice(0, 50)}{" "}
                              {/* Display first 50 characters */}
                              {item?.message.length > 50 && "....." }{" "}
                              {/* Add ellipsis if message is longer */}
                              { item?.message.length > 50 && <Link to='' onClick={toggleMessage}>See more</Link> }
                              {/* <Link to='' onClick={toggleMessage}>See more</Link> */}
                            </>
                          )}
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
      {/* <ModalCategoryComponent
        show={isModal}
        onHide={() => setIsModal(false)}
        values={currentData}
        updateFunc={handleUpdate}
      /> */}
      {/* <ModalCouponsComponent
        show={isModal2}
        onHide={() => setIsModal2(false)}
        values={currentData2}
        updateFunc={handleUpdate}
      /> */}
    </div>
  );
};

export default TableNotifcationComponent;
