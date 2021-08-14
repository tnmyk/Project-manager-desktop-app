import React, { useState } from "react";
const ProjectNotes = () => {
  const [items, setItems] = useState([
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
  ]);
  return (
    <main>
      <h1>Notes</h1>
    </main>
  );
};

export default ProjectNotes;
