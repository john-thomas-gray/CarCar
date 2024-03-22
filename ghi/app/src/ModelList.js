import React, {useEffect, useState } from "react";
import { Link } from 'react-router-dom';

export default function ModelList() {

  const [models, setModels] = useState([]);

  const fetchData = async () => {
    const url = 'http://localhost:8100/api/models/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setModels(data.models)
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <>
      <h1 className="m3 mt-3">Models</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Manufacturer</th>
            <th>Picture</th>
          </tr>
        </thead>
        <tbody>
          {models.map(model => {
            return (
              <tr key={ model.id }>
                <td>{ model.name }</td>
                <td>{ model.manufacturer.name }</td>
                <td>
                  <img src={ model.picture_url } width={125} height={75} />
                </td>
              </tr>
            );
          })}
        </tbody>
    </table>
    <div>
      <p></p>
      <Link className="btn btn-primary" to="/model/new">
        Add a model
      </Link>
    </div>
  </>
  );
}
