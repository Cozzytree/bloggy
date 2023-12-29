import { MdEmail } from "react-icons/md";
import FormRow from "./FormRow";
import { FaUnlock, FaUser } from "react-icons/fa";
import { useSignUp } from "../hooks/Users/useSignUp";
import { useForm } from "react-hook-form";
import Button from "./Button";
import { useState } from "react";

const inputStyle =
  "border-[1px] w-[100%] border-stone-900 px-5 py-1 rounded-xl outline-none border-lime-300 text-zinc-100 bg-transparent border-t-transparent border-l-transparent border-r-transparent text-sm tracking-widest";

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
    <div className="flex flex-col justify-center pb-5 text-md max-h-[60vh] mt-[5em] w-[18em] sm:w-[20em] border-[1px] border-lime-400/60 rounded-md bg-zinc-700/50 font-NovaSquare text-zinc-50 transition-all duration-150 relative slowAndSteady">
      <h1 className="w-[100%] text-center py-5 text-lime-950 bg-lime-500 md:text-2xl text-sm tracking-wider font-bold rounded-md">
        Sign Up
      </h1>

      <form className="space-y-3 p-2" onSubmit={handleSubmit(onSubmit)}>
        <FormRow
          label="Username"
          logo={<FaUser />}
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
          logo={<MdEmail />}
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
          logo={<FaUnlock />}
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
          logo={<FaUnlock />}
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
        <span className="flex text-sm w-[100%] gap-2">
          Photo?{" "}
          <input
            type="file"
            className="text-zinc-100"
            onChange={(e) => setPhoto(e.target.files[0])}
          />
        </span>
        <Button disabled={isPending} type="small">
          Sign Up
        </Button>
      </form>
    </div>
  );
}

export default SignUp;
