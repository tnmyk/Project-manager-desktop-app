import React, { useEffect, useState } from "react";
import PouchDB from "pouchdb";
import TodoItem from "./TodoItem.jsx";
import {
  SortableContainer,
  SortableElement,
  sortableHandle,
} from "react-sortable-hoc";
import { arrayMoveMutable } from "array-move";

import { AiFillStar } from "react-icons/ai";

const ProjectIdeas = ({ id, projectName }) => {
  const [ideas, setIdeas] = useState([]);
  const [inputIdea, setInputIdea] = useState("");
  const [update, setUpdate] = useState();
  const [loading, setLoading] = useState(true);
  // sort
  const DragHandle = sortableHandle(() => (
    <AiFillStar style={{ height: "100%", cursor: "grab" }} />
  ));
  const onSortEnd = ({ oldIndex, newIndex }) => {
    var arr = ideas;
    arrayMoveMutable(arr, oldIndex, newIndex);
    console.log(arr);
    setIdeas(arr);
    setUpdate(Math.random());
  };

  const SortableItem = SortableElement(({ idea, index }) => (
    <li
      tabIndex={0}
      index={index}
      style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}
    >
      <DragHandle />
      <span className="ideaname"> {idea.name}</span>
    </li>
  ));

  const SortableList = SortableContainer(({ items, completed }) => {
    return (
      <ul style={{ padding: "1rem 0", marginBottom: "1rem" }}>
        {ideas.map((idea, index) => {
          return (
            <SortableItem idea={idea} key={`item-${index}`} index={index} />
          );
        })}
      </ul>
    );
  });

  //
  const handleAdd = () => {
    if (inputIdea.trim().length === 0) return;
    setIdeas((prev) => [
      ...prev,
      { id: Math.random(), name: inputIdea.trim(), done: false },
    ]);
    setInputIdea("");
    setUpdate(Math.random());
  };
  const handleCheckClick = (x) => {
    setIdeas((prev) =>
      prev.map((ele) => {
        if (ele.id === x) return { ...ele, done: !ele.done };
        else return ele;
      })
    );
    setUpdate(Math.random());
  };
  const handleTodoDelete = (x) => {
    setIdeas((prev) => prev.filter((pre) => pre.id !== x));

    setUpdate(Math.random());
  };

  var ideadb = new PouchDB("ideas");
  useEffect(() => {
    ideadb
      .get(id)
      .then((doc) => {
        console.log(doc);

        setIdeas(doc.ideas);
        if (!doc.ideas) setIdeas([]);
      })
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        if (err.message == "missing") {
          ideadb
            .put({
              _id: id,
              ideas: [],
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
  }, []);

  useEffect(() => {
    if (loading) return;
    ideadb.get(id).then(function (doc) {
      return ideadb
        .put({
          _id: id,
          _rev: doc._rev,
          ...doc,
          ideas: ideas,
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }, [update, loading]);
  return (
    <div className="project-main">
      <h1 style={{ marginBottom: "0.5rem" }}>Ideas for {projectName}</h1>
      <input
        type="text"
        placeholder="Add project idea"
        value={inputIdea}
        onChange={(e) => {
          setInputIdea(e.target.value);
        }}
        className="input-todo"
      />
      <button className="todo-add-btn" onClick={handleAdd}>
        {">"}
      </button>

      <SortableList onSortEnd={onSortEnd} useDragHandle />
    </div>
  );
};

export default ProjectIdeas;
