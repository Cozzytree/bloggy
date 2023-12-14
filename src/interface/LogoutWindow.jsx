function LogoutWindow({ children }) {
  return (
    <div className="w-auto h-[8em] rounded-md text-zinc-950 font-NovaSquare transition-all duration-700 flex flex-col justify-center px-8 py-5">
      <h1>Are you sure tou want to logout?</h1>
      {children}
    </div>
  );
}

export default LogoutWindow;
