import { useNavigate } from "react-router-dom";
import supabase from "../../supabase/supabase";

export function useLogout() {
  const navigate = useNavigate();
  async function userLogout() {
    let { error } = await supabase.auth.signOut();
    if (!error) navigate("/login");
  }
  return { userLogout };
}
