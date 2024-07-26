import React, { useContext } from 'react'
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  IconButton,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  PlusCircleIcon,
  Bars3Icon,  // Alternative for MenuIcon
  XMarkIcon,  // Alternative for XIcon
} from "@heroicons/react/24/solid";
import {NavLink, useNavigate} from 'react-router-dom'
import { AuthContext } from '../../context/authContext';
import toast from 'react-hot-toast';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const {token,setToken} = useContext(AuthContext)
  const navigate = useNavigate()

  //logout
  const logout = () =>{
    localStorage.removeItem('token')
    setToken("")
    toast.success('Logged out')
    setTimeout(()=> navigate('/'),100)
  }
  return (
    <div>
        <div className={`fixed lg:static top-0 left-0 h-full lg:h-auto lg:w-64 bg-white lg:bg-transparent transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
      <Card className="h-[calc(130vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
        <div className="mb-2 p-4 flex justify-between items-center lg:hidden">
          <Typography variant="h5" color="blue-gray">
            Sidebar
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={toggleSidebar}>
            <XMarkIcon className="h-6 w-6" />
          </IconButton>
        </div>
        <List>
        <NavLink to={'deals-dashboard'}> 

        <ListItem>
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            Dashboard
          </ListItem>
        </NavLink>
        <NavLink to={'add-employee'}>

          <ListItem>
            <ListItemPrefix>
              <PlusCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            Add Employee
          </ListItem>
        </NavLink>
         <NavLink to={'view-employee'}>
         <ListItem>
            <ListItemPrefix>
              <InboxIcon className="h-5 w-5" />
            </ListItemPrefix>
            View Employee
            
          </ListItem>
         </NavLink>
          <ListItem>
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            Your profile
          </ListItem>
        
          <ListItem onClick={()=> logout()}>
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </List>
      </Card>
    </div>
    </div>
  )
}

export default Sidebar