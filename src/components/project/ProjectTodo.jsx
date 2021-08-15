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

const ProjectTodo = ({ id,projectName }) => {
  const [todos, setTodos] = useState([]);
  const [inputTodo, setInputTodo] = useState("");
  const [update, setUpdate] = useState();
  const [loading, setLoading] = useState(true);
  const [numbers, setNumbers] = useState({ completed: 0, uncompleted: 0 });
  // sort
  const DragHandle = sortableHandle(() => (
    <GrDrag style={{ height: "100%", cursor: "grab" }} />
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
        handleTodoDelete={handleTodoDelete}
        key={todo.id}
        id={todo.id}
        name={todo.name}
        done={todo.done}
      />
    </li>
  ));

  const SortableList = SortableContainer(({ items, completed }) => {
    return (
      <ul style={{ padding: "1rem 0", marginBottom: "1rem" }}>
        {todos.map((todo, index) => {
          if (!completed && todo.done) return;
          if (completed && !todo.done) return;
          return (
            <SortableItem todo={todo} key={`item-${index}`} index={index} />
          );
        })}
      </ul>
    );
  });
  const getNumber = () => {
    var completed = 0;
    todos.map((todo) => {
      console.log(todo);
      if (todo.done) completed = completed + 1;
    });
    setNumbers({ completed: completed, uncompleted: todos.length - completed });
  };
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
  const handleTodoDelete = (x) => {
    setTodos((prev) => prev.filter((pre) => pre.id !== x));

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
    getNumber();
  }, [update, loading]);
  return (
    <div className="project-main">
      <h1 style={{marginBottom:'0.5rem'}}>Todo for {projectName}</h1>
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
      <h2>Uncompleted ({numbers.uncompleted})</h2>
      {numbers.uncompleted === 0 && (
        <h4 className="project-subheading noitems">No items found</h4>
      )}
      <SortableList onSortEnd={onSortEnd} useDragHandle />
      <h2>Completed ({numbers.completed})</h2>
      {numbers.completed === 0 && (
        <h4 className="project-subheading noitems">No items found</h4>
      )}

      <SortableList onSortEnd={onSortEnd} completed={true} useDragHandle />
    </div>
  );
};

export default ProjectTodo;
