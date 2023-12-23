import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div className="bg-zinc-800 text-zinc-100 remove-scroll-edge min-h-screen grid grid-rows-[auto_1fr] justify-center  overscroll-hidden py-5 overflow-hidden items-center">
      <main className="w-[100%]  flex mt-1 flex-col px-5 space-y-5 remove-scroll-edge justify-center items-center mb-[4em]">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
