import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import AppLayout from "./interface/AppLayout";
import UserInformation from "./pages/UserInformation";
import User from "./pages/User";
import Homepage from "./pages/Homepage";
import UsersPosts from "./pages/UsersPosts";
import SendRecovery from "./interface/SendRecovery";
import ResetPassword from "./pages/ResetPassword";

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
          <Route element={<AppLayout />}>
            <Route index element={<Navigate to="login" />} />

            <Route path="login" element={<Homepage />} />

            <Route path="home" element={<UsersPosts />} />

            <Route path="details" element={<UserInformation />} />

            <Route path="user" element={<User />} />

            <Route path="password_recovery" element={<SendRecovery />} />

            <Route path="reset_password" element={<ResetPassword />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={20}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: { duration: 8000 },
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
