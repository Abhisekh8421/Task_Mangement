import CommonButton from "@/components/common-button";
import AddNewTask from "@/components/tasks/add-new-task";
import TaskItem from "@/components/tasks/task-item";
import { Skeleton } from "@/components/ui/skeleton";
import { TaskManagerContext } from "@/context";
import {
  addNewTaskApi,
  deleteTaskApi,
  getAllTaskApi,
  UpdateTaskApi,
} from "@/services";
import { Fragment, useContext, useEffect, useState } from "react";

const TaskPage = () => {
  const [showDialog, setShowDialog] = useState(false);

  const {
    taskFormData,
    User,
    tasksList,
    setTasksList,
    loading,
    setLoading,
    setCurrentEditedId,
    currentEditedId,
  } = useContext(TaskManagerContext);

  const handleSubmit = async (getData) => {
    console.log(currentEditedId, "current edited id");

    const response =
      currentEditedId !== null
        ? await UpdateTaskApi({
            ...getData,
            _id: currentEditedId,
            userId: User?._id,
          })
        : await addNewTaskApi({
            ...getData,
            userId: User?._id,
          });
    if (response) {
      fetchListOfTasks();
      setShowDialog(false);
      taskFormData.reset();
    }
  };

  const handleDelete = async (getTaskId) => {
    console.log(getTaskId);

    const response = await deleteTaskApi(getTaskId);
    if (response?.success) {
      fetchListOfTasks();
    }
  };
  const fetchListOfTasks = async () => {
    setLoading(true);
    const response = await getAllTaskApi(User._id);

    if (response?.success) {
      setTasksList(response?.tasksList);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (User !== null) fetchListOfTasks();
  }, [User]);

  // console.log(tasksList);
  if (loading) {
    return (
      <Skeleton
        className={"w-full h-[550px] rounded-[6px] bg-black opacity-50"}
      />
    );
  }

  return (
    <Fragment>
      <div className="mb-5">
        <CommonButton
          onClick={() => setShowDialog(true)}
          buttonText={"Add New Task"}
        />
      </div>
      <div className="mt-5 flex flex-col">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-4">
          {tasksList?.length > 0 ? (
            tasksList.map((taskItem) => (
              <TaskItem
                item={taskItem}
                setShowDialog={setShowDialog}
                taskFormData={taskFormData}
                setCurrentEditedId={setCurrentEditedId}
                handleDelete={handleDelete}
              />
            ))
          ) : (
            <h1> No tasks added! Please add one</h1>
          )}
        </div>
      </div>
      <AddNewTask
        showDialog={showDialog}
        handleSubmit={handleSubmit}
        setShowDialog={setShowDialog}
        taskFormData={taskFormData}
        currentEditedId={currentEditedId}
        setCurrentEditedId={setCurrentEditedId}
      />
    </Fragment>
  );
};

export default TaskPage;
