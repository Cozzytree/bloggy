import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import AppLayout from "./interface/AppLayout";
import UserInformation from "./pages/UserInformation";
import User from "./pages/User";
import UsersPosts from "./pages/UsersPosts";
import SendRecovery from "./interface/SendRecovery";
import ResetPassword from "./pages/ResetPassword";
import Search from "./pages/Search";
import ForeighUser from "./pages/ForeighUser";
import Comment from "./interface/Comment";
import LoginRoute from "./pages/LoginRoute";
import ProtectedRoute from "./interface/ProtectedRoute";

const queryclient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 0 },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryclient}>
      <BrowserRouter>
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
