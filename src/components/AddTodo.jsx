import { useState } from 'react';

// export default function AddTodo ({ onAddTodo }) {
//     const [title , setTitle] = useState('');
//     return (
//         <div className="addtask-container">
//             <input placeholder="Add Task" className='addtext' value={title} onChange={e => setTitle(e.target.value)} />
//             <button type="button" onClick={() => {
//                 setTitle('');
//                 onAddTodo(title);
//             }}>Add</button>
//         </div>
//     )
// }

export default function AddSearchBar({
  onAddTodo,
  searchText,
  setSearchText
}) {
  const [mode, setMode] = useState(null); // "add" | "search" | null
  const [addText, setAddText] = useState("");

  function closeMode() {
    setMode(null);
    setAddText("");
    setSearchText("");
  }

  function handleAdd() {
    if (!addText.trim()) return;
    onAddTodo(addText.trim());
    closeMode();
  }

  return (
    <div className="toolbar">

      {/* SEARCH MODE */}
      {mode === "search" && (
        <div className="search-box">
          <input
            placeholder="Search tasks..."
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            autoFocus
          />
          <button className="cancel-btn" onClick={closeMode}>✖</button>
        </div>
      )}

      {/* ADD MODE */}
      {mode === "add" && (
        <div className="add-box">
          <input
            placeholder="Add new task..."
            value={addText}
            onChange={e => setAddText(e.target.value)}
            autoFocus
          />
          <button onClick={handleAdd} className='add-btn'>Add</button>
          <button className="cancel-btn" onClick={closeMode}>✖</button>
        </div>
      )}

      {/* DEFAULT MODE */}
      {!mode && (
        <div className="toolbar-buttons">
          <button onClick={() => setMode("add")}>➕ Add</button>
          <button onClick={() => setMode("search")}>🔍 Search</button>
        </div>
      )}

    </div>
  );
}

