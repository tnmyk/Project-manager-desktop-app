import React, { useState } from "react";
import "../../css/CreateProject.css";
import Select, { createFilter } from "react-select";
import ProjectCard from "./ProjectCard.jsx";
import { emojis } from "../../emojis";
import PouchDB from "pouchdb";
const Color = ({ color }) => {
  return (
    <div
      style={{
        width: "1rem",
        height: "1rem",
        background: color,
        borderRadius: "50%",
      }}
    ></div>
  );
};

const CreateProject = () => {
  const colorOptions = [
    { value: "#FF5E5E", label: <Color color="#FF5E5E" /> },
    { value: "#64B8D7", label: <Color color="#64B8D7" /> },
    { value: "#C475BE", label: <Color color="#C475BE" /> },
    { value: "#9EC94D", label: <Color color="#9EC94D" /> },
    { value: "#C92642", label: <Color color="#C92642" /> },
    { value: "#3A7F63", label: <Color color="#3A7F63" /> },
  ];
  const options = emojis.map((emoji) => {
    return { value: emoji.char, label: emoji.char + "  " + emoji.name };
  });
  const [thumbnail, setThumbnail] = useState({
    emoji: "😎",
    background: "#FF5E5E",
  });
  const [projectData, setProjectData] = useState({
    projectName: "",
    description: "",
  });
  const handleProjectDataChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setProjectData((prev) => ({ ...prev, [name]: value }));
  };
  const handleEmoji = (e) => {
    setThumbnail({ ...thumbnail, ["emoji"]: e.value });
  };
  const handleBackground = (e) => {
    setThumbnail({ ...thumbnail, ["background"]: e.value });
  };
  const handleSave = () => {
    var db = new PouchDB("projects");
    var doc = {
      name: projectData.projectName,
      description: projectData.description,
      status:'In Development',
      thumbnail:thumbnail,
      lmdate:new Date().toLocaleDateString('en-GB')
    };
    db.post(doc);
  };
  return (
    <main style={{ display: "flex" }} spellCheck="false">
      <div style={{ width: "60%" }}>
        <h1 className="h1">Create New Project</h1>
        <h3 className="heading">Set thumbnail</h3>
        <div
          style={{ display: "flex", alignItems: "center", marginTop: "1rem" }}
        >
          <span className="input-label">Choose Icon</span>
          <div
            style={{ width: "17rem", fontSize: "0.8rem", fontWeight: "500" }}
          >
            <Select
              filterOption={createFilter({ ignoreAccents: false })}
              options={options}
              onChange={handleEmoji}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "1rem",
            marginBottom: "2.5rem",
          }}
        >
          <span className="input-label">Choose background</span>
          <div style={{ width: "8rem", fontSize: "0.8rem", fontWeight: "500" }}>
            <Select
              placeholder={"Color"}
              filterOption={createFilter({ ignoreAccents: false })}
              options={colorOptions}
              onChange={handleBackground}
            />
          </div>
        </div>
        <h3 className="heading">Set Name and Description</h3>
        <input
          type="text"
          name="projectName"
          placeholder="Project Name"
          className="input-project-name"
          value={projectData.projectName}
          onChange={handleProjectDataChange}
        />
        <textarea
          placeholder="Project Description"
          className="input-project-desc"
          name="description"
          value={projectData.description}
          onChange={handleProjectDataChange}
        ></textarea>
        {/* <div
          style={{ display: "flex", alignItems: "center", marginTop: "1rem" }}
        >
          <div className="input-label" style={{ width: "max-content" }}>
            Choose Categories
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{ width: "10rem", fontSize: "0.8rem", fontWeight: "500" }}
            >
              <Select
                placeholder={"Select Categories"}
                filterOption={createFilter({ ignoreAccents: false })}
                options={colorOptions}
                onChange={handleBackground}
              />
            </div>
            <span style={{ fontSize: "0.85rem", marginLeft: "1rem" }}>
              Create new Category
            </span>
          </div>
        </div> */}
        <button
          style={{ marginTop: "0rem" }}
          onClick={handleSave}
          className="bn632-hover bn27"
        >
          Create Project
        </button>
      </div>
      <div
        style={{
          width: "40%",
          display: "flex",
          position: "fixed",
          right: "0",
          height: "100vh",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h4 className="preview-heading">Your Project will be like</h4>
        <ProjectCard
          emoji={thumbnail.emoji}
          background={thumbnail.background}
        />
      </div>
    </main>
  );
};

export default CreateProject;
