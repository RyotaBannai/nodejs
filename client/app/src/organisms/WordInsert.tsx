import React, { useState, useEffect, useReducer } from "react";
import Button from "react-bootstrap/Button";
import { fromEvent } from "rxjs";
import { filter, map } from "rxjs/operators";
import axios from "axios";

interface Props {}

interface State {
  name: string;
}

type Action = {
  type: "name";
  payload: string;
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "name":
      return { ...state, name: action.payload };
    default:
      return state;
  }
}

const word_default = {
  name: "",
};

export const WordInsert: React.FC<Props> = () => {
  useEffect(() => {}, []);
  const [word, dispatch] = useReducer(reducer, word_default);
  const [result, setResult] = useState({});
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const endpoint = `http://localhost:3000/items/save`;
    console.log(word);
    console.log(endpoint);
    axios
      .post(endpoint, word)
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
            <label htmlFor="title">New Word</label>
            <input
              type="text"
              className="form-control"
              id="title"
              aria-describedby="emailHelp"
              placeholder="Eat"
              value={word.name}
              onChange={(e) =>
                dispatch({ type: "name", payload: e.target.value })
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
