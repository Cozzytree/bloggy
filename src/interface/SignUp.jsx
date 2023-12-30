import { MdEmail } from "react-icons/md";
import FormRow from "./FormRow";
import { FaUnlock, FaUser } from "react-icons/fa";
import { useSignUp } from "../hooks/Users/useSignUp";
import { useForm } from "react-hook-form";
import Button from "./Button";
import { useState } from "react";

const inputStyle =
  "w-[15em] sm:w-[18em] px-5 py-1 rounded-xl text-zinc-900 dark:text-zinc-100 bg-transparent text-sm tracking-wide outline-none";

function SignUp() {
  const { isPending, signUp } = useSignUp();
  const [photo, setPhoto] = useState(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm();

  function onSubmit(data) {
    console.log(data);
    signUp({ ...data, avatar_url: photo || "" });
  }

  return (
    <div className="flex flex-col justify-center pb-5 text-md max-h-[60vh] mt-[5em] w-[18em] sm:w-[20em] border-[0.5px] border-lime-400/60 rounded-md dark:bg-zinc-700/50 font-NovaSquare text-zinc-50 transition-all duration-500 relative slowAndSteady dark:text-zinc-50">
      <h1 className="w-[100%] text-center py-3 text-lime-900 md:text-3xl text-xl tracking-tight font-black rounded-md dark:bg-lime-400">
        Sign Up
      </h1>

      <form className="space-y-3 p-2" onSubmit={handleSubmit(onSubmit)}>
        <FormRow
          label="Username"
          logo={<FaUser fill="green" />}
          errors={errors?.username?.message}
        >
          <input
            type="text"
            id="full_name"
            placeholder="Username"
            className={inputStyle}
            {...register("full_name", { required: "required" })}
          />
        </FormRow>

        <FormRow
          label="Email"
          logo={<MdEmail fill="green" />}
          errors={errors?.email?.message}
        >
          <input
            type="text"
            id="email"
            className={inputStyle}
            placeholder="youremail@email.com"
            {...register("email", {
              required: "This field is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Enter a valid email address",
              },
            })}
          />
        </FormRow>
        <FormRow
          label="Password"
          logo={<FaUnlock fill="green" />}
          errors={errors?.password?.message}
        >
          <input
            type="password"
            id="password"
            className={inputStyle}
            placeholder="password"
            {...register("password", { required: "required" })}
          />
        </FormRow>
        <FormRow
          label="Confirm Password"
          logo={<FaUnlock fill="green" />}
          errors={errors?.confirmPassword?.message}
        >
          <input
            type="password"
            id="confirmPassword"
            className={inputStyle}
            placeholder="confirm password"
            {...register("confirmPassword", {
              required: "required",
              validate: (value) =>
                value === getValues().password || "Password did not matched",
            })}
          />
        </FormRow>
        <span className="flex md:text-sm w-[100%] gap-2 px-3 text-xs items-center">
          Photo?
          <input
            type="file"
            className="text-zinc-100 customfileButton"
            onChange={(e) => setPhoto(e.target.files[0])}
          />
        </span>
        <Button disabled={isPending} type="small" className="float-right">
          Sign Up
        </Button>
      </form>
    </div>
  );
}

export default SignUp;
