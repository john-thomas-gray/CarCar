import { useEffect, useState } from "react";

function SalesPersonList(){

    const [salespersons, setSalesPerson] = useState([]);

    const fetchData = async () => {
      const url = 'http://localhost:8090/api/salesperson/';
      try {
        const response = await fetch(url);
        if (response.ok) {

          const data = await response.json();
          const requests = [];
          for (let salesperson of data.salesperson) {
            const detailUrl = `http://localhost:8090${salesperson.href}`;
            requests.push(fetch(detailUrl));
          }
          const responses = await Promise.all(requests);
          const details = []
          for (const salespersonResponse of responses){
            details.push( await salespersonResponse.json())
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

return(
  <>
    <h1 className="m3 mt-3">Salespersons</h1>
    <table className="table table-dark table-striped">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Employee_id</th>
        </tr>
      </thead>
      <tbody>
      {salespersons.map(customer => {
        return (
          <tr key={customer.id}>
            <td>{customer.first_name}</td>
            <td> {customer.last_name}</td>
            <td>{customer.employee_id}</td>
          </tr>
        );
      })}
      </tbody>
    </table>
  </>
);

}
export default SalesPersonList
