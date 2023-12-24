import { createPortal } from "react-dom";
import { FaRegSquare } from "react-icons/fa6";
import { useClickOutside } from "../hooks/uiHooks/useClickOutside";
import { useRef } from "react";

function ImageView({ url, collapse }) {
  const ref = useRef();
  useClickOutside(ref, collapse);

  return createPortal(
    <div className="inset-0 w-[100%] h-screen fixed flex justify-center items-center z-50 backdrop-blur-sm">
      <FaRegSquare
        className="absolute top-[8%] right-[12%] cursor-pointer"
        size={20}
        fill="white"
        onClick={collapse}
      />
      <img
        ref={ref}
        src={url}
        alt=""
        className="h-[90%] w-[80%] object-cover rounded-sm"
      />
    </div>,
    document.body
  );
}

export default ImageView;
