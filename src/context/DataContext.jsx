import { useState } from "react";
import { createContext } from "react";

export const dataContext = createContext();

const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);

  console.log("dataContext", data);

  return (
    <dataContext.Provider value={{ data, setData }}>
      {children}
    </dataContext.Provider>
  );
};

export default DataProvider;
