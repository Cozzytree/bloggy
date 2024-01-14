import { useState } from "react";

function Content({ children, value = 30 }) {
  const [showless, setShowless] = useState(true);

  const handleShowmore = () => {
    setShowless(false);
  };
  const handleShowless = () => {
    setShowless(true);
  };
  return (
    <p>
      {children.split(" ").length < value && children}
      {/* {showless ? children.split(" ").slice(0, value).join(" ") : children} */}
      {children.split(" ").length > value && (
        <>
          {showless ? children.split(" ").slice(0, value).join(" ") : children}
          <span
            className="cursor-pointer text-lime-400 underline"
            onClick={() => {
              if (showless) {
                handleShowmore();
              } else {
                handleShowless();
              }
            }}
          >
            {showless ? "show more" : "show less"}
          </span>
        </>
      )}
    </p>
  );
}

export default Content;
