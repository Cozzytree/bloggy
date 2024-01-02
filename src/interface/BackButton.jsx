import { useNavigate } from "react-router-dom";

function BackButton({ children, className }) {
  const naviagate = useNavigate();
  return (
    <button
      className={`${className} bg-zinc-700 text-lime-400 text-md font-bold font-NovaSquare px-2 py-1 rounded-md md:hover:bg-lime-400 md:hover:text-zinc-900 transition-all duration-150`}
      onClick={() => naviagate(-1)}
    >
      {children ? children : "← Back"}
    </button>
  );
}

export default BackButton;
