/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import { FC } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { App } from "../App";
import { AuthPage, Logout, useAuth } from "../modules/auth";
import { ErrorsPage } from "../modules/errors/ErrorsPage";
import { PrivateRoutes } from "./PrivateRoutes";
import ViewRestaurantPage from "../pages/customPages/Restaurant/ViewRestaurant";
import PrivacyandPolicy from "../components/PrivacyandPolicy";
import AboutUs from "../components/AboutUs";
import TermsConditions from "../components/TermsConditions";
import HelpSupport from "../components/HelpSupport";

/**
 * Base URL of the website.
 *
 * @see https://facebook.github.io/create-react-app/docs/using-the-public-folder
 */
const { BASE_URL } = import.meta.env;

const AppRoutes: FC = () => {
  const { currentUser } = useAuth();
  console.log("currentUser", currentUser);
  return (
    <BrowserRouter basename={BASE_URL}>
      <Routes>
        <Route element={<App />}>
          <Route path="/privacy-policy" element={<PrivacyandPolicy />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/help-support" element={<HelpSupport />} />
          <Route path="error/*" element={<ErrorsPage />} />
          <Route path="logout" element={<Logout />} />
          {currentUser ? (
            currentUser?.data?.type === "Restaurant" &&
            currentUser?.data?._id ? (
              <>
                <Route
                  path={`/restaurant/view/${currentUser?.data?._id}`}
                  element={<ViewRestaurantPage />}
                />
                <Route
                  path="/"
                  element={
                    <Navigate
                      to={`/restaurant/view/${currentUser?.data?._id}`}
                    />
                  }
                />
                <Route
                  path="*"
                  element={
                    <Navigate
                      to={`/restaurant/view/${currentUser?.data?._id}`}
                    />
                  }
                />
              </>
            ) : (
              <>
                <Route path="/*" element={<PrivateRoutes />} />
                <Route index element={<Navigate to="/dashboard" />} />
              </>
            )
          ) : (
            <>
              <Route path="auth/*" element={<AuthPage />} />
              <Route path="*" element={<Navigate to="/auth" />} />
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export { AppRoutes };
