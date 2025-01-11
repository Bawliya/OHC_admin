import { FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { toAbsoluteUrl } from "../../../_metronic/helpers";
import { Content } from "../../../_metronic/layout/components/content";
import { ToolbarWrapper } from "../../../_metronic/layout/components/toolbar";
import { PageTitle } from "../../../_metronic/layout/core";
import { getDashboardDataFunction } from "../../services/Dashboard/Dashboard";
import { Link } from "react-router-dom";
import user_icon from "../../../../public/media/logos/user_icon.svg";
import pet_icon from "../../../../public/media/logos/pet_icon.svg";
import pet_breed_icon from "../../../../public/media/logos/pet_breed_icon.svg";
import pet_v_icon from "../../../../public/media/logos/pet_v_icon.svg";
interface MyComponentProps {
  data: any;
}

const DashboardPage: FC<MyComponentProps> = ({ data }) => (
  <>
    <ToolbarWrapper />
    <Content>
      <div className="row">
        <div className="col-md-4">
          <Link to="/customers">
            <div className="card py-15 border-2 px-12">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-3 ">
                  <img width={40} src={user_icon} alt="user_icon" />
                  <h2 className="mb-0">Total User</h2>
                </div>
                <h5 className="mb-0 mt-2">{data?.users}</h5>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-4 mt-6 mt-md-0">
          <Link to="/customers">
            <div className="card py-15 border-2 px-12">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-4">
                  <img width={40} src={pet_icon} alt="user_icon" />
                  <h2 className="mb-0">Total Labs</h2>
                </div>
                <h5 className="mb-0 mt-2">{data?.lab_test_doctor}</h5>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-4 mt-6 mt-md-0">
          <Link to="/customers">
            <div className="card py-15 border-2 px-12">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-3 ">
                  <img width={40} src={pet_breed_icon} alt="user_icon" />
                  <h2 className="mb-0">Total Pharmacy</h2>
                </div>
                <h5 className="mb-0 mt-2">{data?.pharmacy_clinic}</h5>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-4 mt-6">
          <Link to="/customers">
            <div className="card py-15 border-2 px-12">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-3 ">
                  <img width={40} src={pet_v_icon} alt="user_icon" />
                  <h2 className="mb-0">Total Order</h2>
                </div>
                <h5 className="mb-0 mt-2">{data?.order}</h5>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div className="row mt-10">
        <div className="col-md-12">
          <h2 className="mb-3">Latest 10 Users</h2>
          <div className="table-responsive card">
            <table className="table table-hover  p-0 m-0 table-rounded  border gy-7 gs-7">
              <thead>
                <tr className="fw-bold fs-6 text-gray-800 border-bottom-2 border-gray-200">
                  <th className="text-nowrap">No. </th>
                  <th className="text-nowrap">Name</th>
                  <th className="text-nowrap">Email</th>
                  <th className="text-nowrap">Whatsapp Number</th>
                  <th className="text-nowrap">Verified</th>
                </tr>
              </thead>
              <tbody>
                {data?.latest_user?.length > 0 ? (
                  data?.latest_user?.map((item: any, i: any) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{item.fullName || "N/A"}</td>
                      <td>{item.email || "N/A"}</td>
                      <td>{item.whatsapp_number || "N/A"}</td>
                      <td>{item.verify ? "Yes" : "No"}</td>
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
    </Content>
  </>
);

const DashboardWrapper: FC = () => {
  const intl = useIntl();
  const [DashboardData, setDashboardData] = useState<any>();

  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    throw new Error("Local data not found");
  }

  const role = JSON.parse(localData).data;
  console.log("role", role);

  useEffect(() => {
    getDashboard();
  }, []);

  const getDashboard = async () => {
    const res = await getDashboardDataFunction();
    console.log(res?.data.data);
    setDashboardData(res?.data?.data);
  };

  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({ id: "MENU.DASHBOARD" })}
      </PageTitle>
      {role.type === "Admin" ? (
        <DashboardPage data={DashboardData} />
      ) : (
        <h1 className="align-self-center mt-5">Do Not Use Dashboard</h1>
      )}
      {/* <DashboardPage /> */}
    </>
  );
};

export { DashboardWrapper };
