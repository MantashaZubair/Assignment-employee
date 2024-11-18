import React, { useState, useEffect } from 'react';
import { MdOutlineDateRange, MdOutlineLocationOn } from 'react-icons/md';
import '../AdminProfile/AdminProfile.css'; // Profile page styles
import profilepic from '../../../images/sideimage.jpg';
import { ToastContainer } from 'react-toastify';
import AdminMenu from '../../AdminMenu';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import UpdateEmployee from '../Employess/UpdateEmployee';
import { handleSuccess } from '../../../utils';

const UserProfile = () => {
  const [employee, setEmployee] = useState(null);
  const [departmentName, setDepartmentName] = useState(''); // State to store department name
  const [profileUpdate, setProfileUpdate] = useState(false);
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarActive(!isSidebarActive);
  };
  const { id } = useParams();

  // Fetch employee details
  const getuser = async () => {
    try {
      const response = await axios.get(`http://localhost:8082/api/v8/user/${id}`);
      setEmployee(response.data);

      // Fetch department by ID if department exists in employee data
      console.log(response.data)
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(employee?employee.dob.slice(0,10):"")
  // Fetch department details by ID
  const getDepartmentById = async (departmentId) => {
    try {
      const response = await axios.get(`http://localhost:8082/api/v8/category/getsinglecategory/${departmentId}`);
      console.log(response.data.getsingle.department)
      setDepartmentName(response.data.getsingle.department); // Assuming response contains department name
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getuser();
  }, [id]);

  useEffect(() => {
    if (employee?.department) {
      getDepartmentById(employee.department);
    }
  }, [employee?.department]);
 

  const handleUpdateProfile = (updatedUser) => {
    setEmployee(updatedUser); 
    handleSuccess(`Success: User Updated`);
  };



   if (!employee) {
    return <div>Loading...</div>; // Return loading state while data is being fetched
  }
  return (
    <div className="userContainer">
         <button className='toggle-button' onClick={toggleSidebar}>
       { isSidebarActive? <>X</>: <>☰</>}
      </button>
      <div className={`sidebar ${isSidebarActive ? 'active' : ''}`}>
        <AdminMenu />
      </div>
      <div className="content">
        <div className="profile-card">
          <div>
            <img src={employee.profileImage || profilepic} alt="Profile" className="profile-image" />
          </div>
          <div className="contentbox">
            <h1>Role: {employee.isAdmin === false ? 'Employee' : 'Admin'}</h1>
            <h2>@{employee.username}</h2>
            <p>Name: {employee.name || 'Update your name'}</p>
            <p>Email: {employee.email}</p>
            <p>Phone: {employee.phone}</p>
           <div className="datelocation">
           { employee.dob && <span>
                <MdOutlineDateRange className="profileicon" />
                {employee.dob ?employee.dob.slice(0,10) : 'dob'}
              </span>}
              { employee.location && <span>
                <MdOutlineLocationOn className="profileicon" />
                {employee.location || "location_on"}
              </span>}
            </div>
          
           {employee.salary&& <p>Salary: {employee.salary ? employee.salary : 'Restricted'}</p>}
           { departmentName &&<p>Department: {departmentName || 'Restricted'}</p>} {/* Display fetched department name */}
            <p>Join Date: {employee.createdAt.slice(0,10)}</p>
          </div>
          <button className="btn update-btn" onClick={() => setProfileUpdate(true)}>
            Update Profile
          </button>
        </div>
        {profileUpdate ? (
          <UpdateEmployee
            employeeobj={employee}
            setProfileUpdate={setProfileUpdate}
            handleUpdateProfile={handleUpdateProfile}
          />
        ) : null}
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserProfile;
