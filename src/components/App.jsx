import React, { useEffect } from "react";
import Nav from "./Nav.jsx";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Projects from "./projects/Projects.jsx";
import CreateProject from "./projects/CreateProject.jsx";
import Project from './project/Project.jsx'
const App = () => {
  
  return (
    <Router>
      <div className="app">
        <Nav />
        <Switch>
          <Route exact path="/">
            asd
          </Route>
          <Route exact path="/projects" component={Projects} />
          <Route path="/project/:id" component={Project} />
          <Route exact path="/create-project" component={CreateProject} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;