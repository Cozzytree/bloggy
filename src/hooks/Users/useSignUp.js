import { useState } from "react";
import supabase from "../../supabase/supabase";
import toast from "react-hot-toast";

export function useSignUp() {
  const [loadingSignUp, setIsLoading] = useState(false);
  const [SignUpError, setError] = useState("");

  async function SignUpWithEmailandPass(email, password) {
    try {
      setIsLoading(true);
      let { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          emailRedirectTo: "http://localhost:5173/details",
        },
      });
      if (error) toast.error(error.message);

      if (data) toast.success("Check Your email");
      return data;
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return { loadingSignUp, SignUpError, SignUpWithEmailandPass };
}
