import CommonForm from "@/components/common-form";
import { signInFormControls } from "@/config";
import { callLoginUserApi } from "@/services";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const formData = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (userData) => {
    try {
      const response = await callLoginUserApi(userData);
      // console.log(response); // Handle success
      if (response.success) {
        toast.success("User login Successfully");
        navigate("/tasks/lists");
      } else {
        toast.error("Some Error occured");
      }
    } catch (error) {
      console.error(error); // Handle error
    }
  };

  return (
    <CommonForm
      form={formData}
      formControls={signInFormControls}
      handleSubmit={handleSubmit}
      btnText={"Sign In"}
    />
  );
};

export default SignIn;
