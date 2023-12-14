import Logo from "../interface/Logo";
import Login from "../interface/Login";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const navigate = useNavigate();
  useEffect(
    function () {
      const data = JSON.parse(
        localStorage.getItem("sb-vozbqbvaultodqeuimqv-auth-token")
      );
      if (!data) return;
      if (data) {
        navigate("/user");
      }
    },
    [navigate]
  );
  return (
    <>
      <Logo />
      <Login />
    </>
  );
}

export default Homepage;
