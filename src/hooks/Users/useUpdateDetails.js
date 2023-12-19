import supabase from "../../supabase/supabase";

export function useUpdateDetails() {
  async function updateDetails(username) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

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
