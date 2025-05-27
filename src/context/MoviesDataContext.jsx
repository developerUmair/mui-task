import { useState } from "react";
import { createContext } from "react";

export const moviesContext = createContext();

const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);

  return (
    <moviesContext.Provider value={{ data, setData }}>
      {children}
    </moviesContext.Provider>
  );
};

export default DataProvider;
