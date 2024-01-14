import Logo from "../interface/Logo";
import LoginForm from "../interface/Loginform";

function LoginRoute() {
  return (
    <div className="dark:bg-zinc-800 flex bg-zinc-300 flex-col items-center remove-scroll-edge h-screen ">
      <Logo />
      <LoginForm />
    </div>
  );
}

export default LoginRoute;
