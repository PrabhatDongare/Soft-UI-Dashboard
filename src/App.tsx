import { Outlet } from "react-router-dom";
import SideBar from "./components/SideBar";

function App() {
  return (
    <>
      <div className="d-flex min-vh-100" style={{ backgroundColor: "#f4f4f5" }}>
        <div className="col-2 p-4">
          <SideBar />
        </div>
        <div className="col-10 px-3 py-2">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
