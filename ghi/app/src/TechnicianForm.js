import React, { useState } from 'react';

export default function TechnicianForm() {

  const initialState = {
    first_name: '',
    last_name: '',
    employee_id: '',
  }

  const [formData, setFormData] = useState(initialState);
  const [hasSignedUp, setHasSignedUp] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const url = 'http://localhost:8080/api/technicians/';
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
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


  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });

  }

  let messageClasses = 'alert alert-success d-none mb-0';
  if (hasSignedUp) {
    messageClasses = 'alert alert-success mb-0';
  }

  return(
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Add a Technician</h1>
          <form onSubmit={handleSubmit} id="create-technician-form">
            <div className="form-floating mb-3">
              <input onChange={handleInputChange} placeholder="First name"
              required type="text" name="first_name" id="first_name" className="form-control"
              value={formData.first_name} autoComplete="given-name"/>
              <label htmlFor="first_name">First Name</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleInputChange} placeholder="Last name" required type="text"
              name="last_name" id="last_name" className="form-control" value={formData.last_name}
              autoComplete="family-name"/>
              <label htmlFor="last_name">Last Name</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleInputChange} placeholder="Employee ID" required type="text"
              name="employee_id" id="employee_id" className="form-control" value={formData.employee_id}
              autoComplete="off"/>
              <label htmlFor="employee_id">Employee ID</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
        <div className={`${messageClasses} mt-3`} id="success-message">
          Technician created!
        </div>
      </div>
    </div>
  )




}
