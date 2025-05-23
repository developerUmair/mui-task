import { useContext, useEffect } from "react";
import "./App.css";
import { dataContext } from "./context/DataContext";
import { dummyData } from "./data/data";
import DataTable from "./Components/DataTable";

function App() {
  const { setData } = useContext(dataContext);

  useEffect(() => {
    setTimeout(() => {
      setData(dummyData);
    }, 2000);
  }, []);
  return (
    <>
      <DataTable />
    </>
  );
}

export default App;
