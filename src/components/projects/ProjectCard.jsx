import React from "react";
const ProjectCard = ({ background, emoji, name }) => {
  return (
    <div className="project-card-main">
      <div
        className="project-card"
        style={{ fontSize: "2rem", backgroundColor: background }}
      >
        {emoji}
      </div>
      <div
        style={{ marginTop: "0.5rem", fontSize: "0.85rem", fontWeight: "500" }}
      >
        {name}
      </div>
    </div>
  );
};

export default ProjectCard;
