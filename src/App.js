import logo from './logo.svg';
import './App.css';
import AddForm from './Component/AddForm';
import EmployeeList from './Component/EmployeeList';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="" element={<AddForm />}></Route>
        <Route path="employeList" element={<EmployeeList />}></Route>
        
      </Routes>
    </BrowserRouter>
    // <div className='container'>  
    //   <AddForm/>
    // </div>
  );
}

export default App;
