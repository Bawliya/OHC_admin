// import {lazy, FC, Suspense} from 'react'
import { Navigate, Route, Routes } from "react-router-dom";
import { MasterLayout } from "../../_metronic/layout/MasterLayout";
import AddBannerPage from "../pages/customPages/Banner/AddBannerPage";
import BannerTablePage from "../pages/customPages/Banner/BannerTablePage";
import AddBrowsePage from "../pages/customPages/Browse/AddBrowse";
import BrowseTablePage from "../pages/customPages/Browse/BrowseTable";
import AddCategoryPage from "../pages/customPages/Category/AddCategory";
import CategoryTablePage from "../pages/customPages/Category/CategoryTable";
import AddRestaurantPage from "../pages/customPages/Restaurant/AddRestaurant";
import RestaurantTablePage from "../pages/customPages/Restaurant/RestaurantTable";
import ViewRestaurantPage from "../pages/customPages/Restaurant/ViewRestaurant";
import { DashboardWrapper } from "../pages/dashboard/DashboardWrapper";
import ViewDeliveryBoyPage from "../pages/customPages/DeliveryBoy/DeliveryBoyList";
// import AccountPage from '../components/accounts/AccountPage';
import { AccountHeader } from "../modules/accounts/AccountHeader";
import AddCouponsPage from "../pages/customPages/Coupons/AddCoupons";
import CustomersTablePage from "../pages/customPages/Table/CustomersTable";
import OrdersTablePage from "../pages/customPages/Table/OrderTable";
import CouponsTablePage from "../pages/customPages/Coupons/CouponsTable";
// import Add404Page from "../pages/customPages/Setting/page404";
import PrivacyPolicyView from "../pages/customPages/WebViews/Privacy";
import WithdrawlTablePage from "../pages/customPages/WithdrawlRequest.tsx/WithdrawlRequestList";
import ConductionPages from "../pages/customPages/WebViews/Conductionss";
// import ReportPage from "../pages/customPages/Report/Report";
import ImagePage from "../pages/customPages/Restaurant/Image";
import ImageTablePage from "../pages/customPages/Restaurant/ImageTable";
import ViewBranch from "../pages/customPages/Restaurant/ViewBranch";
import ZoonPage from "../pages/customPages/Zoon/AddZoon";
// import ReportCreditPage from "../pages/customPages/Report/CreditBalance";
import ZoonTable from "../pages/customPages/Zoon/ZoonTable";
import DispatchPage from "../pages/customPages/DispatchSystem/DispatchPage";
import PrivacyandPolicy from "../components/PrivacyandPolicy";
import AboutUs from "../components/AboutUs";
import TermsConditions from "../components/TermsConditions";
import AddVaccine from "../pages/customPages/Category/AddVaccine";
import VaccineTable from "../pages/customPages/Category/VaccineTable";
import SortVideoTable from "../pages/customPages/Restaurant/SortVideoTable";
import SortVideoTableComponent from "../components/SortVideoTableComponent";
import SortVideo from "../pages/customPages/Restaurant/SortVideo";
import Notification from "../components/Notification";
import AvatarViwe from "../components/AvatarViwe";
import AddAvatar from "../components/AddAvatar";
import NotificationViwe from "../components/NotificationViwe";
// import AddVaccineType from "../../app/components/AddVaccineType";

const PrivateRoutes = () => {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const role = JSON.parse(localData).data;
  console.log("role", role);

  const roleArray = role?.role?.roleArray;
  console.log(roleArray);

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path="auth/*" element={<Navigate to="/dashboard" />} />
        <Route path="banner/add" element={<AddBannerPage />} />
        <Route path="banner/view" element={<BannerTablePage />} />
        <Route path="/category/add" element={<AddCategoryPage />} />
        <Route path="/category/view" element={<CategoryTablePage />} />

        {/* ---- */}
        <Route path="dashboard" element={<DashboardWrapper />} />
        <Route path="/dispatch-management" element={<DispatchPage />} />
        <Route path="/zone-management/view" element={<ZoonTable />} />
        <Route path="/zone-management/add" element={<ZoonPage />} />
        <Route path="/image/view" element={<ImageTablePage />} />
        <Route path="/image/add" element={<ImagePage />} />
        <Route path="/sort/video/view" element={<SortVideoTable />} />
        <Route path="/sort-video" element={<SortVideo />} />
        <Route path="/withdrawal" element={<WithdrawlTablePage />} />
        <Route path="/coupons/view" element={<CouponsTablePage />} />
        <Route path="/coupons/add" element={<AddCouponsPage />} />
        <Route path="/orders" element={<OrdersTablePage />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/order" element={<NotificationViwe />} />
        <Route path="/customers" element={<CustomersTablePage />} />
        <Route path="/delivery_boy/details" element={<AccountHeader />} />
        <Route path="/delivery_boy" element={<ViewDeliveryBoyPage />} />
        <Route path="/business/view" element={<RestaurantTablePage />} />
        <Route path="/business/add" element={<AddRestaurantPage />} />
        <Route path="/browse/view" element={<BrowseTablePage />} />
        <Route path="/vaccine/view" element={<VaccineTable />} />
        <Route path="/browse/add" element={<AddBrowsePage />} />
        <Route path="/vaccine/add" element={<AddVaccine />} />
        <Route path="/avater/view" element={<AvatarViwe />} />
        <Route path="/avater/add" element={<AddAvatar />} />
      </Route>
      <Route path="restaurant/view/:id" element={<ViewRestaurantPage />} />
      <Route path="branch/view/:id" element={<ViewBranch />} />
      {/* <Route path="*" element={<Add404Page />} /> */}
      <Route path="/privacy-policy" element={<PrivacyPolicyView />} />
      <Route path="/term-conditions" element={<ConductionPages />} />
    </Routes>
  );
};

export { PrivateRoutes };
