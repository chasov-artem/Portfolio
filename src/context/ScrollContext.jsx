import { createContext, useContext, useRef } from "react";

const defaultRefs = {
  scrollToProjectRef: { current: null },
  scrollToSectionRef: { current: null },
  scrollToTopRef: { current: null },
};

const ScrollContext = createContext(defaultRefs);

export const useScroll = () => useContext(ScrollContext);

export const ScrollProvider = ({ children }) => {
  const scrollToProjectRef = useRef(null);
  const scrollToSectionRef = useRef(null);
  const scrollToTopRef = useRef(null);
  return (
    <ScrollContext.Provider
      value={{
        scrollToProjectRef,
        scrollToSectionRef,
        scrollToTopRef,
      }}
    >
      {children}
    </ScrollContext.Provider>
  );
};
