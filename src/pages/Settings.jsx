import { useState } from "react";
import { useGetCurrentUser } from "../hooks/Users/useGetCurrentUser";
import { useUpdateUser } from "../hooks/Users/useUpdateUser";
import Button from "../interface/Button";
import Spinner from "../interface/Spinner";

function Settings() {
  const { data, isLoading } = useGetCurrentUser();
  const { isUpdating, userUpdate } = useUpdateUser();
  const [name, setName] = useState(data?.user_metadata?.full_name);

  function handleUpdate(e) {
    e.preventDefault();
    if (!name) return;
    userUpdate({ full_name: name, avatar_url: "" });
  }

  return (
    <>
      {isUpdating || (isLoading && <Spinner />)}
      <form
        onSubmit={handleUpdate}
        className="flex flex-col items-center gap-3"
      >
        <img src="" alt="" />
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="bg-transparent text-zinc-50 border-[1px] border-zinc-300/20 font-NovaSquare px-2 py-1 rounded-sm"
        />
        <Button type="small">Save</Button>
      </form>
    </>
  );
}

export default Settings;
