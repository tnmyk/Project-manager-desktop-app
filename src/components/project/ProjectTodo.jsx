import React, { useEffect, useState } from "react";
import PouchDB from "pouchdb";
import TodoItem from "./TodoItem.jsx";
const ProjectTodo = ({ id }) => {
  const [todos, setTodos] = useState([]);
  const [inputTodo, setInputTodo] = useState("");
  const [update, setUpdate] = useState();
  const [loading, setLoading] = useState(true);
  const handleAdd = () => {
    setTodos((prev) => [
      ...prev,
      { id: Math.random(), name: inputTodo, done: false },
    ]);
    setUpdate(Math.random());
  };
  const handleCheckClick = (x) => {
    let temparr = todos;

    const index = temparr.findIndex((temp) => temp.id == x);
    temparr[index].done = !temparr[index].done;
    setTodos(temparr);
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
      />
      <button onClick={handleAdd}>Add</button>
      {todos.map((todo) => {
        return (
          <TodoItem
            handleCheckClick={handleCheckClick}
            key={todo.id}
            id={todo.id}
            name={todo.name}
            done={todo.done}
          />
        );
      })}
    </div>
  );
};

export default ProjectTodo;
