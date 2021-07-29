import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useParams, useHistory,Link } from "react-router-dom";

import { SendEncodedDetails } from "./functions/SendEncodedDetails";

/**
*@brief
*  reg/log component with validation with yup. Forms are made with formik
*/

export function FormRegAndLog(params) {
  const [ValidRequests, setValidRequests] = useState(null)
  let history = useHistory()
  var log_reg = false
  const route = useParams();
  if(route.link === "login"){
    log_reg = true
  }
  const formik = useFormik({
    initialValues: {
      Username: "",
      Password: "",
    },

    validationSchema: Yup.object({
      Username: Yup.string()
        .max(30, "Username must be 30 characters or less")
        .required("Username is required"),

      Password: Yup.string()
        .max(30, "Password must be 30 characters or less")
        .required("Password field is required"),
    }),

    onSubmit: (values)=>{
      SendEncodedDetails(values,params,route,setValidRequests,history)
    },
  });

  return (
    <div>
      <h1 className="title-all">{(log_reg && "Login")||"Register"} </h1>
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="Username" className="small-title">Username </label>
      <br/>
      <input
        id="Username"
        name="Username"
        type="text"
        className="inputer"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.Username}
      />

      
      <br />
      <label htmlFor="Password" className="small-title">Password</label>
      <br/>

      <input
        id="Password"
        name="Password"
        type="password"
        className="inputer"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.Password}
      />


      {formik.touched.Username && formik.errors.Username ? (
        <div className="error">{formik.errors.Username}</div>
      ) : null}
            {formik.touched.Password && formik.errors.Password ? (
        <div className="error">{formik.errors.Password}</div>
      ) : null}
      <br />
      <button type="submit" className="Log_Reg_submit">Submit</button>
      <br/>
      {(log_reg && (ValidRequests !== false || "User does not exist")) || (ValidRequests !== false || "User already exists")}
      <Link to="/" className="forms_home">Home</Link>
      {(log_reg && <Link to="/register" className="forms">Register</Link>)||<Link to="/login" className="forms">Login</Link>}
    </form>
    </div>
  );
}
