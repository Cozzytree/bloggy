import { useState } from "react";
import { useUpdateProfileImage } from "../hooks/Users/useUpdateProfileImage";
import { MdOutlineEdit } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa6";
import { useChangeUsername } from "../hooks/Users/useChangeUsername";
import Spinner from "./Spinner";
import ErrorWindow from "./ErrorWindow";

const liStyle =
  "text-center cursor-pointer md:hover:bg-lime-300/10 transition-all duration-100 rounded-md px-5 py-1 font-NovaSquare font-medium text-sm";

function UserProfileUI({ isPosts, setIsPosts, username }) {
  const [file, setFile] = useState("");
  const [isAdd, setIsAadd] = useState(false);
  const [isEditName, setIsEditName] = useState(false);
  const [newUserName, setNewUserName] = useState(username?.username || "");
  const { newName, error, isPending } = useChangeUsername();
  const { changeImage } = useUpdateProfileImage();

  function handleChangeProffileImage(file) {
    console.log(file);
    changeImage(file);
    setIsAadd(false);
    setFile("");
  }

  function handleNewName() {
    const oldName = username?.profiles.username;
    const newUser = newUserName;
    if (oldName !== newUser) newName(newUser);
  }

  if (error) return <ErrorWindow>{error}</ErrorWindow>;

  return (
    <>
      {isPending && <Spinner />}
      <div className="min-h-[10em] w-[100%] flex items-baseline mt-5 space-x-1 relative">
        {username?.username ? (
          <img
            src={username?.avatar_url}
            alt="profile"
            className={`md:w-[15em] w-[10em] h-[10em] md:h-[15em] aspect-auto rounded-2xl`}
          />
        ) : (
          <div className="flex flex-col justify-between defaultProfile items-center relative"></div>
        )}
        <input
          onChange={(e) => {
            setFile(e.target.files[0]);
            setIsAadd((current) => !current);
          }}
          defaultValue={""}
          type="file"
          accept="image/*"
          className="customfileButton w-[4em] absolute top-0 left-[12%]"
        />

        <span className={`flex gap-2`}>
          {isAdd && (
            <>
              <RxCross2
                className="cursor-pointer text-red-400 font-bold"
                size={15}
                onClick={() => {
                  setIsAadd((current) => !current);
                  setFile("");
                  console.log(isAdd, file);
                }}
              />
              <FaCheck
                size={15}
                fill="green"
                onClick={() => handleChangeProffileImage(file)}
              />
            </>
          )}
        </span>

        <div className="flex gap-4 relative justify-between">
          {isEditName ? (
            <input
              className="w-[15em] md:w-[20em] text-zinc-100 bg-transparent py-1 px-1 focus:outline-none font-NovaSquare font-semibold border-[0.5px] border-zinc-700 rounded-md text-xs md:text-[1em]"
              type="text"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              autoFocus
            />
          ) : (
            <h1 className="mb-5 text-zinc-50 text-sm md:text-md font-bold font-NovaSquare">
              {username?.username}
            </h1>
          )}

          <span className="flex gap-5">
            <MdOutlineEdit
              onClick={() => setIsEditName((current) => !current)}
              fill="silver"
              cursor="pointer"
              size={18}
              className="w-[1em]"
            />
            {isEditName && (
              <FaCheck
                onClick={() => {
                  handleNewName();
                  setIsEditName((current) => !current);
                }}
                fill="green"
                size={20}
                cursor="pointer"
                className="w-[1em]"
              />
            )}
          </span>
        </div>
      </div>

      <div className="w-[100%] text-zinc-50 h-8 flex justify-start mt-5 border-b-[2px] border-b-lime-300/20">
        <ul className="grid grid-cols-2 gap-1">
          <li
            className={`${liStyle} border-r-[0.5px] ${
              isPosts ? "bg-lime-100 text-lime-900 font-bold scale-x-105" : ""
            }`}
            onClick={() => setIsPosts(true)}
          >
            Posts
          </li>
          <li
            className={`${liStyle} border-l-[0.5px] ${
              !isPosts ? "bg-lime-100 text-lime-900 font-bold scale-x-105" : ""
            }`}
            onClick={() => setIsPosts(false)}
          >
            Images
          </li>
        </ul>
      </div>
    </>
  );
}

export default UserProfileUI;
