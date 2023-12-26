import { useState } from "react";
import supabase from "../../supabase/supabase";
import toast from "react-hot-toast";
import { login as withPassword } from "../../supabase/supabaseAPI";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useLogin() {
  const [loadingLogin, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const queryClent = useQueryClient();

  async function fetchLogin(email) {
    try {
      setIsLoading(true);
      let { data, error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          emailRedirectTo: "https://localhost:5173/user",
        },
      });

      if (error) throw new Error(error.message);

      if (data) {
        toast.success("ckeck your email");
      }
    } catch (err) {
      setLoginError(err.message);
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  //* LOGIN WITH EMAIL AND PASSWORD
  const {
    error,
    isPending: isLogging,
    mutate: login,
  } = useMutation({
    mutationFn: ({ email, password }) => withPassword({ email, password }),
    onSuccess: (user) => {
      queryClent.setQueryData(["getCurrentUser"], user.user);
      navigate("/user", { replace: true });
    },
    onError: () => {
      toast.error(error.message);
    },
  });
  return { fetchLogin, loadingLogin, loginError, login, isLogging };
}
