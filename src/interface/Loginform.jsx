import Button from "./Button";
import { useLogin } from "../hooks/Users/useLogin";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { FaUnlock } from "react-icons/fa";
import Spinner from "./Spinner";
import toast from "react-hot-toast";
import FormRow from "./FormRow";
import { useLoginWithOtp } from "../hooks/Users/useLoginwithOtp";

const inputStyle =
  "w-[15em] sm:w-[18em] px-5 py-1 rounded-xl text-zinc-900 dark:text-zinc-100 bg-transparent text-sm tracking-wide outline-none focus:ring-[0.5px] ring-lime-900";

function Form() {
  const { error, login, isLogging } = useLogin();
  const { loginwithEmailLink, isPending } = useLoginWithOtp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const naviagate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    if (!email && !password) {
      toast.error("enter email and password");
      return;
    }

    if (email && !password) loginwithEmailLink(email);

    if (email && password && !error) {
      login({ email, password });
      setEmail("");
      setPassword("");
    }
  }

  return (
    <div className="flex flex-col justify-center gap-4 pb-5 text-md max-h-[60vh] mt-[5em] w-[18em] sm:w-[20em] dark:bg-zinc-700/50 rounded-md font-NovaSquare text-zinc-900 dark:text-zinc-50 items-center transition-all duration-150 relative slowAndSteady shadow-md shadow-zinc-800/50">
      {(isPending || isLogging) && <Spinner />}

      <h1 className="w-[100%] text-center py-3 text-lime-900 md:text-3xl text-xl tracking-tight font-black rounded-md dark:bg-lime-400">
        Log In
      </h1>
      <form className="space-y-5 p-4" onSubmit={handleLogin}>
        <FormRow label="Email" logo={<MdEmail fill="green" />}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            placeholder="youremail@email.com"
            className={inputStyle}
          />
        </FormRow>

        <FormRow label="Password" logo={<FaUnlock fill="green" />}>
          <input
            type="password"
            placeholder="password"
            id="Email"
            className={inputStyle}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormRow>

        <p
          className="text-xs w-[100%] text-sky-900 dark:text-sky-300 text-center cursor-pointer"
          onClick={() => naviagate("/password_recovery")}
        >
          forgot password?
        </p>

        <div className="flex gap-4 items-center flex-col mt-4">
          <Button type="small" className="w-[100%]">
            Log In
          </Button>
          <Button type="secondary">Login with email</Button>
        </div>
      </form>
      <span
        onClick={() => naviagate("/signup")}
        className="text-sm font-bold cursor-pointer"
      >
        Don&apos;t have an account signUp
      </span>
    </div>
  );
}

export default Form;
