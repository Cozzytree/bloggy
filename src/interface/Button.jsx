function Button({ type, children, onClick, className, disabled, onMouseDown }) {
  const buttonCss =
    "rounded-md font-bold bg-lime-900 text-lime-100 font-NovaSquare tracking-wide md:hover:bg-lime-300 md:hover:text-zinc-800 duration-200 transition-all";

  // if (type === "secondary")
  //   return (
  //     <button
  //       onClick={onClick}
  //       className="text-lime-400 md:hover:bg-lime-100 md:hover:text-lime-800 transition-all duration-100 bg-lime-50/10 text-[0.8em] px-2 py-1 h-[2em] rounded-md whitespace-nowrap"
  //     >
  //       {children}
  //     </button>
  //   );

  if (type === "small")
    return (
      <button
        onClick={onClick}
        className={`${buttonCss} text-sm h-8 w-[7em] ${className}`}
      >
        {children}
      </button>
    );
  if (type === "danger") {
    return (
      <button
        className={`${className} bg-red-500 text-zinc-100 text-sm font-NovaSquare py-2 rounded-md w-[50%]`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }

  if (type === "like") {
    return (
      <button
        disabled={disabled}
        onMouseDown={onMouseDown}
        className={`${className} z-0`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
  return (
    <button disabled={disabled} onClick={onClick} className={className}>
      {children}
    </button>
  );
}

export default Button;
