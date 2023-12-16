import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div className="remove-scroll-edge min-h-screen grid grid-rows-[auto_1fr] justify-center bg-zinc-800 overscroll-hidden py-5 overflow-hidden items-center">
      <main className="w-[100%]  flex mt-1 flex-col px-10 space-y-5 remove-scroll-edge justify-center items-center mb-[4em]">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
