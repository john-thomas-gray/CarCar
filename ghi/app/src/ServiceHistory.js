import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

export default function ServiceHistory() {

  const [appointments, setAppointments] = useState([]);
  const [automobiles, setAutomobiles] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = async (url) => {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      if (url.includes('api/appointments/') )
      {
        setAppointments(data.appointments);
      }
      else // 'api/automobiles/'
      {
        setAutomobiles(data.autos);
      }
    }
  }

  const checkVIP = (vin) => {
    for (var automobile of automobiles)
    {
      if (vin == automobile.vin)
      {
        return "Yes";
      }
    }
    return "No";
  }

  const handleSearchChange = (event) => {
    const inputValue = event.target.value;
    setSearchInput(inputValue);
  }


  const handleSearch = (event) => {
    event.preventDefault();
    const inputValue = event.target.querySelector('#appointment_filter').value;
    setSearchQuery(inputValue);
  };

  useEffect(() => {
    fetchData('http://localhost:8080/api/appointments/');
    fetchData('http://localhost:8100/api/automobiles/');
    }, [])

  return(

      <div className="my-5 container">
              <h1>Service History</h1>
        <div>
            <div className="p-4 mt-4">
              <h2>Lookup VIN</h2>
              <form id="service-history-form" onSubmit={(handleSearch)}>
              <div className="mb-3">
                <input onChange={handleSearchChange} value={searchInput} required name="appointment" id="appointment_filter" className="input"></input>
                <button type="submit">Submit</button>
              </div>
              </form>
            </div>
          </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Employee VIN</th>
            <th>Is VIP?</th>
            <th>Customer</th>
            <th>Date / Time</th>
            <th>Technician</th>
            <th>Reason</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
        {searchQuery.length > 0 ? (
          appointments
          .filter(appointment => appointment.vin === searchQuery)
          .map(appointment => (
            <tr key={appointment.id}>
                <td>{appointment.vin}</td>
                <td>{checkVIP(appointment.vin)}</td>
                <td>{appointment.customer}</td>
                <td>{appointment.date_time}</td>
                <td>{appointment.technician.first_name} {appointment.technician.last_name}</td>
                <td>{appointment.reason}</td>
                <td>{appointment.status}</td>
              </tr>
            ))
            ) : (
              appointments.map(appointment => (
                <tr key={appointment.id}>
              <td>{appointment.vin}</td>
              <td>{checkVIP(appointment.vin)}</td>
              <td>{appointment.customer}</td>
              <td>{appointment.date_time}</td>
              <td>{appointment.technician.first_name} {appointment.technician.last_name}</td>
              <td>{appointment.reason}</td>
              <td>{appointment.status}</td>
            </tr>
          ))
          )}
        </tbody>
    </table>
    {/* Reset table */}
    {searchQuery.length > 0 && (
      <div>
        <button onClick={() => {
          setSearchInput('');
          setSearchQuery('');
        }}>See all</button>
      </div>
    )}
    <div>
      <p></p>
      <Link className="btn btn-primary" to="/appointment/new">
        Create a service appointment
      </Link>
    </div>
  </div>

);

}
