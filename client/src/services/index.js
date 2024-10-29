import axios from "axios";

export const callRegisterUserApi = async (formData) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/user/register",
      formData,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error.response?.data?.message || error.message);
    throw error;
  }
};

export const callLoginUserApi = async (formData) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/user/login",
      formData,
      {
        withCredentials: true, // Include credentials for CORS
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error.response?.data?.message || error.message);
    throw error;
  }
};

export const callUserAuthApi = async () => {
  const response = await axios.post(
    "http://localhost:3000/api/user/auth",
    {},
    { withCredentials: true }
  );

  return response.data;
};

export const callLogoutApi = async () => {
  const response = await axios.get("http://localhost:3000/api/user/logout", {
    withCredentials: true,
  });
  return response.data;
};

export const addNewTaskApi = async (formData) => {
  const response = await axios.post(
    "http://localhost:3000/api/task/add-new-task",
    formData
  );
  return response?.data;
};

// /get-all-tasks-by-userid

export const getAllTaskApi = async (getCurrentUserId) => {
  const response = await axios.get(
    `http://localhost:3000/api/task/get-all-tasks-by-userid/${getCurrentUserId}`
  );
  return response?.data;
};

export const deleteTaskApi = async (getCurrentTaskId) => {
  const response = await axios.delete(
    `http://localhost:3000/api/task/delete-task/${getCurrentTaskId}`
  );
  return response?.data;
};

export const UpdateTaskApi = async (formData) => {
  const response = await axios.put(
    "http://localhost:3000/api/task/update-task",
    formData
  );
  return response?.data;
};
