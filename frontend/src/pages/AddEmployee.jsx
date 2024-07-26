import React, { useState } from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { Button, Checkbox, Radio } from "@material-tailwind/react";
import toast from "react-hot-toast";
import { axiosInstance, getConfig } from "../utils/requestUrl";
const AddEmployee = () => {
  const [image, setImage] = useState(null);
  
  const [data, setData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "Hr",
    gender: "Male",
    course: [],
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setData((prevData) => {
      if (checked) {
        return { ...prevData, course: [...prevData.course, value] };
      } else {
        return {
          ...prevData,
          course: prevData.course.filter((course) => course !== value),
        };
      }
    });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!image) {
      toast.error("Please upload the image");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("mobile", data.mobile);
    formData.append("designation", data.designation);
    formData.append("gender", data.gender);
    formData.append("course", data.course.join(","));
    formData.append("image", image);

    try {
      await getConfig();
      const response = await axiosInstance.post("/api/employee/add-employee", formData);
      if (response.data.success) {
        setData({
          name: "",
          email: "",
          mobile: "",
          designation: "Hr",
          gender: "Male",
          course: [],
        });
        setImage(null);
        toast.success("Employee added");
        
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in adding employee");
    }
  };
  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <div className="space-y-2 flex justify-center items-center m-5">
          <div className="border-b border-gray-900/10 pb-5">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Add Employee
            </h2>
            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Name
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  
                    <input
                      name="name"
                      type="text"
                      onChange={onChangeHandler}
                      value={data.name}
                      placeholder="muntasirul"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-4">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  email
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                   
                    <input
                      name="email"
                      type="email"
                      onChange={onChangeHandler}
                      value={data.email}
                      placeholder="muntasirul@gmail.com"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-4">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Mobile No
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  
                    <input
                      name="mobile"
                      type="number"
                      onChange={onChangeHandler}
                      value={data.mobile}
                      placeholder="987612312"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-4">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Designation
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  
                  <select onChange={onChangeHandler} value={data.designation} name="designation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block flex-1 w-[450px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ">
                  <option selected value="Hr">HR</option>
                  <option value="Manager">Manager</option>
                  <option value="Sales">Sales</option>
                </select>
                  </div>
                </div>
              </div>
             
              <div className="sm:col-span-4">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Gender
                </label>
                <div className="mt-2">
                  <div className="flex sm:max-w-md">
                    <div className="flex gap-10">
                      <Radio name="gender" label="Male" onChange={onChangeHandler} value="Male" checked={data.gender === "Male"} />
                      <Radio name="gender" label="Female" onChange={onChangeHandler} value="Female" checked={data.gender === "Female"} defaultChecked />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-full">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Course
                </label>
                <div className="mt-2">
                  <Checkbox  name="course" value="MCA" onChange={onCheckboxChange} checked={data.course.includes("MCA")} label="MCA" />
                  <Checkbox   name="course" value="BCA" onChange={onCheckboxChange} checked={data.course.includes("BCA")} label="BCA" />
                  <Checkbox  name="course" value="BSA" onChange={onCheckboxChange} checked={data.course.includes("BSA")} label="BSA" />
                  <Checkbox  name="course" value="BTech" onChange={onCheckboxChange} checked={data.course.includes("BTech")} label="BTech" />
                </div>             
              </div>
             

              <div className="sm:col-span-4">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                 photo
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon
                      aria-hidden="true"
                      className="mx-auto h-12 w-12 text-gray-300"
                    />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="image"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="image"
                          name="image"

                          type="file"
                          onChange={(e) => setImage(e.target.files[0])}
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG up to 2MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-start mt-5">
            <Button
            variant="gradient"
            type="submit"
            className="rounded-md px-10 py-2 text-sm font-semibold text-white"
          >
            Add
          </Button>
            </div>
          </div>
          
        </div>

       
      </form>
    </div>
  );
};

export default AddEmployee;
