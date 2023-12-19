import { useState } from "react";
import { useUpdateProfileImage } from "../hooks/Users/useUpdateProfileImage";
import Button from "./Button";

const liStyle =
  "text-center cursor-pointer md:hover:bg-lime-300/10 transition-all duration-100 rounded-md px-5 py-1 font-NovaSquare font-medium text-sm";

function UserProfileUI({ isPosts, setIsPosts, username }) {
  const [file, setFile] = useState("");
  const [isAdd, setIsAadd] = useState(false);
  const { changeImage } = useUpdateProfileImage();

  function handleChangeProffileImage(file) {
    console.log(file);
    changeImage(file);
  }
  // console.log(username?.profiles.avatar_url);

  return (
    <>
      <div className="min-h-[10em] w-[100%] flex items-end mt-5 space-x-10">
        {username?.profiles.avatar_url ? (
          <img
            src={username?.profiles.avatar_url}
            alt="profile"
            className={`md:w-[15em] w-[10em] h-[10em] md:h-[14em] aspect-auto rounded-2xl`}
          />
        ) : (
          <div className="flex flex-col justify-between items-center relative">
            <input
              onChange={(e) => {
                setFile(e.target.files[0]);
                setIsAadd((current) => !current);
              }}
              defaultValue={""}
              type="file"
              accept="image/*"
              className="bg-zinc-900 text-zinc-90 opacity-80 defaultProfile cursor-pointer"
            />
            {(isAdd || file) && (
              <Button
                type="small"
                className="absolute top-[50%]"
                onClick={() => handleChangeProffileImage(file)}
              >
                Add
              </Button>
            )}
          </div>
        )}

        <h1 className="mb-5 text-zinc-50 text-xl font-bold font-NovaSquare">
          {username?.profiles.username}
        </h1>
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
