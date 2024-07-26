import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { axiosInstance, getConfig } from '../utils/requestUrl'
import toast from 'react-hot-toast'
import { Button, Checkbox, Radio } from '@material-tailwind/react'
import { PhotoIcon } from '@heroicons/react/24/solid'
import { AuthContext } from '../context/authContext'

const UpdateEmployee = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const [employee, setEmployee] = useState({});
    const [image, setImage] = useState(null);
    const { url } = useContext(AuthContext);

    const fetchEmployee = async (employeeId) => {
        try {
            await getConfig();
            const response = await axiosInstance.get(`/api/employee/single-employee/${employeeId}`);

            if (response.data.success) {
                setEmployee(response.data.employee);
            } else {
                toast.error("Employee not found");
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    useEffect(() => {
        if (id) {
            console.log(`Fetching employee with ID: ${id}`);
            fetchEmployee(id);
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee(prev => ({ ...prev, [name]: value }));
    }

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', employee.name);
        formData.append('email', employee.email);
        formData.append('mobile', employee.mobile);
        formData.append('designation', employee.designation);
        formData.append('gender', employee.gender);
        formData.append('course', employee.course);
        if (image) formData.append('image', image);

        try {
            await getConfig();
            const response = await axiosInstance.put(`/api/employee/update-employee/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data.success) {
                toast.success('Employee details updated');
            } else {
                toast.error("Something went wrong");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="space-y-2 flex justify-center items-center m-5">
                    <div className="border-b border-gray-900/10 pb-5">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                            Update Employee
                        </h2>
                        <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        name="name"
                                        type="text"
                                        value={employee.name || ''}
                                        onChange={handleChange}
                                        placeholder="Name"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-4">
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Email
                                </label>
                                <div className="mt-2">
                                    <input
                                        name="email"
                                        type="email"
                                        value={employee.email || ''}
                                        onChange={handleChange}
                                        placeholder="Email"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-4">
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Mobile No
                                </label>
                                <div className="mt-2">
                                    <input
                                        name="mobile"
                                        type="text"
                                        value={employee.mobile || ''}
                                        onChange={handleChange}
                                        placeholder="Mobile No"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-4">
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Designation
                                </label>
                                <div className="mt-2">
                                    <select
                                        name="designation"
                                        value={employee.designation || ''}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block flex-1 w-[450px] p-2.5"
                                    >
                                        <option value="HR">HR</option>
                                        <option value="Manager">Manager</option>
                                        <option value="Sales">Sales</option>
                                    </select>
                                </div>
                            </div>
                            <div className="sm:col-span-4">
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Gender
                                </label>
                                <div className="mt-2">
                                    <div className="flex gap-10">
                                        <label>
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="Male"
                                                checked={employee.gender === 'Male'}
                                                onChange={handleChange}
                                            />
                                            Male
                                        </label>
                                        <label>
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="Female"
                                                checked={employee.gender === 'Female'}
                                                onChange={handleChange}
                                            />
                                            Female
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-full">
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Course
                                </label>
                                <div className="mt-2">
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="course"
                                            value="MCA"
                                            checked={Array.isArray(employee.course) && employee.course.includes('MCA')}
                                            onChange={handleChange}
                                        />
                                        MCA
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="course"
                                            value="BCA"
                                            checked={Array.isArray(employee.course) && employee.course.includes('BCA')}
                                            onChange={handleChange}
                                        />
                                        BCA
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="course"
                                            value="BSA"
                                            checked={Array.isArray(employee.course) && employee.course.includes('BSA')}
                                            onChange={handleChange}
                                        />
                                        BSA
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="course"
                                            value="BTech"
                                            checked={Array.isArray(employee.course) && employee.course.includes('BTech')}
                                            onChange={handleChange}
                                        />
                                        BTech
                                    </label>
                                </div>
                            </div>
                            <div className="sm:col-span-4">
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Photo
                                </label>
                                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                    <div className="text-center">
                                        <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" />
                                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                            <label className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600">
                                                <span>Upload a file</span>
                                                <input
                                                    id="image"
                                                    name="image"
                                                    type="file"
                                                    onChange={handleImageChange}
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
                                Update
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default UpdateEmployee;
