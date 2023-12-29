import { useState } from "react";
import { useGetCurrentUser } from "../hooks/Users/useGetCurrentUser";
import { useUpdateUser } from "../hooks/Users/useUpdateUser";
import Button from "../interface/Button";
import Spinner from "../interface/Spinner";
import { FaRegUser } from "react-icons/fa6";
import BackButton from "../interface/BackButton";

function Settings() {
  const { data, isLoading } = useGetCurrentUser();
  const { isUpdating, userUpdate } = useUpdateUser();
  const [name, setName] = useState(data?.user_metadata?.full_name);
  const [file, setFile] = useState(null);

  function handleUpdate(e) {
    e.preventDefault();
    if (name === data?.user_metadata?.full_name || !file) return;
    userUpdate({ full_name: name, avatar_url: file || "" });
  }

  return (
    <div className="w-[80vw] relative">
      <BackButton className="absolute md:right-10 right-0 text-xs md:text-md" />
      <h1 className="text text-left text-lime-500 font-bold font-NovaSquare md:text-xl text:sm">
        Settings
      </h1>
      {(isUpdating || isLoading) && <Spinner />}
      <form
        onSubmit={handleUpdate}
        className="flex flex-col items-center gap-3"
      >
        {data?.user_metadata.avatar_url ? (
          <img
            src={data?.user_metadata?.avatar_url}
            alt=""
            className="w-[150px] h-[150px] rounded-[50%]"
          />
        ) : (
          <div className="border-[1px] w-[10em] md:w-[15em] h-[10em] md:h-[15em] flex justify-center items-center border-lime-400/50 rounded-[50%] p-5 overflow-hidden bg-zinc-900 shadow-inner shadow-lime-800">
            <FaRegUser size={200} className="w-[5em] md:w-[10em]" />
          </div>
        )}

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="customfileButton text-zinc-100 text-sm"
        />
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="transition-all duration-500 bg-transparent text-zinc-50 border-[1px] border-zinc-300/20 font-NovaSquare px-2 py-1 rounded-sm outline-[0.5px]"
        />
        <Button
          type="small"
          className="absolute bottom-0 right-0 text-xs md:text-md h-[2.8em]"
        >
          Save
        </Button>
      </form>
    </div>
  );
}

export default Settings;
