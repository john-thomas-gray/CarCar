import { useEffect, useState } from "react";

function SalesList(){

    const [sales, setSales] = useState([]);

    const fetchData = async () => {
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
      fetchData();
    }, []);

return(
  <>
    <h1 className="m3 mt-3">Sales</h1>
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
      {sales.map(sale => {
        return (
          <tr key={sale.id}>
            <td>{sale.customer.first_name} {sale.customer.last_name}</td>
            <td>{sale.salesperson.first_name} {sale.salesperson.last_name}</td>
            <td>{sale.salesperson.employee_id}</td>
            <td>{sale.automobile.vin}</td>
            <td>{sale.price}</td>
          </tr>
        );
      })}
      </tbody>
    </table>
  </>
);

}
export default SalesList
