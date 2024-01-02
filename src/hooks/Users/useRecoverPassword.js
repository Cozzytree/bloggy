import toast from "react-hot-toast";
import authService from "../../supabase/supabase.auth";
import { useMutation } from "@tanstack/react-query";

export function useRecover() {
  const { sendNewPassword } = authService;
  const {
    error,
    mutate: recoverPassword,
    isPending,
  } = useMutation({
    mutationFn: sendNewPassword,
    onSuccess: () => {
      toast.success("Ckech your email");
    },
    onError: () => {
      toast.error(error.message);
    },
  });
  return { recoverPassword, isPending };
}
