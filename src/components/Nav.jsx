import React from 'react'
import { Link } from 'react-router-dom';
import { BiHomeAlt, BiBulb } from "react-icons/bi";
import {AiOutlineProject} from 'react-icons/ai'
import {HiOutlineFlag} from 'react-icons/hi'
const Nav = () => {
    return (
      <nav style={{ background: "white", color: "black", width: "10rem" }}>
        <Link to="projects" style={{ marginTop: "1rem" }}>
          <BiHomeAlt className="nav-icon" />
          Home
        </Link>
        {/* <h4 className="logo">Proma</h4>
        <div className="nav-items">
          <Link to="/">
            <BiHomeAlt className="nav-icon" /> Dashboard
          </Link>
          <Link to="/projects">
            <AiOutlineProject className="nav-icon" />
            Projects
          </Link>
          <Link to="/projects-goals">
            <HiOutlineFlag className="nav-icon" />
            Project Goals
          </Link>
          <Link to="/ideas">
            <BiBulb className="nav-icon" />
            Ideas
          </Link>
        </div> */}
      </nav>
    );
}
 
export default Nav;