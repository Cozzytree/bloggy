import toast from "react-hot-toast";
import authService from "../../supabase/supabase.auth";

import { useMutation } from "@tanstack/react-query";

export function useChangePassword() {
  const { changePassword } = authService;

  const {
    error,
    isPending,
    mutate: updatePassword,
  } = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      toast.success("password updated successfullt");
    },
    onError: () => {
      toast.error(error.message);
    },
  });

  return { isPending, updatePassword, error };
}
