import CommonCard from "@/components/common-card";
import { scrumBoardOptions } from "@/config";
import { TaskManagerContext } from "@/context";
import { getAllTaskApi, UpdateTaskApi } from "@/services";
import { Fragment, useContext, useEffect } from "react";

const ScrumBoardPage = () => {
  const priorityColorStyles = {
    low: "bg-green-200 text-green-800",
    medium: "bg-yellow-200 text-yellow-800",
    high: "bg-red-200 text-red-800",
  };
  const { User, tasksList, setTasksList, setLoading } =
    useContext(TaskManagerContext);
  const fetchListOfTasks = async () => {
    const response = await getAllTaskApi(User._id);

    if (response?.success) {
      setTasksList(response?.tasksList);
    }
  };
  useEffect(() => {
    if (User != null) fetchListOfTasks();
  }, [User]);

  const onDragStart = (event, getTaskId) => {
    event.dataTransfer.setData("id", getTaskId);
  };

  const updateTaskByStatus = async (getTask) => {
    await UpdateTaskApi(getTask);
    await fetchListOfTasks();
  };

  const onDrop = (event, getCurrentStatus) => {
    const getDraggedTaskId = event.dataTransfer.getData("id");
    let findCurrentTask = tasksList.find(
      (item) => item._id.toString() === getDraggedTaskId
    );
    findCurrentTask = {
      ...findCurrentTask,
      status: getCurrentStatus,
    };
    updateTaskByStatus(findCurrentTask);
  };

  function renderTodoByStatus() {
    const taskStatuses = {
      todo: [],
      inProgress: [],
      blocked: [],
      review: [],
      done: [],
    };

    tasksList.forEach((taskItem) => {
      taskStatuses[taskItem.status].push(
        <div
          onDragStart={
            taskItem.status !== "done"
              ? (event) => onDragStart(event, taskItem._id)
              : null
          }
          className="mb-2"
          draggable={taskItem.status !== "done" ? true : false}
        >
          <CommonCard
            extraTextStyles={taskItem.status === "done" ? "line-through" : ""}
            title={taskItem.title}
            description={
              scrumBoardOptions.find(
                (boardOption) => boardOption.id === taskItem.status
              ).label
            }
            content={
              <span
                className={`px-2 py-1 rounded-full ${
                  priorityColorStyles[taskItem.priority]
                }`}
              >
                {taskItem.priority.charAt(0).toUpperCase() +
                  taskItem.priority.slice(1)}
              </span>
            }
          />
        </div>
      );
    });
    return taskStatuses;
  }

  return (
    <Fragment>
      <div className="grid grid-cols-5 gap-2 h-full">
        {scrumBoardOptions.map((item) => (
          <div
            className="border border-[#333333] rounded overflow-auto"
            key={item.id}
            onDrop={(event) => onDrop(event, item.id)}
            onDragOver={(event) => event.preventDefault()}
          >
            <div className="px-1 py-3 text-center bg-black border-none mb-3">
              <h3 className="text-2xl font-extrabold text-white">
                {item.label}
              </h3>
            </div>
            <div className="p-3">{renderTodoByStatus()[item.id]}</div>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default ScrumBoardPage;
