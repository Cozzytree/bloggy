import image from "./../../public/bloggy.png";

function Logo() {
  return (
    <div className="w-[100vw] sm:max-h-[4em] flex justify-start px-10 py-2 font-NovaSquare bg-zinc-800 border-b-[0.5px] border-lime-800 items-end gap-1">
      <img src={image} alt="Bloggy" className="w-[30px] h-[30px]" />
      <h1 className="text-lime-400 text-xl font-bold">Loggy</h1>
    </div>
  );
}

export default Logo;
