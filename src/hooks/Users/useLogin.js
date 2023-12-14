import { useState } from "react";
import supabase from "../../supabase/supabase";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const [loadingLogin, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  async function fetchLogin(email) {
    try {
      setIsLoading(true);
      let { data, error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          emailRedirectTo: "http://localhost:5173/user",
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
  async function LoginwithEmailandPass(email, password) {
    try {
      setIsLoading(true);
      let { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) throw new Error(error.message);
      if (!error) navigate("/user");
    } catch (error) {
      setLoginError(error.mesage);
    } finally {
      setIsLoading(false);
    }
  }

  return { fetchLogin, loadingLogin, loginError, LoginwithEmailandPass };
}
