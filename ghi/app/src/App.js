import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import SalesList from './SalesList';
import SalesForm from './SalesForm';
import CustomerList from './CustomerList';
import CustomerForm from './CustomerForm';
import SalesPersonList from './SalesPersonList';
import SalesPersonForm from './SalesPersonForm';
import TechnicianList from './TechnicianList';
import TechnicianForm from './TechnicianForm';
import AppointmentList from './AppointmentList';
import AppointmentForm from './AppointmentForm';
import ManufacturerList from './ManufacturerList';
import ManufacturerForm from './ManufacturerForm';
import ModelList from './ModelList';
import ModelForm from './ModelForm';
import AutomobileList from './AutomobileList';
import AutomobileForm from './AutomobileForm';
import ServiceHistory from './ServiceHistory';
import SalesHistoryList from './SalesPersonHistory';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="sales" element={<SalesList />} />
          <Route path="sale/new" element={<SalesForm />} />
          <Route path="customers" element={<CustomerList />} />
          <Route path="customer/new" element={<CustomerForm />} />
          <Route path="salespersons" element={<SalesPersonList />} />
          <Route path="salesperson/new" element={<SalesPersonForm />} />
          <Route path="salesperson_history" element={<SalesHistoryList />} />
          <Route path="technicians" element={<TechnicianList />} />
          <Route path="technician/new" element={<TechnicianForm />} />
          <Route path="appointments" element={<AppointmentList />} />
          <Route path="appointment/new" element={<AppointmentForm />} />
          <Route path="manufacturers" element={<ManufacturerList />} />
          <Route path="manufacturer/new" element={<ManufacturerForm />} />
          <Route path="models" element={<ModelList />} />
          <Route path="model/new" element={<ModelForm />} />
          <Route path="automobiles" element={<AutomobileList />} />
          <Route path="automobile/new" element={<AutomobileForm />} />
          <Route path="service_history" element={<ServiceHistory />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
