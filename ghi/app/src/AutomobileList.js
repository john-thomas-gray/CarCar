import React, {useEffect, useState } from "react";
import { Link } from 'react-router-dom';

export default function AutomobileList() {

  const [manufacturors, setAutomobiles] = useState([]);

  const fetchData = async () => {
    const url = 'http://localhost:8100/api/automobiles/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setAutomobiles(data.autos)
    }
  }

  useEffect(() => {
    fetchData();
  }, [])


function checkSold(props) {

  if (props === false){
    return 'No'
  } else {
    return 'Yes'
  }
}

  return (
    <>
      <h1 className="m3 mt-3">Automobiles</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Color</th>
            <th>Year</th>
            <th>Model</th>
            <th>Manufacturer</th>
            <th>Sold</th>
          </tr>
        </thead>
        <tbody>
          {manufacturors.map(automobile => {
            return (
              <tr key={ automobile.id }>
                <td>{ automobile.vin }</td>
                <td>{ automobile.color }</td>
                <td>{ automobile.year }</td>
                <td>{ automobile.model.name }</td>
                <td>{ automobile.model.manufacturer.name }</td>
                <td>{checkSold(automobile.sold)}</td>
              </tr>
            );
          })}
        </tbody>
    </table>
    <div>
      <p></p>
      <Link className="btn btn-primary" to="/automobile/new">
        Add an automobile
      </Link>
    </div>
  </>
  );
}
