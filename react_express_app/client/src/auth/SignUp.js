import * as React from "react";
import { replace, useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Message from "../components/Message";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const onSubmit = async (event) => {
    event.preventDefault();
    // if(Object.keys(errors).length){
    //     Message('There is an error in your information !!', 'top', 'center', 'red', 'white')
    // } else {
    //     await axios.post('http://localhost:4000/user/add', {
    //         firstname: values.firstname,
    //         lastname: values.lastname,
    //         password: values.password,
    //         email: values.email,
    //         phone: values.phone,
    //         // university_name: values.university_name
    //     })
    //     .then((res) => {
    //         setTimeout(() => {
    //             Message(res.data.message, 'top', 'center', 'lightgreen', 'white')
    //             navigate('/Login', {replace : true})
    //        }, 2 * 1000)
    //     })
    //     .catch(err => {
    //         setTimeout(() => {
    //             console.log(err)
    //             Message(err.response.data.message, 'top', 'center', 'red', 'white')
    //        }, 1 * 1000)
    //     })
    // }
    console.log("submit for signin");
  };
  // const passwordRules = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"/;
  const passwordRules = /[a-zA-Z]/;
  const { values, handleSubmit, handleBlur, handleChange, errors, touched } =
    useFormik({
      initialValues: {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        university_name: "",
      },
      validationSchema: Yup.object({
        firstname: Yup.string().required("Required"),
        lastname: Yup.string().required("Required"),
        email: Yup.string()
          .email("Please enter a valid email")
          .required("Required"),
        password: Yup.string()
          .min(5)
          .matches(passwordRules, {
            message: "you have to enter a strong password",
          })
          .required("Required"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password"), null], "Password must match")
          .required("Required"),
        phone: Yup.string().min(10),
        university_name: Yup.string().max(30),
      }),
      onSubmit,
    });

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <form onSubmit={onSubmit} className="max-w-md md:w-[500px]">
        <h1 className="w-full align-center font-extrabold mb-6">SignUp</h1>
        <div className="relative z-0 w-full mb-5 group">
          <input
            value={values.email}
            onBlur={handleBlur}
            onChange={handleChange}
            type="email"
            name="email"
            id="email"
            className="input1 peer"
            autoFocus
          />
          <label
            htmlFor="floating_email"
            className="label rtl:peer-focus:left-auto ">
            Email address
          </label>
          {touched.email && errors.email ? (
            <pre className="text-[10px] text-red-600">{errors.email}</pre>
          ) : null}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            value={values.password}
            onBlur={handleBlur}
            onChange={handleChange}
            type="password"
            name="password"
            id="password"
            className="input1 peer"
            placeholder=" "
          />
          <label htmlFor="floating_password" className="label">
            Password
          </label>
          {touched.password && errors.password ? (
            <pre className="text-[10px] text-red-600">{errors.password}</pre>
          ) : null}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            value={values.confirmPassword}
            onBlur={handleBlur}
            onChange={handleChange}
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            className="input1 peer"
            placeholder=" "
          />
          <label htmlFor="floating_repeat_password" className="label">
            Confirm password
          </label>
          {touched.confirmPassword && errors.confirmPassword ? (
            <pre className="text-[10px] text-red-600">
              {errors.confirmPassword}
            </pre>
          ) : null}
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              value={values.firstname}
              onBlur={handleBlur}
              onChange={handleChange}
              type="text"
              name="firstname"
              id="firstname"
              className="input1 peer"
              placeholder=" "
            />
            <label htmlFor="floating_first_name" className="label">
              First name
            </label>
            {touched.firstname && errors.firstname ? (
              <pre className="text-[10px] text-red-600">{errors.firstname}</pre>
            ) : null}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              value={values.lastname}
              onBlur={handleBlur}
              onChange={handleChange}
              type="text"
              name="lastname"
              id="lastname"
              className="input1 peer"
              placeholder=" "
            />
            <label htmlFor="floating_last_name" className="label">
              Last name
            </label>
            {touched.lastname && errors.lastname ? (
              <pre className="text-[10px] text-red-600">{errors.lastname}</pre>
            ) : null}
          </div>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            value={values.phone}
            onBlur={handleBlur}
            onChange={handleChange}
            type="text"
            name="phone"
            id="phone"
            className="input1 peer"
            placeholder=" "
          />
          <label htmlFor="floating_phone" className="label">
            Phone number (123-456-7890) (Optional)
          </label>
          {touched.phone && errors.phone ? (
            <pre className="text-[10px] text-red-600">{errors.phone}</pre>
          ) : null}
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
