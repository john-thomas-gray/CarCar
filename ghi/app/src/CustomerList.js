import { useEffect, useState } from "react";

function CustomerList(){

    const [customers, setCustomer] = useState([]);

    const fetchData = async () => {
      const url = 'http://localhost:8090/api/customer/';
      try {
        const response = await fetch(url);
        if (response.ok) {

          const data = await response.json();
          const requests = [];
          for (let customer of data.customer) {
            const detailUrl = `http://localhost:8090${customer.href}`;
            requests.push(fetch(detailUrl));
          }
          const responses = await Promise.all(requests);
          const details = []
          for (const customerResponse of responses){
            details.push( await customerResponse.json())
          }
          setCustomer(details)
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
    <h1 className="m3 mt-3">Customers</h1>
    <table className="table table-dark table-striped">
      <thead>
        <tr>
          <th>Customer</th>
          <th>Phone Number</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
      {customers.map(customer => {
        return (
          <tr key={customer.id}>
            <td>{customer.first_name} {customer.last_name}</td>
            <td>{customer.phone_number}</td>
            <td>{customer.address}</td>
          </tr>
        );
      })}
      </tbody>
    </table>
  </>
);

}
export default CustomerList
