import React from 'react'
const ProjectThumbnail = ({background,emoji}) => {
    return (
      <div
        className="project-card"
        style={{ fontSize: "2rem", backgroundColor: background }}
      >
        {emoji}
      </div>
    );
}
 
export default ProjectThumbnail;