function Column({ children, className }) {
  return (
    <ul
      className={`flex flex-col justify-center items-start bg-zinc-700 px-2 space-y-3 rounded-md text-xs  py-1 ${className}`}
    >
      {children}
    </ul>
  );
}

export default Column;
