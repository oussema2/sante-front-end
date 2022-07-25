import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PatientForm from "./pages/PatientForm";
import DoctorRegister from "./pages/DoctorRegister";
import DoctorLogin from "./pages/DoctorLogin";
import DoctorDashboard from "./pages/DoctorDashboard";

function App() {
  return (
    <div className="App bgr-dce0f5  projectFont ">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/patientform" element={<PatientForm />} />
          <Route path="/doctorregister" element={<DoctorRegister />} />
          <Route path="/doctorlogin" element={<DoctorLogin />} />
          <Route path="/dashboard/:_id" element={<DoctorDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
