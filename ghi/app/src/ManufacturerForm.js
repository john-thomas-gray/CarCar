import React, { useState } from 'react';

export default function ManufacturerForm() {

  const initialState = {
    name: '',
  }

  const [formData, setFormData] = useState(initialState);
  const [hasSignedUp, setHasSignedUp] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const url = 'http://localhost:8100/api/manufacturers/';
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

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Add a Manufacturer</h1>
          <form onSubmit={handleSubmit} id="create-manufacturer-form">
            <div className="form-floating mb-3">
              <input onChange={handleInputChange} placeholder="Name" required type="text"
              name="name" id="name" className="form-control" value={formData.name}
              autoComplete="off"/>
              <label htmlFor="name">Name</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
        <div className={`${messageClasses} mt-3`} id="success-message">
          Manufacturer created!
        </div>
      </div>
    </div>
  )

}
