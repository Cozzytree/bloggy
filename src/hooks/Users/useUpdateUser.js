import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../../supabase/supabaseAPI";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const {
    mutate: userUpdate,
    error,
    isPending: isUpdating,
  } = useMutation({
    mutationFn: ({ full_name, avatar_url }) =>
      updateUser({ full_name, avatar_url }),
    onSuccess: () => {
      toast.success("Successfully Updated");
      queryClient.invalidateQueries(["getCurrentUser"]);
    },
    onError: () => {
      toast.error(error.message);
    },
  });
  return { userUpdate, isUpdating };
}
