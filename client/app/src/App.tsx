import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { Template } from "./templates/Template";
import { Main } from "./pages/Main";
import { AddUser } from "./pages/AddUser";

function App() {
  return (
    <div className="App">
      <Router>
        <Template>
          <Route exact path="/" component={Main} />
          <Route exact path="/insert" component={AddUser} />
        </Template>
      </Router>
    </div>
  );
}

export default App;
