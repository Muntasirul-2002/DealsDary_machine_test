import express from 'express'
import { upload } from '../controller/multerController.js';
import { addEmployeeController, deleteEmployeeController, getAllEmployeesController, getSingleEmployeeController, updateEmployeeController } from '../controller/employeeController.js';
const employeeRouter = express.Router();


employeeRouter.post('/add-employee', upload, addEmployeeController);
employeeRouter.get('/all-employees', getAllEmployeesController )
employeeRouter.get('/single-employee/:id', getSingleEmployeeController)
employeeRouter.put('/update-employee/:id', upload ,updateEmployeeController)
employeeRouter.delete('/delete-employee', deleteEmployeeController)

export default employeeRouter;