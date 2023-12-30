import Logo from "../interface/Logo";
import LoginForm from "../interface/Loginform";
import Greeting from "../interface/Greeting";

function LoginRoute() {
  return (
    <div className="dark:bg-zinc-800 flex flex-col justify-start remove-scroll-edge h-screen ">
      <Logo />
      <div className="flex flex-col md:flex-row items-center justify-center my-3 mx-10 py-5 px-10 bg-zinc-400/20 dark:bg-zinc-700/20 rounded-md min-h-[80vh] gap-5">
        <Greeting />
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginRoute;
