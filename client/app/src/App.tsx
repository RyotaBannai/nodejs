import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { Template } from "./templates/Template";
import { Main } from "./pages/Main";
import { AddUser } from "./pages/AddUser";
import { AddWord } from "./pages/AddWord";

function App() {
  return (
    <div className="App">
      <Router>
        <Template>
          <Route exact path="/" component={Main} />
          <Route exact path="/user_insert" component={AddUser} />
          <Route exact path="/word_insert" component={AddWord} />
        </Template>
      </Router>
    </div>
  );
}

export default App;
