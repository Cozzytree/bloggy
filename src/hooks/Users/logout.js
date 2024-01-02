import { useNavigate } from "react-router-dom";
// import { logOut } from "../../supabase/supabaseAPI";
import authService from "../../supabase/supabase.auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useLogout() {
  const logout = authService.logout;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    mutate: userLogout,
    isPending: isLoggingOut,
    error,
  } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      navigate("/login");
      queryClient.clear();
    },
    onError: () => {
      toast.error(error.message);
    },
  });

  return { userLogout, isLoggingOut };
}
