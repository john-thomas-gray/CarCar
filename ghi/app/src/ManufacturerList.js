import React, {useEffect, useState } from "react";
import { Link } from 'react-router-dom';

export default function ManufacturerList() {

  const [manufacturors, setManufacturers] = useState([]);

  const fetchData = async () => {
    const url = 'http://localhost:8100/api/manufacturers/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setManufacturers(data.manufacturers)
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <>
      <h1 className="m3 mt-3">Manufacturers</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {manufacturors.map(manufacturer => {
            return (
              <tr key={ manufacturer.id }>
                <td>{ manufacturer.name }</td>
              </tr>
            );
          })}
        </tbody>
    </table>
    <div>
      <p></p>
      <Link className="btn btn-primary" to="/manufacturer/new">
        Add a manufacturer
      </Link>
    </div>
  </>
  );
}
