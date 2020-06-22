import React, { useState, useEffect, useReducer } from "react";
import Button from "react-bootstrap/Button";
import { fromEvent } from "rxjs";
import { filter, map } from "rxjs/operators";
import axios from "axios";

interface Props {}

interface State {
  firstName: string;
  lastName: string;
  age?: number;
}

type Action =
  | {
      type: "firstName";
      payload: string;
    }
  | {
      type: "lastName";
      payload: string;
    }
  | {
      type: "age";
      payload: number;
    };

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "firstName":
      return { ...state, firstName: action.payload };
    case "lastName":
      return { ...state, lastName: action.payload };
    case "age":
      return { ...state, age: action.payload };
    default:
      return state;
  }
}

const user_default = {
  firstName: "",
  lastName: "",
};

export const UserInsert: React.FC<Props> = () => {
  useEffect(() => {}, []);
  const [user, dispatch] = useReducer(reducer, user_default);
  const [result, setResult] = useState({});
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const endpoint = `http://localhost:3000/users/save`;
    axios
      .post(endpoint, user)
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
            <label htmlFor="title">New User's First Name</label>
            <input
              type="text"
              className="form-control"
              id="title"
              aria-describedby="emailHelp"
              placeholder="john"
              value={user.firstName}
              onChange={(e) =>
                dispatch({ type: "firstName", payload: e.target.value })
              }
            />
            <label htmlFor="title">New User's Last Name</label>
            <input
              type="text"
              className="form-control"
              id="title"
              aria-describedby="emailHelp"
              placeholder="doe"
              value={user.lastName}
              onChange={(e) =>
                dispatch({ type: "lastName", payload: e.target.value })
              }
            />
            <label htmlFor="title">New User's Age</label>
            <input
              type="text"
              className="form-control"
              id="title"
              aria-describedby="emailHelp"
              placeholder="20"
              value={user.age}
              onChange={(e) =>
                dispatch({ type: "age", payload: Number(e.target.value) })
              }
            />
          </div>
          <div className="form-group">
            <div>
              <button type="submit" className="btn btn-primary">
                Add
              </button>
            </div>
          </div>
        </form>
      </div>
      <div>{JSON.stringify(result)}</div>
    </div>
  );
};
