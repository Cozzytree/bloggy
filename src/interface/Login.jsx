import { useEffect, useState } from "react";
import Form from "./Form";
import SignUp from "./SignUp";

function Login() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      {isLogin ? (
        <Form
          type="login"
          buttonLabel="Log in"
          formFor="login"
          isLogin={isLogin}
          setIsLogin={setIsLogin}
        />
      ) : (
        <SignUp setIsLogin={setIsLogin} />
      )}
    </>
  );
}

export default Login;
