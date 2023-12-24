import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { Suspense, lazy } from "react";

import AppLayout from "./interface/AppLayout";
import SendRecovery from "./interface/SendRecovery";
import Comment from "./interface/Comment";
import ProtectedRoute from "./interface/ProtectedRoute";
import Spinner from "./interface/Spinner";
// import UserInformation from "./pages/UserInformation";
// import User from "./pages/User";
// import UsersPosts from "./pages/UsersPosts";
// import ResetPassword from "./pages/ResetPassword";
// import Search from "./pages/Search";
// import ForeighUser from "./pages/ForeighUser";
// import LoginRoute from "./pages/LoginRoute";

const UserInformation = lazy(() => import("./pages/UserInformation"));
const User = lazy(() => import("./pages/User"));
const UsersPosts = lazy(() => import("./pages/UsersPosts"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const ForeighUser = lazy(() => import("./pages/ForeighUser"));
const Search = lazy(() => import("./pages/Search"));
const LoginRoute = lazy(() => import("./pages/LoginRoute"));

const queryclient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 0 },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryclient}>
      <BrowserRouter>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="user" />} />
              <Route path="user" element={<User />} />
              <Route path="home" element={<UsersPosts />} />
              <Route path="details" element={<UserInformation />} />
              <Route path="search" element={<Search />} />
              <Route path="search/:userId" element={<ForeighUser />} />
              <Route path="comments/:commentId" element={<Comment />} />
            </Route>

            <Route path="login" element={<LoginRoute />} />
            <Route path="reset_password" element={<ResetPassword />} />
            <Route path="password_recovery" element={<SendRecovery />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={20}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: { duration: 5000 },
          error: { duration: 5000 },
          style: {
            padding: "10px",
            maxWidth: "500px",
            backgroundColor: "black",
            color: "white",
          },
        }}
      />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
