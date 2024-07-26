import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import { IconButton } from "@material-tailwind/react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { Route, Routes } from 'react-router-dom';
import AddEmployee from '../AddEmployee';
import ViewEmployee from '../ViewEmployee';
import DealsDashboard from '../DealsDashboard';
import UpdateEmployee from '../UpdateEmployee';
import Navbar from '../../components/Navbar/Navbar';
const Dashboard = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleSidebar  = () =>{
        setIsOpen(!isOpen)
    }
  return (
    <div className='flex'>
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
        <div className="flex-1">
        <div className="lg:hidden p-4">
          <IconButton variant="text" color="blue-gray" onClick={toggleSidebar}>
            <Bars3Icon className="h-6 w-6" />
          </IconButton>
        </div>
        <Navbar/>
        <Routes>
            <Route path='add-employee' element={<AddEmployee/>} />
            <Route path='update-employee/:id' element={<UpdateEmployee/>} />
            <Route path='view-employee' element={<ViewEmployee/>} />
            <Route path='deals-dashboard' element={<DealsDashboard/>} />
        </Routes>
        </div>
    </div>
  )
}

export default Dashboard