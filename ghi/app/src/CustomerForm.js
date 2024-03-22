import { useState } from "react";

function CustomerForm(){

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        phone_number: '',
        address: ''
      })


      const handleSubmit = async (event) => {
        event.preventDefault();

        const url = 'http://localhost:8090/api/customer/';
        const fetchConfig = {
          method: "post",

          body: JSON.stringify(formData),
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const response = await fetch(url, fetchConfig);

        if (response.ok) {

          setFormData({
            first_name: '',
            last_name: '',
            phone_number: '',
            address: ''
          });
        }
      }

      const handleFormChange = (e) => {
        const value = e.target.value;
        const inputName = e.target.name;

        setFormData({

          ...formData,


          [inputName]: value
        });
      }
      return (
        <div className="my-5 container">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Add new customer</h1>
              <form onSubmit={handleSubmit} id="create-customer-form">

                <div className="form-floating mb-3">
                  <input onChange={handleFormChange} placeholder="First_name" required type="text" name="first_name" id="first_name" className="form-control" value={formData.first_name} autoComplete="first_name" />
                  <label htmlFor="first_name">First Name</label>
                </div>

                <div className="form-floating mb-3">
                  <input onChange={handleFormChange} placeholder="Last_name" required type="text" name="last_name" id="last_name" className="form-control" value={formData.last_name} autoComplete="family_name" />
                  <label htmlFor="last_name">Last Name</label>
                </div>

                <div className="form-floating mb-3">
                  <input onChange={handleFormChange} placeholder="Phone_number" required type="text" name="phone_number" id="phone_number" className="form-control" value={formData.phone_number} autoComplete="phone" />
                  <label htmlFor="phone_number">Phone Number</label>
                </div>

                <div className="form-floating mb-3">
                  <input onChange={handleFormChange} placeholder="Address" required type="text" name="address" id="address" className="form-control" value={formData.address} autoComplete="address" />
                  <label htmlFor="address">Address</label>
                </div>

                <button className="btn btn-primary">Create</button>
              </form>
            </div>
          </div>
        </div>
      )

}
export default CustomerForm
