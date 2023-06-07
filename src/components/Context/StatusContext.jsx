import { createContext, useContext, useState } from "react";

const StatusContext = createContext();
export const StatusContextProvider = ({ children }) => {
  const [status, setStatus] = useState(false);
  const render = (ev) => {
    ev.target.id === "row" ? setStatus(true) : setStatus(false);
  };
  return (
    <StatusContext.Provider value={{ status, render }}>
      {children}
    </StatusContext.Provider>
  );
};
export const useStatus = () => useContext(StatusContext);
