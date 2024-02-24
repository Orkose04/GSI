import "./App.css";
import Sidebar from "./composants/sideBar";
import ListUser from "./composants/listUser";

export const App = () => {
  return (
    <div className="bigContainer">
      <Sidebar />
      <ListUser />
    </div>
  );
};
export default App;
