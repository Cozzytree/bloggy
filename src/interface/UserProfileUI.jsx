import defaultProfile from "../../public/defaultProfile.jpg";

const liStyle =
  "text-center cursor-pointer md:hover:bg-lime-300/10 transition-all duration-100 rounded-md px-5 py-1 font-NovaSquare font-medium text-sm";

function UserProfileUI({ isPosts, setIsPosts, username }) {
  return (
    <>
      <div className="min-h-[10em] w-[100%] flex items-end mt-5 space-x-10">
        <img
          src={username?.image ? username?.image : defaultProfile}
          alt="profile"
          className="md:w-[15em] w-[10em] h-[10em] md:h-[14em] aspect-auto rounded-2xl"
        />
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
