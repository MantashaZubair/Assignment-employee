import React, { useEffect, useState } from 'react'
import AdminMenu from '../AdminMenu'
import { handleError, handleSuccess } from '../../utils';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
const AddUser = () => {
  const [employee, setEmployee] = useState({
    username:'',
    email:"",
    phone:'',
   password:'',
   department: "",
    
});
const [isSidebarActive, setIsSidebarActive] = useState(false);
const [category, setCategory] = useState([]);
const authToken = localStorage.getItem("token");

const toggleSidebar = () => {
  setIsSidebarActive(!isSidebarActive);
};

const getAllCategory = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8082/api/v8/category/get-category",
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    setCategory(response.data);
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  getAllCategory();
}, []);

const handleChange = (e) => {
  const { name, value } = e.target;
  setEmployee(prevState => ({
    ...prevState,
    [name]: value
  }));
};

// const handleFileChange = (e) => {
//   setEmployee((prevState) => ({
//     ...prevState,
//     photo: e.target.files[0],
//   }));
// };

 

  const resetEmployeeStates = () => {
    setEmployee({
        username: '',
        email: '',
        phone: '',
        password:"",
        department:""
    })
}


  const handleSubmit=async(e)=>{
    e.preventDefault()
    try {
      // const postOption={
      //   method:"POST",
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(form),     
      // }
      const response= await axios.post(`http://localhost:8082/api/v8/auth/register`, employee)
      if(response.status===201){
         handleSuccess(`success: New Account Created`)
        //  setTimeout(()=>{
        //   navigate("/")
        //  },1000)  
        resetEmployeeStates()  
      }
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        console.log('Response error:', error.response.data); // Specific error message from the server
        console.log('Status code:', error.response.status); // HTTP status code
        handleError(`Error: ${error.response.data.message || error.response.data.details[0].message || "Something went wrong"}`); // Show message to user
      } else if (error.request) {
        // No response from the server
        console.log('No response from server:', error.request);
        handleError("No response from server. Please try again later.");
      } else {
        // Other errors, e.g., request configuration or network issues
        console.log('Error:', error.message);
        handleError(`Unexpected error: ${error.message}`);
      
    }
    }
   

  }

  

  return (
    <div className='userContainer'>
       <button className='toggle-button' onClick={toggleSidebar}>
       { isSidebarActive? <>X</>: <>☰</>}
      </button>
      <div className={`sidebar ${isSidebarActive ? 'active' : ''}`}>
        <AdminMenu />
      </div>
      <div className='content'>
      <div className="body-container">
      <div className="addEmployee">
      <h1>Add Employee</h1>
        <form className="addEmployee-container" onSubmit={(e)=>handleSubmit(e)}>
          <div className="input-controls">
            <div className="input-form">
              <label className="form-label">Username:</label>
              <input
                type="text"
                name="username"
                value={employee.username||''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-form">
              <label className="form-label">Email:</label>
              <input
                type="email"
                name="email"
                value={employee.email||''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-form">
              <label className="form-label">Password:</label>
              <input
                type="text"
                name="password"
                value={employee.password||''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-form">
              <label className="form-label">phone:</label>
              <input
                type="text"
                name="phone"
                value={employee.phone||''}
                onChange={handleChange}
            
              />
            </div>

            <div className="input-form">
              <label className="form-label">Department:</label>
              <select
                name="department"
                className="department"
                value={employee.department || ""}
                onChange={handleChange}
              >
                <option value="">Select a department</option>
                {category.length > 0 &&
                  category.map((citem) => (
                    <option key={citem._id} value={citem._id}>
                      {citem.department}
                    </option>
                  ))}
              </select>
            </div>
      
            <button type="submit" className="save-btn">
               Save
            </button>
          </div>
        </form>
      </div>
  </div>
  <ToastContainer/>
 </div>


      </div>
      
  )
}

export default AddUser