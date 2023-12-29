import { useNavigate } from "react-router-dom";
import { logOut } from "../../supabase/supabaseAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    mutate: userLogout,
    isPending: isLoggingOut,
    error,
  } = useMutation({
    mutationFn: logOut,
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
