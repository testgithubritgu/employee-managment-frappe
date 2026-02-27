import { useEffect } from "react";

export function useOutsideAlerter<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  setPopUp: React.Dispatch<React.SetStateAction<boolean>>,
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setPopUp(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setPopUp]);
}
