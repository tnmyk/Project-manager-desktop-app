import React from "react";
import { BiTrash } from "react-icons/bi";
const TodoItem = ({ name, done, handleCheckClick, id, handleTodoDelete }) => {
  return (
    <div className="todo-item">
      <div style={{ marginRight: "1rem", display: "flex" }}>
        <label className="checkbox bounce">
          {
            <input
              type="checkbox"
              checked={done}
              readOnly
              onClick={() => {
                handleCheckClick(id);
              }}
            />
          }
          <svg viewBox="0 0 21 21">
            <polyline points="5 10.75 8.5 14.25 16 6"></polyline>
          </svg>
        </label>
        {done && (
          <BiTrash
            onClick={() => {
              handleTodoDelete(id);
            }}
            style={{ fontSize: "1.25rem", marginLeft: "0.5rem" }}
          />
        )}
      </div>
      <span
        className="todoname"
        style={done ? { textDecoration: "line-through", color: "gray" } : {}}
      >
        {name}
      </span>
    </div>
  );
};

export default TodoItem;
