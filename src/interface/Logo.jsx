import image from "./../Assets/bloggy.png";

function Logo() {
  return (
    <div className="w-[100vw] sm:max-h-[4em] flex justify-start px-10 py-2 font-NovaSquare dark:bg-zinc-800 border-b-[0.5px] border-lime-800/20 items-end gap-1">
      <img src={image} alt="Bloggy" className="w-[30px] h-[30px]" />
      <h1 className="text-lime-600 dark:text-lime-300 text-2xl font-extrabold">
        Loggy
      </h1>
    </div>
  );
}

export default Logo;
