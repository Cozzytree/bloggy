import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../../supabase/supabaseAPI";

export function useSignUp() {
  const {
    mutate: signUp,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ email, password, full_name, avatar_url }) =>
      signUpApi({ email, password, full_name, avatar_url }),
    onSuccess: () => {
      toast.success("Account successfully created Confirm your email");
    },
    onError: () => {
      toast.error(error.message);
    },
  });

  return { signUp, isPending };
}
