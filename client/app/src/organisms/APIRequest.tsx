import React, { useState, useEffect, SyntheticEvent } from "react";
import Button from "react-bootstrap/Button";
import { fromEvent } from "rxjs";
import { filter, map } from "rxjs/operators";
import axios from "axios";

interface Props {}

const request = (e: SyntheticEvent) => {};

export const APIRequest: React.FC<Props> = () => {
  useEffect(() => {}, []);
  const [value, setValue] = useState<number>(0);
  const [result, setResult] = useState<object>({});
  const handleChange = (e: any) => setValue(e.target.value);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const endpoint = `http://localhost:3000/users/${value}`;
    console.log(endpoint);
    axios
      .get(endpoint)
      .then((response) => {
        setResult(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <h2>Implement API request </h2>
      <div className="col-md-6">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">User Id you want fetch</label>
            <input
              type="text"
              className="form-control"
              id="title"
              aria-describedby="emailHelp"
              placeholder="Article Title"
              value={value}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <div>
              <button type="submit" className="btn btn-primary">
                Fetch
              </button>
            </div>
          </div>
        </form>
      </div>
      <div>{JSON.stringify(result)}</div>
    </div>
  );
};
