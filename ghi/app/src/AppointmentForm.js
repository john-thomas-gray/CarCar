import React, { useState, useEffect } from 'react';

export default function AppointmentForm() {

  const [technicians, setTechnicians] = useState([]);
  const [hasSignedUp, setHasSignedUp] = useState(false);

  const initialState = {
    vin: '',
    customer:'',
    date_time: '',
    technician: '',
    reason: '',
  };

  const [formData, setFormData] = useState(initialState);

  const fetchData = async () => {
    const url = 'http://localhost:8080/api/technicians/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setTechnicians(data.technicians);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = 'http://localhost:8080/api/appointments/';

    const fetchConfig = {
      method: 'post',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const response = await fetch(url, fetchConfig);

    if (response.ok) {
      setFormData(initialState);
      setHasSignedUp(true);
    }

    setTimeout(() => {
      setHasSignedUp(false);
    }, 3000);
  }

  const handleFormChange = (e) => {
    const value = e.target.value;
    const inputName = e.target.name;
    setFormData({
      ...formData,
      [inputName]: value
    });

  }

  let messageClasses = 'alert alert-success d-none mb-0';
  if (hasSignedUp) {
    messageClasses = 'alert alert-success mb-0';
  }

  return (

    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a Service Appointment</h1>
          <form onSubmit={handleSubmit} id="create-appointment-form">
            <div className="form-floating mb-3">
              <input onChange={handleFormChange} placeholder="VIN" required type="text" name="vin" id="vin" className="form-control" value={formData.vin}/>
              <label htmlFor="vin">Automobile VIN</label>
            </div>

            <div className="form-floating mb-3">
              <input onChange={handleFormChange} placeholder="Customer" required type="text" name="customer" id="customer" className="form-control" value={formData.customer}/>
              <label htmlFor="customer">Customer</label>
            </div>

            <div className="form-floating mb-3">
              <input onChange={handleFormChange} placeholder="Date_time" required type="datetime-local" name="date_time" id="date_time" className="form-control" value={formData.date_time}/>
              <label htmlFor="date_time">Date_time</label>
            </div>

            <div className="mb-3">
              <select onChange={handleFormChange} required name="technician" id="technician" className="form-select" value={formData.technician}>
                <option value="">Choose a technician...</option>
                {technicians.map(technician => {
                  return (
                    <option key={technician.id} value={technician.id}>{technician.first_name} {technician.last_name}</option>
                  )
                })}
              </select>
            </div>

            <div className="form-floating mb-3">
              <input onChange={handleFormChange} placeholder="Reason" required type="text" name="reason" id="reason" className="form-control" value={formData.reason}/>
              <label htmlFor="reason">Reason</label>
            </div>

            <button className="btn btn-primary">Create</button>
          </form>
        </div>
        <div className={`${messageClasses} mt-3`} id="success-message">
          Appointment created!
        </div>
      </div>
    </div>
  )
}
