import React, { useEffect, useState } from "react";
import PouchDB from "pouchdb";
import TodoItem from "./TodoItem.jsx";
import {
  SortableContainer,
  SortableElement,
  sortableHandle,
} from "react-sortable-hoc";
import { arrayMoveMutable } from "array-move";
import { GrDrag } from "react-icons/gr";

const ProjectTodo = ({ id }) => {
  const [todos, setTodos] = useState([]);
  const [inputTodo, setInputTodo] = useState("");
  const [update, setUpdate] = useState();
  const [loading, setLoading] = useState(true);

  // sort
  const DragHandle = sortableHandle(() => (
    <GrDrag style={{ height: "100%", cursor: "move" }} />
  ));
  const onSortEnd = ({ oldIndex, newIndex }) => {
    var arr = todos;
    arrayMoveMutable(arr, oldIndex, newIndex);
    console.log(arr);
    setTodos(arr);
    setUpdate(Math.random());
  };

  const SortableItem = SortableElement(({ todo, index }) => (
    <li
      tabIndex={0}
      index={index}
      style={{ display: "flex", alignItems: "center" }}
    >
      <DragHandle />
      <TodoItem
        handleCheckClick={handleCheckClick}
        key={todo.id}
        id={todo.id}
        name={todo.name}
        done={todo.done}
      />
    </li>
  ));

  const SortableList = SortableContainer(({ items }) => {
    return (
      <ul>
        {todos.map((todo, index) => (
          <SortableItem todo={todo} key={`item-${index}`} index={index} />
        ))}
      </ul>
    );
  });

  //
  const handleAdd = () => {
    if (inputTodo.trim().length === 0) return;
    setTodos((prev) => [
      ...prev,
      { id: Math.random(), name: inputTodo.trim(), done: false },
    ]);
    setInputTodo("");
    setUpdate(Math.random());
  };
  const handleCheckClick = (x) => {
    setTodos((prev) =>
      prev.map((ele) => {
        if (ele.id === x) return { ...ele, done: !ele.done };
        else return ele;
      })
    );
    setUpdate(Math.random());
  };
  var tododb = new PouchDB("todos");
  useEffect(() => {
    tododb
      .get(id)
      .then((doc) => {
        console.log(doc);
        setTodos(doc.todos);
      })
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        if (err.message == "missing") {
          tododb
            .put({
              _id: id,
              todos: [],
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
  }, []);
  useEffect(() => {
    if (loading) return;
    tododb.get(id).then(function (doc) {
      return tododb
        .put({
          _id: id,
          _rev: doc._rev,
          ...doc,
          todos: todos,
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }, [update]);
  return (
    <div className="project-main">
      <h1>Todo</h1>
      <input
        type="text"
        placeholder="Todo"
        value={inputTodo}
        onChange={(e) => {
          setInputTodo(e.target.value);
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

export default ProjectTodo;
