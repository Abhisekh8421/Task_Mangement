import CommonForm from "@/components/common-form";
import { signUpFormControls } from "@/config";

import { callRegisterUserApi } from "@/services";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SignUP = () => {
  const formData = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const handleSubmit = async (userData) => {
    console.log(userData);

    const data = await callRegisterUserApi(userData);
    if (data?.success) {
      toast.success("Registered Successful");

      navigate("/tasks/lists");
    } else {
      toast.error("Error Occured");
    }
  };

  return (
    <div>
      <CommonForm
        form={formData}
        handleSubmit={handleSubmit}
        formControls={signUpFormControls}
        btnText={"Sign Up"}
      />
    </div>
  );
};

export default SignUP;
