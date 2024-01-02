import { useEffect, useState } from "react";
import { useSearch } from "./../hooks/Users/useSearchUsers";
import { useNavigate, useSearchParams } from "react-router-dom";
import ErrorWindow from "./ErrorWindow";

function SearchUsers() {
  const [username, setName] = useState("");
  const { isPending, search, searchResults, error } = useSearch();

  useEffect(() => {
    let delayInputTimeoutId;
    if (username.length > 2) {
      delayInputTimeoutId = setTimeout(() => {
        search(username);
      }, 1000);
    }

    return () => clearTimeout(delayInputTimeoutId);
  }, [username, search]);

  return (
    <>
      <input
        value={username}
        onChange={(e) => {
          setName(e.target.value);
        }}
        className="w-[20em] px-3 py-2 bg-zinc-400/10 outline-none focus:ring-[0.5px] rounded-md ring-lime-500/50 font-NovaSquare text-zinc-50 md:text-xl text-sm"
        type="text"
        placeholder="search..."
      />

      {searchResults?.map((user) => (
        <SearchResults data={user} key={user.id} />
      ))}
      {isPending ? (
        <p>Loading...</p>
      ) : (
        error && <ErrorWindow>no records!</ErrorWindow>
      )}
    </>
  );
}

function SearchResults({ data }) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  searchParams.set("id", data.id);
  return (
    <div
      onClick={() => {
        setSearchParams(searchParams);
        navigate(`/search/id?=${data.id}`);
      }}
      className="bg-zinc-600/50 w-[100%] rounded-md py-2 px-2 flex items-center space-x-3 text-zinc-50 font-NovaSquare cursor-pointer"
    >
      <img
        src={data.avatar_url}
        alt=""
        className="w-[4em] h-[4em] rounded-[50%] "
      />
      <p className="md:hover:underline transition-all duration-200">
        {data.username}
      </p>
    </div>
  );
}

export default SearchUsers;
