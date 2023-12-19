import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAvatar } from "../../supabase/supabaseAPI";
import { useCurrentUser } from "./useCurrentUser";

export function useUpdateProfileImage() {
  const currentUser = useCurrentUser();
  const clientQuery = useQueryClient();
  const { mutate: changeImage } = useMutation({
    mutationFn: (image) => updateAvatar(image, currentUser),
    retry: false,
    onSuccess: () => {
      clientQuery.invalidateQueries({ active: true });
    },
  });
  return { changeImage };
}
