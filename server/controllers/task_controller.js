import Task from "../models/Task.js";

export const addNewTask = async (req, res) => {
  const { title, description, status, userId, priority } = await req.body;

  try {
    const newlyCreatedTask = await Task.create({
      title,
      description,
      status,
      userId,
      priority,
    });
    if (newlyCreatedTask) {
      return res.status(200).json({
        success: true,
        message: "Task Added Successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Some Error Occured! Please Try Again",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Some error occured! please Try Again",
    });
  }
};

export const getAllTasks = async (req, res) => {
  const { id } = req.params;
  try {
    const extractAllTasksByUserId = await Task.find({ userId: id });
    if (extractAllTasksByUserId) {
      return res.status(200).json({
        success: true,
        tasksList: extractAllTasksByUserId,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Some Error Occured ! Please Try Again",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Some Error Occured ! Please Try Again",
    });
  }
};

export const UpdateTask = async (req, res) => {
  const { title, description, status, priority, userId, _id } = await req.body;

  try {
    const UpdateTask = await Task.findByIdAndUpdate(
      { _id },
      {
        title,
        description,
        status,
        priority,
        userId,
      },
      {
        new: true,
      }
    );
    if (UpdateTask) {
      return res.status(200).json({
        success: true,
        message: "Task Updated Successfully",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Some Error Occured ! Please Try Again",
    });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Task id is required",
      });
    }
    const deleteTask = await Task.findByIdAndDelete(id);
    if (deleteTask) {
      return res.status(200).json({
        success: true,
        message: "Task deleted successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Some error occured! Please try again",
      });
    }
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Some error occured! Please try again",
    });
  }
};
