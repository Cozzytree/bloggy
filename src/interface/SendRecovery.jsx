import { useState } from "react";
import { useRecover } from "../hooks/Users/useRecoverPassword";
import Button from "./Button";

function SendRecovery() {
  const { recoverPassword } = useRecover();
  const [email, setEmail] = useState("");

  function handleRecover(e) {
    e.preventDefault();
    if (!email) return;
    recoverPassword(email);
  }
  return (
    <div className="bg-zinc-800 text-zinc-100 remove-scroll-edge min-h-screen flex flex-col items-center">
      <form
        onSubmit={handleRecover}
        className="text-zinc-50 font-NovaSquare flex flex-col items-center mt-[5em] gap-[1em] bg-zinc-700/80 py-5 px-5 rounded-md shadow-md shadow-zinc-700 border-[1px] border-zinc-700 w-[25em]"
      >
        <label htmlFor="email">Email</label>
        <input
          className="px-5 py-[4px] outline-none rounded-md text-zinc-900 focus:ring-[2px] ring-lime-600"
          type="email"
          placeholder="youremail@email.com"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          type="small"
          className="py-5 w-auto flex justify-center items-center px-5"
        >
          change password
        </Button>
      </form>
    </div>
  );
}

export default SendRecovery;
