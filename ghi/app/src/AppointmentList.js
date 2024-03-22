import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

export default function AppointmentList() {

  const [appointments, setAppointments] = useState([]);
  const [automobiles, setAutomobiles] = useState([]);

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

  const handleCancel = async (event) => {
    const id = event.target.id;
    const url = `http://localhost:8080/api/appointments/${id}/cancel/`;
    const fetchConfig = {
      method: 'PUT',
    }
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      fetchData('http://localhost:8080/api/appointments/');
    }
    else {
      console.error("Response not okay");
    }

  }
  const handleFinish = async (event) => {
    const id = event.target.id;
    const url = `http://localhost:8080/api/appointments/${id}/finish/`;
    const fetchConfig = {
      method: 'PUT',
    }
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      fetchData('http://localhost:8080/api/appointments/');
    }
    else {
      console.error("Response not okay");
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


  useEffect(() => {
    fetchData('http://localhost:8080/api/appointments/');
    fetchData('http://localhost:8100/api/automobiles/');
    }, [])

  return(
    <>
      <h1 className="m3 mt-3">Service Appointments</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Employee VIN</th>
            <th>Is VIP?</th>
            <th>Customer</th>
            <th>Date / Time</th>
            <th>Technician</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(appointment => {
            if(appointment.status == "scheduled")
            {
              return (
                <tr key={ appointment.id }>
                  <td>{ appointment.vin }</td>
                  <td>{ checkVIP(appointment.vin) }</td>
                  <td>{ appointment.customer }</td>
                  <td>{ appointment.date_time }</td>
                  <td>{ appointment.technician.first_name } { appointment.technician.last_name }</td>
                  <td>{ appointment.reason }</td>
                  <td>
                  <button onClick={handleCancel} id={appointment.id} style={{ borderColor: 'red', backgroundColor: 'red' }} className="btn btn-danger text-white mr-2 ml-2">Cancel</button>
                  <button onClick={handleFinish} id={appointment.id} style={{ borderColor: 'green', backgroundColor: 'green'}} className="btn text-white mr-2 ml-2">Finish</button>
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
    </table>
    <div>
      <p></p>
      <Link className="btn btn-primary" to="/appointment/new">
        Create a service appointment
      </Link>
    </div>
  </>
);

}
