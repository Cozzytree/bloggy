import Button from "../interface/Button";
import { useChangePassword } from "../hooks/Users/useChangePassword";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormRow from "../interface/FormRow";
import Logo from "../interface/Logo";
import { FaKey } from "react-icons/fa6";

const inputStyle =
  "w-[15em] sm:w-[18em] px-5 py-1 rounded-xl text-zinc-900 dark:text-zinc-100 bg-transparent text-sm tracking-wide outline-none focus:ring-[0.5px] ring-lime-900";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { isPending, updatePassword, error } = useChangePassword();
  const navigate = useNavigate();

  function handleChangePass(e) {
    e.preventDefault();
    if ((!password || !confirmPassword) && password !== confirmPassword) return;

    updatePassword(password);
    if (!error) navigate("/user");
  }
  return (
    <div className="dark:bg-zinc-800 bg-zinc-300 dark:text-zinc-100 remove-scroll-edge min-h-screen flex flex-col items-center">
      <Logo />

      <form
        className="text-zinc-100 font-NovaSquare flex flex-col mt-[5em] gap-4 w-[20em] items-center dark:bg-zinc-700/70 bg-zinc-200 py-4 px-5 rounded-md shadow-md shadow-zinc-700/60"
        action=""
        onSubmit={handleChangePass}
      >
        <h1 className="w-[100%] text-center py-3 text-lime-900 md:text-3xl text-xl tracking-tight font-black rounded-md dark:bg-lime-400">
          Change Password
        </h1>
        <FormRow label="New Password" logo={<FaKey fill="green" />}>
          <input
            type="password"
            placeholder="new password"
            className={inputStyle}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormRow>
        <FormRow label="Confirm password" logo={<FaKey fill="green" />}>
          <input
            value={confirmPassword}
            className={inputStyle}
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="confirm password"
          />
        </FormRow>
        <Button type="small" disabled={isPending}>
          Confirm
        </Button>
      </form>
    </div>
  );
}

export default ResetPassword;
