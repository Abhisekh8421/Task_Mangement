import CommonDialog from "@/components/common-dialog";
import { addNewTaskFormControls } from "@/config";

const AddNewTask = ({
  showDialog,
  handleSubmit,
  setShowDialog,
  currentEditedId,
  setCurrentEditedId,
  taskFormData,
}) => {
  return (
    <CommonDialog
      formControls={addNewTaskFormControls}
      showDialog={showDialog}
      btnText={"Add"}
      onOpenChange={() => {
        setShowDialog(false);
        currentEditedId ? taskFormData.reset() : null;
        setCurrentEditedId(null);
      }}
      handleSubmit={handleSubmit}
      title={currentEditedId !== null ? "Edit Task" : "Post New Task"}
      formData={taskFormData}
    />
  );
};

export default AddNewTask;
