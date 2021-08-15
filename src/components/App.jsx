import React, { useEffect } from "react";
import Nav from "./Nav.jsx";
import { HashRouter as Router, Switch, Route,Redirect,Link } from "react-router-dom";
import Projects from "./projects/Projects.jsx";
import CreateProject from "./projects/CreateProject.jsx";
import Project from './project/Project.jsx'
import {BiHomeAlt} from 'react-icons/bi'
const App = () => {
  
  return (
    <Router>
      <div className="app">
        {/* <Nav /> */}
        <Link to="/projects" style={{ marginTop: "1rem",display:'flex',alignItems:'center',position:'absolute',top:'0rem',left:'1rem',zIndex:'10000' }}>
          <BiHomeAlt className="nav-icon" />
          Home
        </Link>
        <Switch>
          <Route exact path="/">
            <Redirect to="/projects" />
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
