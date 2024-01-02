import { useState } from "react";
import { useRecover } from "../hooks/Users/useRecoverPassword";
import Button from "./Button";
import FormRow from "./FormRow";
import { MdEmail } from "react-icons/md";
import Logo from "./Logo";
import MiniSpinner from "./MiniSpinner";

function SendRecovery() {
  const { recoverPassword, isPending } = useRecover();
  const [email, setEmail] = useState("");

  function handleRecover(e) {
    e.preventDefault();
    if (!email) return;
    recoverPassword(email);
  }

  return (
    <div className="dark:bg-zinc-800 bg-zinc-300 text-zinc-100 remove-scroll-edge min-h-screen flex flex-col items-center">
      <Logo />
      <form
        onSubmit={handleRecover}
        className="text-zinc-50 font-NovaSquare flex flex-col items-center mt-[5em] gap-[1em] dark:bg-zinc-700/50 bg-zinc-200 py-5 px-5 rounded-md shadow-md shadow-zinc-700/30"
      >
        <h1 className="w-[100%] text-center py-3 text-lime-900 md:text-2xl text-xl tracking-tight font-black rounded-md dark:bg-lime-400">
          Enter your Email
        </h1>
        <FormRow logo={<MdEmail fill="green" />}>
          <input
            className="px-5 py-[4px] outline-none w-[200px] rounded-md text-zinc-900 dark:text-zinc-100 focus:ring-[0.5px] ring-lime-500 bg-transparent"
            type="email"
            placeholder="youremail@email.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormRow>

        <Button
          disabled={isPending}
          type="small"
          className="py-5 w-auto flex justify-center items-center px-5"
        >
          {isPending ? <MiniSpinner /> : "change password"}
        </Button>
      </form>
    </div>
  );
}

export default SendRecovery;
