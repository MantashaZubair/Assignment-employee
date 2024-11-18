// import  { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { handleSuccess } from "../../utils";
import "./EmployeeTable.css";
import TableRow from "./TableRow";
import axios from 'axios'
import { useEffect, useState } from "react";
import ConfirmModel from "./ConfirmModel";

const EmployeeTable = ({handleUpdate, user,getAllData, currentPage,limit}) => {
  const [departments, setDepartments] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const headers = ["Sr.No","Name", "Email", "Phone", "Department","Salary", "Actions"];
  const authToken = localStorage.getItem('token');

const openModal=(id)=>{
 setSelectedEmployeeId(id)
 setShowModal(true)
}

const closeModal=()=>{
  setSelectedEmployeeId(null)
  setShowModal(false)
}

  const handleDelete =async()=>{
       try {
        // let answer = window.prompt("Are you sure want to delete this product?")
        // if(!answer) return ;
       await axios.delete(`http://localhost:8082/api/v8/user/${selectedEmployeeId}`)
      handleSuccess(`delete employee`)
      getAllData()
      closeModal();
    } catch (error) {
      console.log(error)
      
    }
  }

 
  // Fetch all departments

  const getDepartments =async()=>{
    try {
      const response= await axios.get("http://localhost:8082/api/v8/category/get-category", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      console.log(response.data)
      setDepartments(response.data)
    } catch (error) {
      console.log(error)  
    }
    }

  useEffect(() => {
    getDepartments(); // Fetch departments when the component mounts
  }, []);
  
  if (!departments) {
    return <div>Loading...</div>; // Return loading state while data is being fetched
  }
  return (
    <>
      <div className="employee-table">
        <table>
          <thead>
            <tr>
              {headers.map((header, i) => (
                <th key={i}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
          {user.length>0?<TableRow handleUpdate={handleUpdate} handleDelete={openModal} data={user} currentPage={currentPage} limit={limit} departments={departments}/>: <tr>
              <td colSpan="6" style={{ textAlign: 'center', fontSize:"22px"}}>
                User not found
              </td>
            </tr> }
          </tbody>
        </table>
        <ToastContainer/>
      </div>
      {/* Confirmation Modal */}
      <ConfirmModel
        show={showModal}
        onClose={closeModal}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this employee?"
      />
    </>
  );
};

export default EmployeeTable;
