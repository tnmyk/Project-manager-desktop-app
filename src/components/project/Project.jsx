import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../css/Project.css";
import ProjectThumbnail from "../projects/ProjectThumbnail.jsx";
import PouchDB from "pouchdb";
import ProjectMain from "./ProjectMain.jsx";
import { Route, Switch, Link } from "react-router-dom";
import ProjectTodo from "./ProjectTodo.jsx";
import ProjectNotes from "./ProjectNotes.jsx";
import ProjectIdeas from "./ProjectIdeas.jsx";

import { FiCheckCircle, FiBook, FiStar } from "react-icons/fi";
const Project = () => {
  const { id } = useParams();
  const [projectData, setProjectData] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    var db = PouchDB("projects");
    db.get(id)
      .then((doc) => {
        // console.log(doc);
        setProjectData(doc);
      })
      .then(() => {
        setLoading(false);
      });
  }, []);
  return (
    <>
      {!loading && (
        <main style={{ padding: "0", overflow: "auto" }}>
          <div className="project-banner">
            <div
              style={{
                position: "absolute",
                top: "55%",
                left: "3rem",
                display: "flex",
              }}
            >
              <ProjectThumbnail
                emoji={projectData.thumbnail.emoji}
                background={projectData.thumbnail.background}
              />
              <h1 className="project-name">{projectData.name}</h1>
            </div>
          </div>
          <Switch>
            <Route path="/project/:id/todo">
              <ProjectTodo id={id} />
            </Route>
            <Route path="/project/:id/notes">
              <ProjectNotes id={id} />
            </Route>
            <Route path="/project/:id/ideas">
              <ProjectIdeas id={id} />
            </Route>
            <Route exact path="/project/:id">
              <ProjectMain projectData={projectData} id={id} />
            </Route>
          </Switch>
          <div className="project-nav">
            <Link to={`/project/${id}`} className="project-nav-link">
              Overview
            </Link>
            <Link to={`/project/${id}/todo`} className="project-nav-link">
              <FiCheckCircle className="project-nav-icon" />
              Todo
            </Link>
            <Link to={`/project/${id}/notes`} className="project-nav-link">
              <FiBook className="project-nav-icon" /> Notes
            </Link>

            <Link to={`/project/${id}/ideas`} className="project-nav-link">
              <FiStar className="project-nav-icon" />
              Ideas
            </Link>
          </div>
        </main>
      )}
    </>
  );
};

export default Project;
