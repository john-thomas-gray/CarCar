import { useState } from "react";

function SalesPersonForm(){
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        employee_id: ''
      })


      const handleSubmit = async (event) => {
        event.preventDefault();

        const url = 'http://localhost:8090/api/salesperson/';
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
            employee_id: ''
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
              <h1>Add New Salesperson</h1>
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
                  <input onChange={handleFormChange} placeholder="Phone_number" required type="text" name="employee_id" id="employee_id" className="form-control" value={formData.employee_id} autoComplete="id" />
                  <label htmlFor="employee_id">Employee ID</label>
                </div>

                <button className="btn btn-primary">Create</button>
              </form>
            </div>
          </div>
        </div>
      )


}
export default SalesPersonForm
