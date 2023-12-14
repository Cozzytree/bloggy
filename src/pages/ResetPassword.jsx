import Button from "../interface/Button";
import { useChangePassword } from "../hooks/Users/useChangePassword";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const inputStyle =
  "w-[15em] rounded-md px-3 py-[2px] text-zinc-900 outline-none focus:ring-[1px] ring-lime-500";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { resetPassword, err } = useChangePassword();
  const navigate = useNavigate();

  function handleChangePass(e) {
    e.preventDefault();
    if ((!password || !confirmPassword) && password !== confirmPassword) return;

    resetPassword(password);
    if (!err) navigate("/user");
  }
  return (
    <>
      <form
        className="text-zinc-100 font-NovaSquare flex flex-col mt-[5em] gap-4 w-[20em] items-center bg-zinc-700/70 py-4 px-5 rounded-md shadow-md shadow-zinc-600/60"
        action=""
        onSubmit={handleChangePass}
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="passwword">New Password</label>
          <input
            value={password}
            className={inputStyle}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="passwword">Confirm Password</label>
          <input
            value={confirmPassword}
            className={inputStyle}
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <Button type="small">Confirm</Button>
      </form>
    </>
  );
}

export default ResetPassword;
