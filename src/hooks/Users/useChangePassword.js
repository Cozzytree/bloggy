import toast from "react-hot-toast";
import supabase from "../../supabase/supabase";
import { useState } from "react";

export function useChangePassword() {
  const [err, setError] = useState("");
  async function resetPassword(password) {
    try {
      setError("");
      const { error } = await supabase.auth.updateUser({ password: password });
      if (error) {
        setError(error.message);
        toast.error(error.message);
      }
    } catch (err) {
      setError(err.message);
    }
  }

  return { resetPassword, err };
}
