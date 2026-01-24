import { useState } from 'react';

export default function TaskList ( {todos , onEditTodo , onDeleteTodo , onDragStart , onDrop} ) {
    return (
        <ul>
            {todos.map(todo => (
                <li 
                  key={todo.id}
                  className='tasklist'
                  draggable
                  onDragStart={() => onDragStart(todo.id)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => onDrop(todo.id)}
                >
                    <Task 
                        todo = {todo}
                        onEdit= {onEditTodo}
                        onDelete= {onDeleteTodo}
                    />
                </li>
            ))}
        </ul>
    );
}

function Task({ todo, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="list">

      {/* Show checkbox ONLY when not editing */}
      {!isEditing && (
        <input
          type="checkbox"
          checked={todo.done}
          onChange={e => {
            onEdit({
              ...todo,
              done: e.target.checked
            });
          }}
        />
      )}

      {/* Content */}
      {isEditing ? (
        <>
          <input
            className="edit-input"
            value={todo.title}
            onChange={e => {
              onEdit({
                ...todo,
                title: e.target.value
              });
            }}
          />
          <button
            className="save-btn"
            type="button"
            onClick={() => setIsEditing(false)}
          >
            Save
          </button>
        </>
      ) : (
        <>
          <span className={`todo-text ${todo.done ? "completed" : ""}`}>{todo.title}</span>

          <div className="action-buttons">
            <button type="button" onClick={() => setIsEditing(true)}>
              Edit
            </button>
            <button type="button" onClick={() => onDelete(todo.id)}>
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
