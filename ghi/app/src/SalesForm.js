import { useEffect, useState } from "react";

function SalesForm(){
    const [vins, setVin] = useState([])
    const [salesPersons, setSalesPerson] = useState([])
    const [customers, setCustomer] = useState([])

    const [formData, setFormData] = useState({
      customer: '',
      salesperson: '',
      price: '',
      automobile: ''
    })

    const fetchData = async () => {
      const url = 'http://localhost:8100/api/automobiles/';
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setVin(data.autos);
      }
      const urlsalesperson = 'http://localhost:8090/api/salesperson/';
      const responsesalesperson = await fetch(urlsalesperson);
      if (responsesalesperson.ok) {
        const datasalesperson = await responsesalesperson.json();
        setSalesPerson(datasalesperson.salesperson);
      }
      const urlcustomer = 'http://localhost:8090/api/customer/';
      const responsecustomer = await fetch(urlcustomer);
      if (responsecustomer.ok) {
        const datacustomer = await responsecustomer.json();
        setCustomer(datacustomer.customer);
      }
    }

    useEffect(() => {
      fetchData();
    }, []);

    const handleSubmit = async (event) => {
      event.preventDefault();

      const url_auto = `http://localhost:8100/api/automobiles/${formData.automobile}/`
      const newData = {
        sold: true
      };

      const fetchConfigAuto = {
        method: "PUT",
        body: JSON.stringify(newData),
        headers: {
          'Content-Type': 'application/json',
        },
      };

       fetch( url_auto, fetchConfigAuto)
/////////////////////////////////////////////////////////////////////

      const url = 'http://localhost:8090/api/sale/';
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
        customer: '',
        salesperson: '',
        price: '',
        automobile: ''
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
            <h1>Add new sale</h1>
            <form onSubmit={handleSubmit} id="create-sale-form">

              <div className="form-floating mb-3">
                <input onChange={handleFormChange} placeholder="Price" required type="text" name="price" id="price" className="form-control" value={formData.price} autoComplete="price" />
                <label htmlFor="price">Price</label>
              </div>

              <div className="mb-3">
                <select onChange={handleFormChange} required name="salesperson" id="salesperson" className="form-select" value={formData.salesperson} >
                  <option value="">Choose Salesperson</option>
                  {salesPersons.map(salesperson => {
                    return (
                      <option key={salesperson.href} value={salesperson.id}>{salesperson.employee_id}</option>
                      )
                  })}
                </select>
              </div>

              <div className="mb-3">
                <select onChange={handleFormChange} required name="customer" id="customer" className="form-select" value={formData.customer} >
                  <option value="">Choose Customer</option>
                  {customers.map(customer => {
                    return (
                      <option key={customer.href} value={customer.id}>{customer.first_name} {customer.last_name}</option>
                      )
                  })}
                </select>
              </div>

              <div className="mb-3">
                <select onChange={handleFormChange} required name="automobile" id="automobile" className="form-select" value={formData.automobile} >
                  <option value="">Choose a Vin</option>
                  {vins.filter(vin => {
                    return (vin.sold) === (false);
                   })
                   .map ((vin) => (
                      <option key={vin.id} value={vin.vin}>{vin.vin}</option>
                      )
                  )}
                </select>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    )

}
export default SalesForm
