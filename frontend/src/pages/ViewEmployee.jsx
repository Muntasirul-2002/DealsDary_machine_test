import React, { useContext, useEffect, useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Avatar,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";
import { axiosInstance, getConfig } from "../utils/requestUrl";
import toast from "react-hot-toast";
import { AuthContext } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";

const TABLE_HEAD = [
    "ID",
  "Image",
  "Name",
  "Email",
  "Mobile",
  "Designation",
  "Gender",
  "Course",
  "Date",
  "Action",
];

const ViewEmployee = () => {
  const { url } = useContext(AuthContext);
  const [allEmployees, setAllEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const navigate = useNavigate()


  //fetch all employees data
  const fetchAllEmployees = async () => {
    try {
      await getConfig();
      const response = await axiosInstance.get("/api/employee/all-employees");

      if (response.data.success) {
        setAllEmployees(response.data.allEmployees);
        setFilteredEmployees(response.data.allEmployees);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllEmployees();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchQuery, sortConfig]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const applyFilters = () => {
    let filtered = [...allEmployees];
    // Apply search filter
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((emp) => {
        const name = emp.name ? emp.name.toLowerCase() : "";
        const email = emp.email ? emp.email.toLowerCase() : "";
        const id = emp.id ? emp.id.toLowerCase() : "";
        const query = searchQuery.toLowerCase();
  
        return name.includes(query) || email.includes(query) || id.includes(query);
      });
    }
    // Apply sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.key] || "";
        const bValue = b[sortConfig.key] || "";
  
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
  
    setFilteredEmployees(filtered);
  };

  //format YYYY-MM-DD
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear().toString().slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  //delete a employee
  const handleDelete = async (employeeId) =>{
    try {
        await getConfig()
        const response = await axiosInstance.delete(`/api/employee/delete-employee`,{data : {id:employeeId}})
        if(response.data.success){
            toast.success('Employee deleted')
            await fetchAllEmployees()
            
        }else{
            toast.error('Something went wrong')
        }
    } catch (error) {
        console.log(error)
    }
  }
  return (
    <div>
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <Typography variant="h5" color="blue-gray">
                Employee List
              </Typography>
            </div>
            <div className="flex w-full shrink-0 gap-2 md:w-max">
              <div className="w-full md:w-72">
                <Input
                  type="search"
                  onChange={handleSearch}
                  placeholder="Search..."
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 cursor-pointer"
                    onClick={() => handleSort(head.toLowerCase())}
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                      {sortConfig.key === head.toLowerCase() && (
                        <span className={`ml-2 ${sortConfig.direction === 'asc' ? 'text-blue-500' : 'text-red-500'}`}>
                          {sortConfig.direction === 'asc' ? '▲' : '▼'}
                        </span>
                      )}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.isArray(filteredEmployees) && filteredEmployees.length > 0 ? (
                filteredEmployees.map((employee, index) => {
                  const isLast = index === filteredEmployees.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={employee.id}>
                        <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                         {index +1}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          <Avatar
                            src={`${url}/image/${employee.image}`}
                            alt="avatar"
                          />
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          {employee.name}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {employee.email}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {employee.mobile}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {employee.designation}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {employee.gender}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {employee.course}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {formatDate(employee.date)}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Tooltip content="Edit User">
                          <Link to={`/dashboard/update-employee/${employee._id}`}>
                          <IconButton variant="text">
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                          </Link>
                        </Tooltip>
                      </td>
                      <td className={classes}>
                        <Tooltip content="Delete User">
                          <IconButton onClick={()=> handleDelete(employee._id)} variant="text">
                            <TrashIcon  className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={TABLE_HEAD.length} className="p-4 text-center">
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
};

export default ViewEmployee;
