import "./App.css";
import React, { useState, useEffect } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import NavBar from "./componets/NavBar";
import Patients from "./componets/n_Patients";
import Register from "./componets/n_CreatePatient";
import EditPatient from "./componets/n_EditPatient";
import Patient from "./componets/n_DetailPatient";
import Login from "./componets/n_login/n_Login";
import Home from "./componets/n_home";
import Programs from "./componets/n_Programs";
import CreateProgram from "./componets/n_CreateProgram";
import EditProgram from "./componets/n_EditProgram";
import PatientsProgeam from "./componets/n_patients_programs";

import CrudAdd from "./componets/cruds/CrudAdd";
import CrudTable from "./componets/cruds/CrudTable";
import CrudListView from "./componets/cruds/CrudListView";
import CrudGridView from "./componets/cruds/CrudGridView";
import CrudDetails from "./componets/cruds/CrudDetails";
import CrudEdit from "./componets/cruds/CrudEdit";
import CrudDelete from "./componets/cruds/CrudDelete";

import AddnewDoctor from "./componets/cruds/AddnewDoctor";
import Doctorcrudtable from "./componets/cruds/Doctorcrudtable"
import ThHome from "./componets/pages/ThHome";
// Mathy
import AddMedicines from "./componets/m_AddMedicines";
import MedicinesAdmin from "./componets/m_MedicinesAdmin";
import DeliveryDetails from "./componets/m_deliveryDetails";
import Pharmacy from "./componets/m_pharmacy";
import Pay from "./componets/m_pay";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "antd/dist/antd.css";
import P_Dashboard from "./P_Views/P_Dashboard";
import P_ViewAllAppointments from "./P_Views/P_ViewAllAppointments";
import P_Booking from "./P_Views/P_Booking";
import P_Form from "./P_Views/P_Form";
import P_UserEdit from "./P_Views/P_UserEdit";
import P_Details from "./P_Views/P_Details";
import P_AssignDate from "./P_Views/P_AssignDate";
import ProtectedRoute from "./ProtectedRoute";
function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Check for a valid JWT token in local storage
    const token = localStorage.getItem('token');
    if (token) {
      setAuthenticated(true);
    }
  }, []);
  return (
    
    <div className="App">
      
    
      <BrowserRouter>
        <NavBar authenticated={authenticated}/>
        <Routes>
          
          <Route  path="/patients" element={ <ProtectedRoute
                element={<Patients />}
                authenticated={authenticated}
              />}  />

          <Route  path="/editPatient/:id"   element={ <ProtectedRoute
                element={<EditPatient />}
                authenticated={authenticated}
              />}/>
          <Route  path="/patient/:id"  element={ <ProtectedRoute
                element={<Patient />}
                authenticated={authenticated}
              />}/>
          <Route  path="/home"   
                element={<Home />}
               />
          <Route  path="/programs"  element={ <ProtectedRoute
                element={<Programs />}
                authenticated={authenticated}
              />}/>
          <Route  path="/editProgram/:id"  element={ <ProtectedRoute
                element={<EditProgram />}
                authenticated={authenticated}
              />}/>
          <Route  path="/createProgram"  element={ <ProtectedRoute
                element={<CreateProgram />}
                authenticated={authenticated}
              />}/>
          <Route  path="/patientsProgram"  element={ <ProtectedRoute
                element={<PatientsProgeam />}
                authenticated={authenticated}
              />}/>
            <Route  exact path="/thhome"  element={ <ProtectedRoute
                element={<ThHome />}
                authenticated={authenticated}
              />}/>	
          <Route  exact path="/cruds"  element={ <ProtectedRoute
                element={<CrudTable />}
                authenticated={authenticated}
              />}/>					
					<Route  exact path="/cruds/list-view"  element={ <ProtectedRoute
                element={<CrudListView />}
                authenticated={authenticated}
              />}/>
					<Route  exact path="/cruds/grid-view"  element={ <ProtectedRoute
                element={<CrudGridView />}
                authenticated={authenticated}
              />}/>
					<Route  exact path="/cruds/new"  element={ <ProtectedRoute
                element={<CrudAdd />}
                authenticated={authenticated}
              />}/>
					<Route  exact path="/cruds/Doc"  element={ <ProtectedRoute
                element={<AddnewDoctor />}
                authenticated={authenticated}
              />}/>
					<Route  exact path="/cruds/:_id"  element={ <ProtectedRoute
                element={<CrudDetails />}
                authenticated={authenticated}
              />}/>
					<Route  exact path="/cruds/:_id/edit"  element={ <ProtectedRoute
                element={<CrudEdit />}
                authenticated={authenticated}
              />}/>
					<Route  exact path="/cruds/:_id/delete"  element={ <ProtectedRoute
                element={<CrudDelete />}
                authenticated={authenticated}
              />}/>
					<Route  exact path="/cruds/tab"  element={ <ProtectedRoute
                element={<Doctorcrudtable />}
                authenticated={authenticated}
              />}/>
					
         
          <Route  exact path='/addmed'  element={ <ProtectedRoute
                element={<AddMedicines />}
                authenticated={authenticated}
              />}/>
          <Route  path='/show'  element={ <ProtectedRoute
                element={<MedicinesAdmin />}
                authenticated={authenticated}
              />}/>
          <Route  path='/delivery' element={ <ProtectedRoute
                element={<DeliveryDetails />}
                authenticated={authenticated}
              />}/>
          <Route   path="/pay"  element={ <ProtectedRoute
                element={<Pay />}
                authenticated={authenticated}
              />}/>
          <Route  path='/phar'  element={ <ProtectedRoute
                element={<Pharmacy />}
                authenticated={authenticated}
              />}/>
          <Route  path="/labdash"  element={ <ProtectedRoute
                element={<P_Dashboard />}
                authenticated={authenticated}
              />}/>
          <Route  path="/book"  element={ <ProtectedRoute
                element={<P_Booking />}
                authenticated={authenticated}
              />}/>
          <Route  path="/adminview"  element={ <ProtectedRoute
                element={<P_ViewAllAppointments />}
                authenticated={authenticated}
              />}/>
          <Route  path="/form"  element={ <ProtectedRoute
                element={<P_Form />}
                authenticated={authenticated}
              />}/>
          <Route  path="/edit/:id"  element={ <ProtectedRoute
                element={<P_UserEdit />}
                authenticated={authenticated}
              />}/>
          <Route  path="/view"  element={ <ProtectedRoute
                element={<P_Details />}
                authenticated={authenticated}
              />}/>
          <Route  path="/editdate/:id"  element={ <ProtectedRoute
                element={<P_AssignDate />}
                authenticated={authenticated}
              />}/>
       
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
