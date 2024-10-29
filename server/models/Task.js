import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
  userId: String,
  priority: String,
});


const Task = mongoose.models.Task || mongoose.model("Task", TaskSchema);
export default Task;