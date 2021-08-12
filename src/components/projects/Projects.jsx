import React from "react";
import ProjectCard from "./ProjectCard.jsx";
import "../../css/Projects.css";
import ProjectListItem from "./ProjectListItem.jsx";
import {Link} from 'react-router-dom'

const Projects = () => {
  return (
    <main>
      <h1 className="h1">Projects</h1>
      <div className="project-cards-container">
        {" "}
        <Link to='/create-project'>
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
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
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
        <ProjectListItem />
        <ProjectListItem />
        <ProjectListItem />
        <ProjectListItem />
        <ProjectListItem />
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
        <ProjectListItem />
        <ProjectListItem />
        <ProjectListItem />
        <ProjectListItem />
        <ProjectListItem />
      </div>
    </main>
  );
};

export default Projects;
