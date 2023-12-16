export function useCurrentUser() {
  const currentUser = JSON.parse(
    localStorage.getItem("sb-vozbqbvaultodqeuimqv-auth-token")
  );

  return currentUser?.user.id;
}
