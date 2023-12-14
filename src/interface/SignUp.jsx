import Form from "./Form";

function SignUp({ setIsLogin }) {
  return (
    <>
      <Form
        type="signUp"
        buttonLabel="sign Up"
        setIsLogin={setIsLogin}
        formFor="signUp"
      />
    </>
  );
}

export default SignUp;
