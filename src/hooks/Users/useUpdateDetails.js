import { useNavigate } from "react-router-dom";
import supabase from "../../supabase/supabase";

export function useUpdateDetails() {
  const navigate = useNavigate();
  async function updateDetails(username) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    console.log(user);

    const { data, error } = await supabase
      .from("profiles")
      .update({ username: username })
      .eq("id", user.id)
      .single();

    if (data) {
      console.log(data);
    }

    if (error) console.log(error);
  }
  return { updateDetails };
}
