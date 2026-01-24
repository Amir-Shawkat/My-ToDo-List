import AddSearchBar from "./components/AddTodo";
// import AddTodo from "./components/AddTodo";
import TaskList from "./components/TaskList";
import { useState , useEffect } from 'react';

const LOCAL_KEY = "my_todos";

export default function App() {
  const [todos , setTodos] = useState(()=>{
    const saved = localStorage.getItem(LOCAL_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [searchText , setSearchText] = useState("");
  const [draggedId , setDraggedId] = useState(null);

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY , JSON.stringify(todos));
  } , [todos]);

  function handleAddTodo (title) {
    if(!title.trim()) return;

    setTodos([
      
      {
        id: Date.now(),
        title: title,
        done: false,
      },
      ...todos
    ]);
  }

  function handleEditTodo (nextTodo){
    setTodos(todos.map(t => (t.id === nextTodo.id ? nextTodo : t)));
  }

  function handleDeleteTodo (todoId) {
    let isConfirmed = confirm("Are you sure you want to delete the task?");
    if(isConfirmed){
      setTodos(todos.filter(t => t.id !== todoId));
    } else return;
  }

  function handleDragStart(id) {
    setDraggedId(id);
  }

  function handleDrop(targetId) {
    if(draggedId === null || draggedId === targetId) return;

    const updated = [...todos];
    const fromIndex = updated.findIndex(t => t.id === draggedId);
    const toIndex = updated.findIndex(t => t.id === targetId);

    const [movedItem] = updated.splice(fromIndex , 1);
    updated.splice(toIndex , 0 , movedItem);

    setTodos(updated);
    setDraggedId(null);
  }

  const filteredTodos = todos.filter(todo => {
    const matchesSearch = todo.title.toLowerCase().includes(searchText.toLowerCase());
    return matchesSearch;
  })

  return (
    <div className="main-container">
      <h1 className="heading">My ToDo List</h1>
      
      <AddSearchBar
        onAddTodo={handleAddTodo}
        searchText={searchText}
        setSearchText={setSearchText}
      />
      
      <div className="tasklist-container">
        {todos.length === 0 ? (
          <div className="empty-state">
            ✅ Your todo list is completed! <br />
            Add a new task 🚀
          </div>
        ) : (
          <TaskList 
            todos={filteredTodos}
            onEditTodo={handleEditTodo}
            onDeleteTodo={handleDeleteTodo}
            onDragStart={handleDragStart}
            onDrop={handleDrop}
          />
        )}
      </div>
      
    </div>
  );
}

