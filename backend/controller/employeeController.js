import employeeModel from "../models/employeeModel.js";
import fs from "fs";
import mongoose from "mongoose";
import validator from "validator";

//add employee controller functionality
export const addEmployeeController = async (req, res) => {
  //check file is uploaded or not
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "No file image uploaded" });
  }

  const { email, mobile } = req.body;
  const image_filename = req.file.filename;

  //email validation using validator
  if (!validator.isEmail(email)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid email format" });
  }

  //numeric validation for mobile number
  if (!validator.isNumeric(mobile)) {
    return res.status(400).json({
      success: false,
      message: "Mobile number should contain only numeric characters",
    });
  }

  //check duplicates email addresses
  const existingEmployees = await employeeModel.findOne({ email });
  if (existingEmployees) {
    return res
      .status(400)
      .json({ success: false, message: "Email already exists" });
  }

  const employee = new employeeModel({
    name: req.body.name,
    email: req.body.email,
    mobile: req.body.mobile,
    designation: req.body.designation,
    gender: req.body.gender,
    course: req.body.course,
    image: image_filename,
  });
  try {
    await employee.save();
    res.json({ success: true, message: "Employee added successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error in add employee" });
  }
};

//get all employees
export const getAllEmployeesController = async (req, res) => {
  try {
    const allEmployees = await employeeModel.find({});
    return res.status(200).json({ success: true, allEmployees });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error in getting employee list" });
  }
};

//update employee
export const updateEmployeeController = async (req, res) => {
  const { id } = req.params;
  const { name, email, mobile, designation, gender, course } = req.body;
  let image_filename = req.file ? req.file.filename : null;
  //email validation
  if (email && !validator.isEmail(email)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid email format" });
  }
  //mobile validation
  if (mobile && !validator.isNumeric(mobile)) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Mobile number should contain only numeric characters",
      });
  }
  //check for duplicates email
  if (email) {
    const existingEmployees = await employeeModel.findOne({
      email,
      _id: { $ne: id },
    });
    if (existingEmployees) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

  }
  try {

    const employee = await employeeModel.findById(id);
    if(!employee) {
        return res.status(404).json({ success: false, message: "Employee not found" });
    }

    employee.name = name || employee.name;
    employee.email = email || employee.email,
    employee.mobile = mobile || employee.mobile,
    employee.designation = designation || employee.designation,
    employee.gender = gender || employee.gender,
    employee.course = course || employee.course;
    if(image_filename){
        employee.image_filename = image_filename;
    }

    await employee.save();
    res.status(200).json({ success: true, message: "Employee updated successfully", employee });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error in updating employee" });
  }
};

//single employee 
export const getSingleEmployeeController = async (req,res)=>{
  try {
    const employee = await employeeModel.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee not found' });
    }
    res.json({ success: true, employee });
    
  } catch (error) {
    console.log(error)
  }
}

//delete employee
export const deleteEmployeeController = async (req, res) => {
  try {
    const employee = await employeeModel.findById(req.body.id)
    if(employee){
      fs.unlink(`/uploads/${employee.image}`,(err)=>{
        if(err){
          console.log('Error deleting image file : ', err)
        }
      })

      await employeeModel.findByIdAndDelete(req.body.id)
      res.json({success: true, message: 'Employee deleted successfully'})
    }
  } catch (error) {
    console.error("Error removing employee:", error);
    res.status(500).json({ success: false, message: 'Error removing employee' });
  }
};