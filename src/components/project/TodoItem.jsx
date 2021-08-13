import React from "react";

const TodoItem = ({ name, done, handleCheckClick, id }) => {
  return (
    <div className="todo-item">
      <div>
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
      </div>
      <span style={done?{textDecoration:'line-through',color:'gray'}:{}}>{name}</span>
    </div>
  );
};

export default TodoItem;
