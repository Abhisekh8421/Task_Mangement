import { useState } from "react";
import SignIn from "@/components/auth/sign-in";
import SignUP from "@/components/auth/sign-up";
import CommonButton from "@/components/common-button";

const AuthPage = () => {
  const [isLoginView, setIsLoginView] = useState(true);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen h-full bg-white">
      <div className="flex flex-col justify-center items-center text-center">
        <h3 className="text-3xl font-bold mb-4">Welcome</h3>
        <div className="w-full max-w-md">
          {isLoginView ? <SignIn /> : <SignUP />}
        </div>
      </div>

      <div className="mt-5">
        <CommonButton
          type="button"
          onClick={() => setIsLoginView((prev) => !prev)}
          buttonText={isLoginView ? "Switch To SignUp" : "Switch To SignIn"}
        />
      </div>
    </div>
  );
};

export default AuthPage;
