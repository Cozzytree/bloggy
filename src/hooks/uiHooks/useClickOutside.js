import { useEffect } from "react";

export function useClickOutside(ref, handler) {
  useEffect(
    function () {
      function closeModal(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      }
      document.addEventListener("click", closeModal, true);

      return () => document.removeEventListener("click", closeModal, true);
    },
    [ref, handler]
  );
}
