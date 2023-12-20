import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeUsername } from "../../supabase/supabaseAPI";
import toast from "react-hot-toast";
import { useCurrentUser } from "./useCurrentUser";

export function useChangeUsername() {
  const CurrentUser = useCurrentUser();
  const queryClient = useQueryClient();
  const {
    mutate: newName,
    error,
    isPending,
  } = useMutation({
    mutationFn: (name) => changeUsername(name, CurrentUser),
    onSuccess: () => {
      queryClient.invalidateQueries({ active: true });
      toast.success("usernamed updated");
    },
    onError: () => {
      toast.error(error.message);
    },
  });
  return { newName, error, isPending };
}
