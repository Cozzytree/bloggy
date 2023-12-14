import toast from "react-hot-toast";
import supabase from "../../supabase/supabase";

export function useRecover() {
  async function recoverPassword(email) {
    let { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:5173/reset_password",
    });

    if (error) {
      console.log(error);
      throw new Error(error.message);
    }
    if (!error) toast("check your email");

    return data;
  }

  return { recoverPassword };
}
