import React from "react";
import unpinnedSvg from "../../../assets/images/unpinned.svg";
import pinnedSvg from "../../../assets/images/pinned.svg";
import { Link } from "react-router-dom";
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
    db.get(id)
      .then(function (doc) {
        return db.put({
          _id: id,
          _rev: doc._rev,
          ...doc,
          pinned: !doc.pinned,
        });
      })
      .then(() => {
        setPinnedProjects(Math.random());
      });
  };
  return (
    <div className="projects-list-item">
      <Link to={`/project/${id}`} style={{ display: "flex" }}>
        <span className="projects-list-item-details">{name}</span>
        <span className="projects-list-item-details">{status}</span>
        <span className="projects-list-item-details">{lmdate}</span>
      </Link>

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
