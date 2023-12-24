import Logo from "../interface/Logo";
import Login from "../interface/Login";

function LoginRoute() {
  // const navigate = useNavigate();
  // useEffect(
  //   function () {
  //     const data = JSON.parse(
  //       localStorage.getItem("sb-vozbqbvaultodqeuimqv-auth-token")
  //     );
  //     if (!data) return;
  //     if (data) {
  //       navigate("/user");
  //     }
  //   },
  //   [navigate]
  // );
  return (
    <div className="bg-zinc-800 text-zinc-100 remove-scroll-edge min-h-screen flex flex-col items-center">
      <Logo />
      <Login />
    </div>
  );
}

export default LoginRoute;
