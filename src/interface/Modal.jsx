import {
  cloneElement,
  createContext,
  useContext,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import Button from "./Button";
import { useClickOutside } from "../hooks/uiHooks/useClickOutside";

const ModalContet = createContext();

function Modal({ children }) {
  const [isOpen, setIsOpen] = useState("");

  const close = () => setIsOpen("");
  const open = (value) => setIsOpen(value);

  return (
    <ModalContet.Provider value={{ open, close, isOpen }}>
      {children}
    </ModalContet.Provider>
  );
}

function Open({ children, opens }) {
  const { open } = useContext(ModalContet);
  return cloneElement(children, { onClick: () => open(opens) });
}

function ModalWindow({ children, name }) {
  const { close, isOpen } = useContext(ModalContet);
  const ref = useRef();

  useClickOutside(ref, close);

  if (isOpen !== name) return null;

  return createPortal(
    <div className="inset-0 bg-zinc-800/20 backdrop-blur-sm fixed flex justify-center items-center z-50">
      <div
        ref={ref}
        className="text-zinc-50 bg-zinc-100/50 flex justify-center items-center rounded-lg relative"
      >
        <Button
          className="text-zinc-900 absolute right-4 top-1 font-bold text-lg"
          onClick={close}
        >
          X
        </Button>
        {children}
      </div>
    </div>,
    document.body
  );
}

Modal.Open = Open;
Modal.ModalWindow = ModalWindow;

export default Modal;
