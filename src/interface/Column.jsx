import { forwardRef } from "react";

const Column = forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      className={`flex items-start px-4 space-y-3 rounded-md text-xs py-3 ${props.className}`}
    >
      {props.children}
    </div>
  );
});

Column.displayName = "Column";
export default Column;
