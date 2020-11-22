import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFoundPage from "./pages/NotFound";

import test from "./components/Upload/Image";

import "./App.css";
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/test" component={test} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
}
export default App;
