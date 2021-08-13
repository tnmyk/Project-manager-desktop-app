import React from 'react';
import { Link } from 'react-router-dom';
const ProjectMain = ({projectData,id}) => {

  return (
      <div className="project-main">
        <h4 className=" project-subheading">Description </h4>
        {projectData.description}
        {/* <div className="project-tools-container">
          <Link to={`/project/${id}/todo`} className="project-tool">
            <div >ToDo</div>
          </Link>
          <div className="project-tool">Notes</div>
          <div className="project-tool">Ideas</div>
        </div> */}
        
      </div>
    );
}
 
export default ProjectMain;