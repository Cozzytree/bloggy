import { forwardRef } from "react";

const AreYouSureWindow = forwardRef((prop, ref) => {
  return (
    <div
      ref={ref}
      className="w-auto h-[8em] rounded-md text-zinc-950 font-NovaSquare transition-all duration-700 flex flex-col justify-center px-8 py-5 slowAndSteady"
    >
      <h1>{prop.label}</h1>
      {prop.children}
    </div>
  );
});

AreYouSureWindow.displayName = "AreYouSureWindow";

export default AreYouSureWindow;
