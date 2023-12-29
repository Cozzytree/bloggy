import Button from "./Button";
import { useLogin } from "../hooks/Users/useLogin";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { FaUnlock } from "react-icons/fa";
import Spinner from "./Spinner";
import toast from "react-hot-toast";
import FormRow from "./FormRow";

const inputStyle =
  "border-[1px] w-[15em] sm:w-[18em] border-stone-900 px-5 py-1 rounded-xl outline-none border-lime-300 text-zinc-100 bg-transparent border-t-transparent border-l-transparent border-r-transparent text-sm tracking-widest";

function Form() {
  const { fetchLogin, loadingLogin, loginError, login, isLogging } = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const naviagate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    if (!email && !password) {
      toast.error("enter email and password");
      return;
    }

    if (email && !password) fetchLogin(email);
    if (email && password && !loginError) {
      login({ email, password });
      setEmail("");
      setPassword("");
    }
  }

  return (
    <div className="flex flex-col justify-center gap-4 pb-5 text-md max-h-[60vh] mt-[5em] w-[18em] sm:w-[20em] border-[1px] border-lime-400/60 rounded-md bg-zinc-700/50 font-NovaSquare text-zinc-50 items-center transition-all duration-150 relative slowAndSteady">
      {(loadingLogin || isLogging) && <Spinner />}

      <h1 className="w-[100%] text-center py-3 text-lime-950 bg-lime-500 md:text-2xl text-sm tracking-wider font-bold rounded-md">
        Log In
      </h1>
      <form className="space-y-5 p-4" onSubmit={handleLogin}>
        <FormRow label="Email" logo={<MdEmail fill="silver" />}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            placeholder="youremail@email.com"
            className={inputStyle}
          />
        </FormRow>

        <FormRow label="Password" logo={<FaUnlock fill="silver" />}>
          <input
            type="password"
            placeholder="password"
            id="Email"
            className={inputStyle}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormRow>

        <span
          className="text-xs text-sky-400 right-0 bottom-[-80%] cursor-pointer"
          onClick={() => naviagate("/password_recovery")}
        >
          forgot password
        </span>

        <div className="flex gap-4 items-center sm:flex-row flex-col mt-4">
          <Button type="secondary">Login with email</Button>
          <Button type="small">Log In</Button>
        </div>
      </form>
      <span
        onClick={() => naviagate("/signup")}
        className="text-sm text-lime-200 cursor-pointer"
      >
        Don&apos;t have an account signUp
      </span>
    </div>
  );
}

export default Form;
