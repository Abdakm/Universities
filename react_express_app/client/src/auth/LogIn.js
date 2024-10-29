import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Message from "../components/Message";
import { useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import { UserContext, AuthContext } from "../context/UserContext";

export default function Login() {
  // const { setUser } = useContext(UserContext);
  // const { setAuth } = useContext(AuthContext);

  const navigate = useNavigate();
  const emailRules = /^[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}$/;
  /* 
  const onSubmit = (event) => {
  //   event.preventDefault();
  //     const {email, password} = values;
  //     axios.post(`http://localhost:4000/user/login`, {
  //       email,
  //       password
  //     })
  //     .then(res => {
  //       setTimeout(() => {
  //         console.log('response')
  //         Message(res.data.message, 'top', 'center', 'lightgreen', 'white')
  //         setUser(res.data.user)
  //         setAuth(res.data.isAuth)
  //         navigate('/', {replace: true})
  //       }, 1 * 1000)
  //     })
  //     .catch(err => {
  //       Message(err.response.data.message, 'top', 'center', 'red', 'white')
  //     });
  };
*/
  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleBlur,
    handleReset,
    handleChange,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .matches(emailRules, { message: "Invalid Email" })
        .required("Required"),
      password: Yup.string().min(3).required("Required"),
    }),
    // onSubmit: async (values, { setSubmitting, setErrors }) => {
    //   try {
    //     const response = await axios.post(
    //       "http://localhost:4000/user/login",
    //       values,
    //       { withCredentials: true }
    //     );
    //     setTimeout(() => {
    //       Message(
    //         response.data.message,
    //         "top",
    //         "center",
    //         "lightgreen",
    //         "white"
    //       );
    //       setUser(response.data.user);
    //       setAuth(response.data.isAuth);
    //       // document.cookie = `sid=${response.data.sid}; path=/`;
    //       navigate("/", { replace: true });
    //     }, 1000);
    //   } catch (error) {
    //     Message(error.response.data.message, "top", "center", "red", "white");
    //     setErrors({ submit: error.response.data.message });
    //   } finally {
    //     setSubmitting(false);
    //   }
    // },
    onSubmit: () => {
      console.log("submit for login");
    },
  });
  // console.log(errors)
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="max-w-sm md:w-[400px]">
        <h1 className="w-full align-center font-extrabold">Login</h1>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your email
          </label>
          <input
            autoFocus
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            type="email"
            id="email"
            className="input"
            placeholder="Your Email"
          />
          {errors.email && touched.email && (
            <span className="text-red-500 text-sm ">{errors.email}</span>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your password
          </label>
          <input
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            type="password"
            id="password"
            placeholder="Password"
            className="input"
          />
          {errors.password && touched.password && (
            <span className="text-red-500 text-sm ">{errors.password}</span>
          )}
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Submit
        </button>
      </form>
    </div>
  );
}
