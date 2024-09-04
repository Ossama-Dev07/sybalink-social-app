import React, { useState, useEffect } from "react";
import Signupvalidation from "./Signupvalidation";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../style/Signup.css"


export default function Signup() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    nickname: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    const formErrors = Signupvalidation(values);
    setErrors(formErrors); 
  };

  useEffect(() => {
    if (
      errors.first_name === "" &&
      errors.last_name === "" &&
      errors.nickname === "" &&
      errors.email === "" &&
      errors.password === ""
    ) {
      axios
        .post("http://localhost:3005/signup", values)
        .then((res) => navigate("/"))
        .catch((err) => console.log(err));
    }
  }, [errors]); 

  return (
    <div>
      <form onSubmit={handlesubmit} className="fromsignup">
        <div className="flex gap-x-5	">
          <div className="flex flex-col ">
            <label>First Name:</label>
            <input
              type="text"
              name="first_name"
              className="w-36 h-10 rounded-2xl border-2 border-[#B968C7]"
              onChange={handleChange}
            />
            {errors.first_name && (
              <span className="span">{errors.first_name}</span>
            )}
          </div>
          <div className="flex flex-col">
            <label>Last Name:</label>
            <input
              type="text"
              name="last_name"
              className="w-36 h-10 rounded-2xl border-2 border-[#B968C7]"
              onChange={handleChange}
            />
            {errors.last_name && (
              <span className="span">{errors.last_name}</span>
            )}
          </div>
        </div>
        <div>
          <label>UserName:</label>
          <br />
          <input
            type="text"
            name="nickname"
            onChange={handleChange}
            className="input"
          />
          {errors.nickname && <span className="span">{errors.nickname}</span>}
        </div>
        <div>
          <label>E-mail:</label>
          <br />
          <input
            type="text"
            name="email"
            onChange={handleChange}
            className="input"
          />
          {errors.email && <span className="span">{errors.email}</span>}
        </div>
        <div>
          <label>Password:</label>
          <br />
          <input
            type="password"
            name="password"
            onChange={handleChange}
            className="input"
          />
          {errors.password && <span className="span">{errors.password}</span>}
        </div>
        <button type="submit" className="btn-Sign">
          Sign up
        </button>
      </form>
    </div>
  );
}
