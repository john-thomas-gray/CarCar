import { NavLink } from 'react-router-dom';

export default function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown1" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Sales
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown1">
                <li><NavLink className="dropdown-item" aria-current="page" to="salespersons">Salespersons</NavLink></li>
                <li><NavLink className="dropdown-item" aria-current="page" to="salesperson/new">New Salesperson</NavLink></li>
                <li><NavLink className="dropdown-item" aria-current="page" to="customers">Customers</NavLink></li>
                <li><NavLink className="dropdown-item" aria-current="page" to="customer/new">New Customer</NavLink></li>
                <li><NavLink className="dropdown-item" aria-current="page" to="sales">Sales</NavLink></li>
                <li><NavLink className="dropdown-item" aria-current="page" to="sale/new">New Sale</NavLink></li>
                <li><NavLink className="dropdown-item" aria-current="page" to="/salesperson_history">Sales History</NavLink></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown1" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Services
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown1">
                <li><NavLink className="dropdown-item" aria-current="page" to="/technicians">Technicians</NavLink></li>
                <li><NavLink className="dropdown-item" aria-current="page" to="/technician/new">New Technician</NavLink></li>
                <li><NavLink className="dropdown-item" aria-current="page" to="/appointments">Appointments</NavLink></li>
                <li><NavLink className="dropdown-item" aria-current="page" to="/appointment/new">New Appointment</NavLink></li>
                <li><NavLink className="dropdown-item" aria-current="page" to="service_history">Service History</NavLink></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown1" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Inventory
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown1">
                <li><NavLink className="dropdown-item" aria-current="page" to="/manufacturers">Manufacturers</NavLink></li>
                <li><NavLink className="dropdown-item" aria-current="page" to="manufacturer/new">New Manufacturer</NavLink></li>
                <li><NavLink className="dropdown-item" aria-current="page" to="models">Models</NavLink></li>
                <li><NavLink className="dropdown-item" aria-current="page" to="model/new">New Model</NavLink></li>
                <li><NavLink className="dropdown-item" aria-current="page" to="automobiles">Automobiles</NavLink></li>
                <li><NavLink className="dropdown-item" aria-current="page" to="automobile/new">New Automobile</NavLink></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
