import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

export default function TechnicianList() {

  const [technicians, setTechnicians] = useState([]);

  const fetchData = async () => {
    const url = 'http://localhost:8080/api/technicians/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setTechnicians(data.technicians);
    }
  }

  useEffect(() => {
    fetchData();
    }, [])

  return(
    <>
    <h1 className="m3 mt-3">Technicians</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {technicians.map(technician => {
            return (
              <tr key={ technician.id }>
                <td>{ technician.employee_id }</td>
                <td>{ technician.first_name }</td>
                <td>{ technician.last_name }</td>
              </tr>
            );
          })}
        </tbody>
    </table>
    <div>
      <p></p>
      <Link className="btn btn-primary" to="/technician/new">
        Add a technician
      </Link>
    </div>
  </>
);

}
