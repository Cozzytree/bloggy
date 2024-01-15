// import { useState } from "react";
// import supabase from "../../supabase/supabase";
import toast from "react-hot-toast";
// import { login as withPassword } from "../../supabase/supabaseAPI";
import authService from "../../supabase/supabase.auth";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useLogin() {
  const navigate = useNavigate();
  const queryClent = useQueryClient();
  const { login: loginApi } = authService;
  //* LOGIN WITH EMAIL AND PASSWORD
  const {
    error,
    isPending: isLogging,
    mutate: login,
  } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClent.setQueryData(["getCurrentUser"], user.user);
      navigate("/user", { replace: true });
    },
    onError: () => {
      toast.error(error.message);
    },
  });
  return { login, isLogging, error };
}
