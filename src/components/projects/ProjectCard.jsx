import React from "react";
import ProjectThumbnail from "./ProjectThumbnail.jsx";
const ProjectCard = ({ background, emoji, name }) => {
  return (
    <div className="project-card-main">
      <ProjectThumbnail emoji={emoji} background={background}/>
      <div
        style={{ marginTop: "0.5rem", fontSize: "0.85rem", fontWeight: "500" }}
      >
        {name}
      </div>
    </div>
  );
};

export default ProjectCard;
