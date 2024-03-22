import { useEffect, useState } from "react";

function SalesHistoryList(){

  const [salespersons, setSalesPerson] = useState([]);
  const [selectedId, setSelectedId] = useState([]);
  const fetchData = async () => {
    const url = 'http://localhost:8090/api/salesperson/';
    try {
      const response = await fetch(url);
      if (response.ok) {

        const data = await response.json();
        const requests = [];
        for (let person of data.salesperson) {
          const detailUrl = `http://localhost:8090${person.href}`;
          requests.push(fetch(detailUrl));
        }
        const responses = await Promise.all(requests);
        const details = []
        for (const saleResponse of responses){
          details.push( await saleResponse.json())
        }
        setSalesPerson(details)
      }
    } catch (e) {
      console.error(e);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  const handleSelectChange = (e) => {
    setSelectedId(e.target.value);
  };

  const [sales, setSales] = useState([]);
  const fetchDatas = async () => {
    const url = 'http://localhost:8090/api/sale/';
    try {
      const response = await fetch(url);
      if (response.ok) {

        const data = await response.json();
        const requests = [];
        for (let sale of data.sale) {
          const detailUrl = `http://localhost:8090${sale.href}`;
          requests.push(fetch(detailUrl));
        }
        const responses = await Promise.all(requests);
        const details = []
        for (const saleResponse of responses){
          details.push( await saleResponse.json())
        }
        setSales(details)
      }
    } catch (e) {
      console.error(e);
    }
  }
  useEffect(() => {
    fetchDatas();
  }, []);


      return (
        <div className="my-5 container">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Employee Sales History Lookup</h1>
              <form id="create-customer-form">

              <div className="mb-3">
                <select onChange={handleSelectChange} required name="salesperson" id="salesperson" className="form-select">
                  <option value="">Choose Salesperson</option>
                  {salespersons.map(salesperson => {
                    return (
                      <option key={salesperson.href} value={salesperson.id}>{salesperson.employee_id}</option>
                      )
                  })}
                </select>
              </div>
              </form>


            </div>
          </div>
          <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Salesperson</th>
                  <th>Employee ID</th>
                  <th>Vin</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
              {sales.filter(sale => {
                return Number(sale.salesperson.id) === Number(selectedId);
              })
              .map((sale) => (
                  <tr key={sale.id}>
                    <td>{sale.customer.first_name} {sale.customer.last_name}</td>
                    <td>{sale.salesperson.first_name} {sale.salesperson.last_name}</td>
                    <td>{sale.salesperson.employee_id}</td>
                    <td>{sale.automobile.vin}</td>
                    <td>{sale.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>

      )

}
export default SalesHistoryList
