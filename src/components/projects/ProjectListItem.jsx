import React from "react";
import unpinnedSvg from "../../../assets/images/unpinned.svg";
import pinnedSvg from "../../../assets/images/pinned.svg";
const ProjectListItem = ({
  name,
  status,
  lmdate,
  id,
  db,
  pinned,
  setPinnedProjects,
}) => {
  const handlePin = () => {
    
    db.get(id).then(function (doc) {
      return db.put({
        _id: id,
        _rev: doc._rev,
        ...doc,
        pinned: !doc.pinned,
      });
    }).then(()=>{
      setPinnedProjects(Math.random());
    });
  };
  return (
    <div className="projects-list-item">
      <span>{name}</span>
      <span>{status}</span>
      <span>{lmdate}</span>
      <div onClick={handlePin}>
        {pinned ? (
          <img src={pinnedSvg} alt="" />
        ) : (
          <img src={unpinnedSvg} alt="" />
        )}
      </div>
    </div>
  );
};

export default ProjectListItem;
