import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div className="text-zinc-100 remove-scroll-edge min-h-screen grid grid-rows-[auto_1fr] justify-center  overscroll-hidden py-5 overflow-hidden items-center bg-neutral-800">
      <main className="w-[100%] flex mt-1 flex-col px-5 space-y-5 remove-scroll-edge justify-center items-center mb-[4em] animate-easy">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
