import { useEffect } from "react";

export const useUnloadWarning = (condition = true) => {
  useEffect(() => {
    if (!condition) {
      return;
    }

    const listener = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };

    console.log("Adding Listener");
    window.addEventListener("beforeunload", listener);

    return () => {
      console.log("Removing Listener");
      window.removeEventListener("beforeunload", listener);
    };
  }, [condition]);
};
