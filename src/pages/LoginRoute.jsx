import Logo from "../interface/Logo";
import LoginForm from "../interface/Loginform";

function LoginRoute() {
  return (
    <div className="bg-zinc-800 text-zinc-100 remove-scroll-edge min-h-screen flex flex-col items-center">
      <Logo />
      <LoginForm />
    </div>
  );
}

export default LoginRoute;
