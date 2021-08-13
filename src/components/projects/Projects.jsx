import React, { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard.jsx";
import "../../css/Projects.css";
import ProjectListItem from "./ProjectListItem.jsx";
import { Link } from "react-router-dom";
import PouchDB from "pouchdb";
const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [pinnedProjects, setPinnedProjects] = useState([]);
  var db = new PouchDB("projects");

  useEffect(() => {
    db.allDocs({ include_docs: true, attachments: true }).then((allDocs) => {
      setProjects(allDocs.rows);
      // console.log(allDocs.rows);
    });
  }, [pinnedProjects]);
  return (
    <main>
      <h1 className="h1">Projects</h1>
      <div className="project-cards-container">
        <Link to="/create-project">
          <div className="project-card-main">
            <div className="project-card create-project-card">+</div>
            <div
              style={{
                marginTop: "0.5rem",
                fontSize: "0.85rem",
                fontWeight: "500",
              }}
            >
              Create new project
            </div>
          </div>
        </Link>
        {projects.map((project) => {
          if (!project.doc.pinned) return null;
          return (
            <Link key={project.id} to={`/project/${project.id}`}>
              <ProjectCard
                
                background={project.doc.thumbnail.background}
                emoji={project.doc.thumbnail.emoji}
                name={project.doc.name}
              />
            </Link>
          );
        })}
      </div>
      <h2 className="heading" style={{ fontSize: "1.3rem" }}>
        📌 Pinned Projects
      </h2>
      <div className="projects-list">
        <div className="list-tags projects-list-item">
          <span>Project Name</span>
          <span>Status</span>
          <span>Last Modified</span>
        </div>
        {projects.map((project) => {
          if (!project.doc.pinned) return null;
          return (
            <ProjectListItem
              key={project.id}
              id={project.id}
              db={db}
              name={project.doc.name}
              lmdate={project.doc.lmdate}
              status={project.doc.status}
              setPinnedProjects={setPinnedProjects}
              pinned={project.doc.pinned}
            />
          );
        })}
      </div>
      <h2 className="heading" style={{ fontSize: "1.3rem" }}>
        📌All Projects
      </h2>
      <div className="projects-list">
        <div className="list-tags projects-list-item">
          <span>Project Name</span>
          <span>Status</span>
          <span>Last Modified</span>
        </div>
        {projects.map((project) => {
          return (
            <ProjectListItem
              key={project.id}
              id={project.id}
              db={db}
              name={project.doc.name}
              lmdate={project.doc.lmdate}
              status={project.doc.status}
              pinned={project.doc.pinned}
              setPinnedProjects={setPinnedProjects}
            />
          );
        })}
      </div>
    </main>
  );
};

export default Projects;
