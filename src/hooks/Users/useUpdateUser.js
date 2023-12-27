import { useMutation } from "@tanstack/react-query";
import { updateUser } from "../../supabase/supabaseAPI";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const {
    mutate: userUpdate,
    error,
    isPending: isUpdating,
  } = useMutation({
    mutationFn: ({ full_name, avatar_url }) =>
      updateUser({ full_name, avatar_url }),
    onSuccess: () => {
      toast.success("Successfully Updated");
    },
    onError: () => {
      toast.error(error.message);
    },
  });
  return { userUpdate, isUpdating };
}
