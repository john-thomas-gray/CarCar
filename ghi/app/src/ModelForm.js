import React, { useState, useEffect } from 'react';

export default function ModelForm() {

  const [manufacturers, setManufacturers] = useState([]);
  const [hasSignedUp, setHasSignedUp] = useState(false);
  const initialState = {
    name: '',
    picture_url: '',
    manufacturer_id: ''
  }


  const fetchData = async () => {
    const urlm = 'http://localhost:8100/api/manufacturers/';
    const response = await fetch(urlm);
    if (response.ok) {
      const data = await response.json();
      setManufacturers(data.manufacturers);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);


  const [formData, setFormData] = useState(initialState);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const url = 'http://localhost:8100/api/models/';
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
          <h1>Add a Model</h1>
          <form onSubmit={handleSubmit} id="create-model-form">

          <div className="form-floating mb-3">
              <input onChange={handleInputChange} placeholder="Name" required type="text"
              name="name" id="name" className="form-control" value={formData.name}
              autoComplete="off"/>
              <label htmlFor="name">Name</label>
            </div>

          <div className="form-floating mb-3">
              <input onChange={handleInputChange} placeholder="Picture" required type="text" name="picture_url" id="picture_url" className="form-control" value={formData.picture_url}/>
              <label htmlFor="picture_url">Picture</label>
            </div>

          <div className="mb-3">
                <select onChange={handleInputChange} required name="manufacturer_id" id="manufacturer_id" className="form-select" value={formData.manufacturer_id}>
                  <option value="">Choose a Manufacturer</option>
                  {manufacturers.map(manufacturers => {
                    return (
                      <option key={manufacturers.href} value={manufacturers.id}>{manufacturers.name}</option>
                      )
                  })}
                </select>
              </div>

            <button className="btn btn-primary">Create</button>
          </form>
        </div>
        <div className={`${messageClasses} mt-3`} id="success-message">
          Model created!
        </div>
      </div>
    </div>
  )

}
