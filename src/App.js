import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";

import "./App.css";
function App() {
  return (
    <Router>
      <div>
        <Route path="/" exact component={Home} />
        <Route path="/signup" component={Register} />
        <Route path="/login" component={Login} />
      </div>
    </Router>
  );
}
export default App;
