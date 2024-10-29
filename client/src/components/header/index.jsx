import { TaskManagerContext } from "@/context";
import { callLogoutApi } from "@/services";
import { LogOut } from "lucide-react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const { setUser } = useContext(TaskManagerContext);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await callLogoutApi();
      if (response.success) {
        setUser(null);
        navigate("/auth");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <header className="border-b border-gray-200">
      <div className="container mx-auto h-16">
        <div className="flex h-[64px] items-center w-full justify-between">
          <div className="w-auto">
            <h1>Task Manager</h1>
          </div>
          <div className="flex gap-4">
            <Link className="text-black text-xl font-bold" to={"/tasks/lists"}>
              Tasks
            </Link>
            <Link
              className="text-black text-xl font-bold"
              to={"/tasks/scrum-board"}
            >
              Scrum Board
            </Link>
          </div>
          <div>
            <LogOut
              onClick={handleLogout}
              color="#000"
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
