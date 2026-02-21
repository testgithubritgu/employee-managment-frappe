import { useState, useEffect } from "react";

// Custom hook implementation
function useDebounce(value:number, delay:number) {
  const [debouncedValue, setDebouncedValue] = useState<number>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup timeout if value changes
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;

// this is stash from debounce 
