import Button from "./Button";
import { useSpring, animated, useResize } from "@react-spring/web";
import { useLogin } from "../hooks/Users/useLogin";
import { useUpdateDetails } from "../hooks/Users/useUpdateDetails";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { FaUnlock } from "react-icons/fa";
import { useSignUp } from "../hooks/Users/useSignUp";
import Spinner from "./Spinner";
import toast from "react-hot-toast";

const divStyle = "flex items-start flex-col justify-between gap-1";
const inputStyle =
  "border-[1px] w-[15em] sm:w-[18em] border-stone-900 px-5 py-1 rounded-xl outline-none border-lime-300 text-zinc-100 bg-transparent border-t-transparent border-l-transparent border-r-transparent text-sm tracking-widest";
const spanStyle = "flex justify-center gap-0 items-center relative";
const labelStyle = "w-[5em]";
const h1Style =
  "w-[100%] text-center py-3 text-lime-950 bg-lime-500 md:text-2xl text-sm tracking-wider font-bold rounded-md";

function Form({ type, buttonLabel, formFor, setIsLogin }) {
  const { SignUpWithEmailandPass, SignUpError, loadingSignUp } = useSignUp();
  const { fetchLogin, loadingLogin, loginError, LoginwithEmailandPass } =
    useLogin();
  const { updateDetails } = useUpdateDetails();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userDetails, setUserDetails] = useState("");
  const naviagate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    if (!email && !password) {
      toast.error("enter email and password");
      return;
    }

    if (email && !password) fetchLogin(email);
    if (email && password && !loginError) {
      LoginwithEmailandPass(email, password);
    }
  }

  function handleSignUp(e) {
    e.preventDefault();
    if (!email && !password && !SignUpError) return;

    console.log(email, password);
    SignUpWithEmailandPass(email, password);
  }

  function handleUserDetails(e) {
    e.preventDefault();
    if (!userDetails) return;

    updateDetails(userDetails);
    naviagate("/user");
  }

  return (
    <>
      {(loadingLogin || loadingSignUp) && <Spinner />}

      <form
        onSubmit={(e) => {
          if (formFor === "login") {
            handleLogin(e);
          }
          if (formFor === "userDetails") {
            handleUserDetails(e);
          }
          if (formFor === "signUp") {
            handleSignUp(e);
          }
        }}
        className="flex flex-col justify-center gap-4 px-0 pt-0 pb-5  text-md max-h-[60vh] mt-[5em] w-[18em] sm:w-[20em] border-[1px] border-lime-400/60 rounded-md bg-zinc-700/50 font-NovaSquare text-zinc-50 items-center transition-all duration-150 relative slowAndSteady"
      >
        {type === "userDetails" && (
          <>
            <div className={divStyle}>
              <label htmlFor="" id="username">
                Username
              </label>

              <input
                value={userDetails}
                onChange={(e) => setUserDetails(e.target.value)}
                type="text"
                id="username"
                placeholder="full name"
                className={inputStyle}
              />
            </div>
            <Button type="small">{buttonLabel}</Button>
          </>
        )}
        {type === "login" && (
          <>
            <h1 className={h1Style}>Login</h1>
            <div className={divStyle}>
              <label htmlFor="email" id="email" className={labelStyle}>
                Email
              </label>
              <span className={spanStyle}>
                <span className="absolute left-0">
                  <MdEmail fill="silver" />
                </span>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  id="email"
                  placeholder="youremail@email.com"
                  className={inputStyle}
                />
              </span>
            </div>
            <div className={divStyle}>
              <label htmlFor="password" id="password" className={labelStyle}>
                Password
              </label>
              <span className={spanStyle}>
                <span className="absolute left-0">
                  <FaUnlock fill="silver" />
                </span>
                <input
                  placeholder="password"
                  className={inputStyle}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <span
                  className="absolute text-xs text-sky-400 right-0 bottom-[-80%] cursor-pointer"
                  onClick={() => naviagate("/password_recovery")}
                >
                  forgot password
                </span>
              </span>
            </div>
            <div className="flex gap-4 items-center sm:flex-row flex-col mt-4">
              <Button type="secondary">Login with email</Button>
              <Button type="small">{buttonLabel}</Button>
            </div>
            <span
              onClick={() => setIsLogin((current) => !current)}
              className="text-sm text-lime-200 cursor-pointer"
            >
              Don&apos;t have an account signUp
            </span>
          </>
        )}
        {type === "signUp" && (
          <>
            <h1 className={h1Style}>Sign Up</h1>
            <div className>
              <label id="email" className="w-[5em]">
                Email
              </label>
              <span className={spanStyle}>
                <span className="absolute left-0">
                  <MdEmail fill="silver" />
                </span>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="youremail@email.com"
                  className={inputStyle}
                />
              </span>
            </div>
            <div>
              <label id="password" className="w-[5em]">
                Password
              </label>
              <span className={spanStyle}>
                <span className="absolute left-0">
                  <FaUnlock fill="silver" />
                </span>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="password"
                  className={inputStyle}
                />
              </span>
            </div>
            <div className="flex gap-4 items-center sm:flex-row flex-col">
              <Button type="secondary">sign up with email</Button>
              <Button type="small">Sign Up</Button>
            </div>
            <span
              onClick={() => setIsLogin((current) => !current)}
              className="text-sm text-lime-200 cursor-pointer"
            >
              Already have an account? Log In !
            </span>
          </>
        )}
      </form>
    </>
  );
}

export default Form;
