import { callUserAuthApi } from "@/services";
import { createContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

export const TaskManagerContext = createContext(null);

const TaskManagerProvider = ({ children }) => {
  const [User, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tasksList, setTasksList] = useState([]);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const taskFormData = useForm({
    defaultValues: {
      title: "",
      description: "",
      status: "",
      priority: "",
    },
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const verifyUserCookie = async () => {
      const data = await callUserAuthApi();
      if (data?.userInfo) {
        setUser(data?.userInfo);
      }
      return data?.success
        ? navigate(
            location.pathname == "/auth" || location.pathname == "/"
              ? "/tasks/lists"
              : `${location.pathname}`
          )
        : navigate("/auth");
    };
    verifyUserCookie();
  }, [navigate, location.pathname]);

  return (
    <TaskManagerContext.Provider
      value={{
        User,
        setUser,
        taskFormData,
        tasksList,
        setTasksList,
        loading,
        setLoading,
        currentEditedId,
        setCurrentEditedId,
      }}
    >
      {children}
    </TaskManagerContext.Provider>
  );
};

export default TaskManagerProvider;
