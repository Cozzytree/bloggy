import Logo from "../interface/Logo";
import SignUp from "../interface/SignUp";

function SignUpPage() {
  return (
    <div className="bg-zinc-100 dark:bg-zinc-800 text-zinc-100 remove-scroll-edge min-h-screen flex flex-col items-center">
      <Logo />
      <SignUp />
    </div>
  );
}

export default SignUpPage;
