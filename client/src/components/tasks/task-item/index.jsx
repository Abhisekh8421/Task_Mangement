import CommonButton from "@/components/common-button";
import CommonCard from "@/components/common-card";
import { scrumBoardOptions } from "@/config";

const TaskItem = ({
  item,
  setShowDialog,
  taskFormData,
  handleDelete,
  setCurrentEditedId,
}) => {
  const priorityColorStyles = {
    low: "bg-green-200 text-green-800",
    medium: "bg-yellow-200 text-yellow-800",
    high: "bg-red-200 text-red-800",
  };

  return (
    <CommonCard
      title={item.title}
      description={
        scrumBoardOptions.find((boardOption) => boardOption.id === item.status)
          .label
      }
      content={
        <span
          className={`px-2 py-1 rounded-full ${
            priorityColorStyles[item.priority]
          }`}
        >
          {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
        </span>
      }
      footerContent={
        <div className="flex w-full justify-between items-center">
          <CommonButton
            onClick={() => {
              setShowDialog(true);
              setCurrentEditedId(item?._id);
              taskFormData.setValue("title", item.title);
              taskFormData.setValue("description", item?.description);
              taskFormData.setValue("status", item?.status);
              taskFormData.setValue("priority", item?.priority);
            }}
            buttonText={"Edit"}
          />
          <CommonButton
            onClick={() => handleDelete(item._id)}
            buttonText={"Delete"}
          />
        </div>
      }
    />
  );
};
export default TaskItem;
