import React, { useEffect, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUserState } from "../../store/user/userSlice";
import { Navigate } from "react-router-dom";
import { getUser } from "../../store/user/userActions";

const ProtectedRoute = ({ children }) => {
  const user = useSelector(selectUserState);

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !user.id) {
      dispatch(getUser());
    }
  }, [dispatch]);

  if (user.id === null) return <h3>Loading</h3>;
  {
    console.log("key", user);
  }
  return user.id ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
