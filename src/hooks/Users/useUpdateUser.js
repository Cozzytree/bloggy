import { useMutation, useQueryClient } from "@tanstack/react-query";
import authService from "../../supabase/supabase.auth";
import toast from "react-hot-toast";
import { useCurrentUser } from "./useCurrentUser";

export function useUpdateUser() {
  const { updateUser } = authService;
  const currentUser = useCurrentUser();
  const queryClient = useQueryClient();
  const {
    mutate: userUpdate,
    error,
    isPending: isUpdating,
  } = useMutation({
    mutationFn: ({ full_name, avatar_url }) =>
      updateUser({ full_name, avatar_url, id: currentUser }),
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
