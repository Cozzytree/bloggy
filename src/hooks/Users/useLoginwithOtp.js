import { useMutation } from "@tanstack/react-query";
import authService from "../../supabase/supabase.auth";
import toast from "react-hot-toast";

export function useLoginWithOtp() {
  const { loginWithEmail } = authService;
  const {
    mutate: loginwithEmailLink,
    error,
    isPending,
  } = useMutation({
    mutationFn: (email) => loginWithEmail(email),
    onSuccess: () => {
      toast.success("Check your email");
    },
    onError: () => {
      toast.error(error.message);
    },
  });
  return { loginwithEmailLink, isPending };
}
