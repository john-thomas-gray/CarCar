import React, { useState, useEffect } from 'react';

export default function ModelForm() {

  const [models, setModels] = useState([]);
  const [hasSignedUp, setHasSignedUp] = useState(false);

  const initialState = {
    color: '',
    year: '',
    vin:'',
    model_id: ''
  }


  const fetchData = async () => {

    const urlmodel = 'http://localhost:8100/api/models/';
    const responsemodel = await fetch(urlmodel);
    if (responsemodel.ok) {
      const data = await responsemodel.json();
      setModels(data.models);
    }

  };
  useEffect(() => {
    fetchData();
  }, []);


  const [formData, setFormData] = useState(initialState);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const url = 'http://localhost:8100/api/automobiles/';
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
          <h1>Add an Automobile</h1>
          <form onSubmit={handleSubmit} id="create-model-form">

          <div className="form-floating mb-3">
              <input onChange={handleInputChange} placeholder="Color" required type="text" name="color" id="color" className="form-control" value={formData.color}/>
              <label htmlFor="color">Color</label>
            </div>

          <div className="form-floating mb-3">
              <input onChange={handleInputChange} placeholder="Year" required type="text" name="year" id="year" className="form-control" value={formData.year}/>
              <label htmlFor="year">Year</label>
            </div>

            <div className="form-floating mb-3">
              <input onChange={handleInputChange} placeholder="Vin" required type="text" name="vin" id="vin" className="form-control" value={formData.vin}/>
              <label htmlFor="vin">Vin</label>
            </div>

              <div className="mb-3">
                <select onChange={handleInputChange} required name="model_id" id="model_id" className="form-select" value={formData.model_id}>
                  <option value="">Choose a Model</option>
                  {models.map(model => {
                    return (
                      <option key={model.href} value={model.id}>{model.name}</option>
                      )
                  })}
                </select>
              </div>

            <button className="btn btn-primary">Create</button>
          </form>
        </div>
        <div className={`${messageClasses} mt-3`} id="success-message">
          Automobile created!
        </div>
      </div>
    </div>
  )

}
