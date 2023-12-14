import { BsArrowBarRight } from "react-icons/bs";

function Logo() {
  return (
    <ul className="w-[100vw] sm:max-h-[2em] flex justify-start px-10 py-2 font-NovaSquare bg-zinc-800 border-b-[0.5px] border-lime-800 items-center">
      <li>
        <h1 className="font-bold text-2xl text-lime-600 text_shadow flex items-center">
          Bloggy <BsArrowBarRight fill="lime" />
        </h1>
      </li>
    </ul>
  );
}

export default Logo;
