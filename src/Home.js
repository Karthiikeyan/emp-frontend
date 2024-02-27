import React from 'react'
import { useEffect, useState, useRef } from 'react'
import axios from 'axios'



const Home = () => {
  const formRef = useRef(null);
  const [data, setData] = useState([])
  const [values, setValues] = useState({
    Name: "",
    EmployeeID: "",
    Department: "",
    DOB: "",
    Gender: "",
    Designation: "",
    Salary: "",
  })
  useEffect(()=>{
    axios
      .get("https://emp-server-1.onrender.com/")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
    
  },[data, values])

    const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if salary starts with zero
    if (values.Salary.toString().charAt(0) === "0" && values.Salary<0) {
      alert("Invalid Salary.");
      return;
    }

    // Check for special characters in name and department
    const nameRegex = /^[a-zA-Z0-9 ]*$/;
    if (!nameRegex.test(values.Name)) {
      alert("Name should not contain special characters.");
      return;
    }

    const departmentRegex = /^[a-zA-Z0-9 ]*$/;
    if (!departmentRegex.test(values.Department)) {
      alert("Department should not contain special characters.");
      return;
    }

    const designationRegex = /^[a-zA-Z0-9 ]*$/;
    if (!designationRegex.test(values.Designation)) {
      alert("Designation should not contain special characters.");
      return;
    }

    // Validating date of birth
    const currentDate = new Date();
    const dob = new Date(values.DOB);
    const ageDiff = currentDate.getFullYear() - dob.getFullYear();
    if (ageDiff < 20) {
      alert("Age must be at least 20 years old.");
      return;
    }

    try {
      await axios
        .post("https://emp-server-1.onrender.com/add_user", values)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      formRef.current.reset();
      formRef.current.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      if (error.response) {
        console.error("Server responded with:", error.response.data);
      } else if (error.request) {
        console.error("No response received from server");
      } else {
        console.error("Error setting up request:", error.message);
      }
      alert("Failed to submit form. Please try again.");
    }
  };
  
  // function handlechange (e) {
  //   e.preventDefault();
  //   axios
  //     .post("https://emp-server-1.onrender.com/add_user", values)
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err));
  //   formRef.current.reset();
  //   formRef.current.scrollIntoView({ behavior: "smooth" });
  // }

  return (
    <div className="flex flex-col justify-center items-center mt-10 gap-5 w-[100%] ">
      <div className="flex flex-col justify-center items-center w-[75%]">
        <h3 className="flex flex-col items-center justify-center m-8 text-4xl font-bold text-black">
          Employee Management System
        </h3>
        <form
          ref={formRef}
          className="flex flex-col items-center justify-center p-5 text-black rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-wrap justify-between w-full">
            <div className="w-full mb-4 sm:w-1/2">
              <label htmlFor="name" className="block mb-2 font-bold">
                Name
              </label>
              <input
                typeName="text"
                id="name"
                name="name"
                className="w-full px-3 py-2 rounded-md sm:w-3/4 focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="Enter your name"
                required
                onChange={(e) => {
                  setValues({ ...values, Name: e.target.value });
                }}
              />
            </div>

            <div className="w-full mb-4 sm:w-1/2">
              <label htmlFor="empid" className="block mb-2 font-bold">
                EmployeeID
              </label>
              <input
                type="text"
                id="empid"
                name="empid"
                className="w-full px-3 py-2 rounded-md sm:w-3/4 focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="Enter your ID here"
                required
                onChange={(e) => {
                  setValues({ ...values, EmployeeID: e.target.value });
                }}
              />
            </div>

            <div className="w-full mb-4 sm:w-1/2">
              <label htmlFor="dept" className="block mb-2 font-bold">
                Department
              </label>
              <select
                className="w-full px-3 py-2 rounded-md sm:w-3/4 focus:outline-none focus:ring-2 focus:ring-white"
                required
                id="dept"
                placeholder="Enter your department"
                onChange={(e) => {
                  setValues({ ...values, Department: e.target.value });
                }}
              >
                <option name="softwaredevelopment">
                  {" "}
                  Software Development
                </option>
                <option name="datascientist">Data Scientist</option>
                <option name="machinelearning">
                  Machine Learning Engineer
                </option>
                <option name="prompt">Prompt Engineer</option>
                <option name="marketing">Digital Marketing</option>
              </select>
              {/* <input
                type="text"
                id="dept"
                name="dept"
                className="w-full px-3 py-2 rounded-md sm:w-3/4 focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="Enter your department"
                required
                onChange={(e) => {
                  setValues({ ...values, Department: e.target.value });
                }}
              /> */}
            </div>

            <div className="w-full mb-4 sm:w-1/2">
              <label htmlFor="dob" className="block mb-2 font-bold">
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                className="w-full px-3 py-2 rounded-md sm:w-3/4 focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="Enter your Department"
                required
                onChange={(e) => {
                  setValues({ ...values, DOB: e.target.value });
                }}
              />
            </div>

            <div className="w-full mb-4 sm:w-1/2">
              <label htmlFor="gender" className="block mb-2 font-bold">
                Gender
              </label>{" "}
              <p className="flex gap-3">
                Male
                <input
                  type="radio"
                  id="gender"
                  name="gender"
                  // className="w-full px-3 py-2 rounded-md sm:w-3/4 focus:outline-none focus:ring-2 focus:ring-white"
                  required
                  onChange={(e) => {
                    setValues({ ...values, Gender: "Male" });
                  }}
                />
                Female
                <input
                  type="radio"
                  id="gender"
                  name="gender"
                  // className="w-full px-3 py-2 rounded-md sm:w-3/4 focus:outline-none focus:ring-2 focus:ring-white"
                  required
                  onChange={(e) => {
                    setValues({ ...values, Gender: "Female" });
                  }}
                />
              </p>
            </div>

            <div className="w-full mb-4 sm:w-1/2">
              <label htmlFor="desig" className="block mb-2 font-bold">
                Designation
              </label>
              <input
                type="text"
                id="desig"
                name="desig"
                className="w-full px-3 py-2 rounded-md sm:w-3/4 focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="Enter your Designation"
                required
                onChange={(e) => {
                  setValues({ ...values, Designation: e.target.value });
                }}
              />
            </div>

            <div className="w-full mb-4 sm:w-1/2">
              <label htmlFor="salary" className="block mb-2 font-bold">
                Salary
              </label>
              <input
                type="text"
                id="salary"
                name="salary"
                className="w-full px-3 py-2 rounded-md sm:w-3/4 focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="Enter your Salary"
                required
                onChange={(e) => {
                  setValues({ ...values, Salary: e.target.value });
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            class="before:ease relative h-10 w-40 overflow-hidden border border-black shadow-2xl before:absolute before:left-0 before:-ml-2 before:h-48 before:w-48 before:origin-top-right before:-translate-x-full before:translate-y-12 before:-rotate-90 before:bg-gray-900 before:transition-all before:duration-300 hover:text-white hover:shadow-black hover:before:-rotate-180 rounded-full"
          >
            <span className="relative z-10">Submit</span>
          </button>
        </form>
      </div>
      {/* console.log(data); */}
      <div className="flex flex-col justify-center items-center w-[75%] gap-8 m-20">
        <table className="w-3/4 m-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-white bg-gray-700">Name</th>
              <th className="px-4 py-2 text-white bg-gray-700">EmployeeID</th>
              <th className="px-4 py-2 text-white bg-gray-700">Department</th>
              <th className="px-4 py-2 text-white bg-gray-700">
                Date of Birth
              </th>
              <th className="px-4 py-2 text-white bg-gray-700">Gender</th>
              <th className="px-4 py-2 text-white bg-gray-700">Designation</th>
              <th className="px-4 py-2 text-white bg-gray-700">Salary</th>
            </tr>
          </thead>
          <tbody>
            {data.map((value, index) => {
              return (
                <tr key={index}>
                  <td className="px-4 py-2 border">{value.Name}</td>
                  <td className="px-4 py-2 border">{value.EmployeeID}</td>
                  <td className="px-4 py-2 border">{value.Department}</td>
                  <td className="px-4 py-2 border">{value.DOB}</td>
                  <td className="px-4 py-2 border">{value.Gender}</td>
                  <td className="px-4 py-2 border">{value.Designation}</td>
                  <td className="px-4 py-2 border">{value.Salary}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home
