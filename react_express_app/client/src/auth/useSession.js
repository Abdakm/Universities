import React, { useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext, AuthContext } from "../context/UserContext";

const useSession = () => {
  const { setUser } = useContext(UserContext);
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = () => {
      axios
        .get("http://localhost:4000/session", { withCredentials: true })
        .then((res) => {
          if (res.data.isAuth) {
            console.log(res.data);
            setUser(res.data.sessionData);
            setAuth(res.data.isAuth);
          } else {
            console.log("there is not session");
          }
        })
        .catch((err) => console.log(err.response.data.message));
    };

    checkSession();
  }, [setAuth, setUser, navigate]);
};

export default useSession;
