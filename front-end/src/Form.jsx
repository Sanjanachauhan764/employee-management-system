import axios from "axios";
import { useState,useEffect } from "react";
import { FaUsers } from "react-icons/fa";
import { FaIdCard } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

function Form(){

    const [id, setID] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [department, setDepartment] = useState("");
    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState("");
    const [editemp, setEditEmp] = useState(null);

    const filteredEmp = employees.filter((emp) => emp.name.toLowerCase().includes(search.toLowerCase()));

    async function getEmployees() {
    const response = await axios.get("http://localhost:5000/employees");
    setEmployees(response.data);
    }
    useEffect(() => {
        getEmployees();
    }, []);

    async function addEmployee(){
        if(!id || !name || !email || !department)
        {
        alert("Please fill all fields");
        return;
        }
        if(!email.includes("@")){
        alert("Enter valid email");
        return;
        }
        if(id <= 0){
        alert("ID must be greater than 0");
        return;
        }
        const newEmployee = {
        id : parseInt(id),
        name,
        email,
        department
        }
    const response = await axios.post("http://localhost:5000/employees",
        newEmployee
    );
    alert(response.data.message);
    getEmployees();
    setID("");
    setName("");
    setEmail("");
    setDepartment("");
    }

    async function updateEmp(){
        if(!id || !name || !email || !department)
        {
        alert("Please fill all fields");
        return;
        }
        if(!email.includes("@")){
        alert("Enter valid email");
        return;
        }
        if(id <= 0){
        alert("ID must be greater than 0");
        return;
        }
        const response = await axios.put(`http://localhost:5000/employees/${editemp}`,
            {
                id : id,
                name : name,
                email : email,
                department : department
            }
        )
        alert(response.data.message);
        getEmployees();
        setID("");
        setName("");
        setEmail("");
        setDepartment("");
        setEditEmp(null);
    }

    async function deleteEmp(id){
        const response = await axios.delete(`http://localhost:5000/employees/${id}`)
        alert(response.data.message);
        getEmployees();
    }


    return(
        <div className="container">
            <div className="form-box">
            <h1 className="heading">
                <FaUsers /><i> Employee Management System </i>
            </h1>
            <h2><i>Total Employees : {employees.length}</i></h2>
            <div className="input-box"><FaIdCard />
            <input type="number" value={id} placeholder="Enter ID" onChange={(e) => setID(e.target.value)}/><br/><br/>
            </div>
            <div className="input-box"><FaUser />
            <input type="text" value={name} placeholder="Enter Name" onChange={(e) => setName(e.target.value)}/><br/><br/>
            </div>
            <div className="input-box"><FaEnvelope />
            <input type="email" value={email} placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)}/><br/><br/>
            </div>
            <div className="input-box"><FaBuilding />
            <input type="text" value={department} placeholder="Enter Department" onChange={(e) => setDepartment(e.target.value)}/><br/><br/>
            </div>
            {
                editemp ? (
                    <button onClick={updateEmp}>Update Emp</button>
                ) : (
                    <button onClick={addEmployee} className="add-btn"><FaPlus />Add</button>
                )
            }<br/><br/>
            <div className="search-btn">
            <input type="text" value={search} placeholder="Search Employee" onChange={(e) => setSearch(e.target.value)}/><br/>
            </div>
            </div>
            {
                filteredEmp.map((emp) => (
                <div key={emp._id} className="card">
                    <p><FaIdCard /> ID : {emp.id}</p>
                    <p><FaUser/> Name : {emp.name}</p>
                    <p><FaEnvelope/> Email : {emp.email}</p>
                    <p><FaBuilding/> Department : {emp.department}</p>
                    <div className="btn-group">
                    <button className="edit-btn" onClick={() => {setID(emp._id); setName(emp.name);setEmail(emp.email);setDepartment(emp.department);setEditEmp(emp._id)}}><FaEdit/>Edit</button>
                    <button className="delete-btn" onClick={() => deleteEmp(emp._id)} style={{marginLeft : "10px"}}><FaTrash/>Delete</button>
                    </div>
                </div>
                ))
            }   
        </div>
    )
}
export default Form;