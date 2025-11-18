import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // --- ÉTAT (Aucun changement ici) ---
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  
  const [inputValue, setInputValue] = useState('');

  // --- SAUVEGARDE (Aucun changement ici) ---
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // --- LOGIQUE (Aucun changement ici) ---
  const handleAddTodo = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const newTodo = {
      id: Date.now(),
      text: inputValue,
      completed: false
    };

    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  const handleToggleComplete = (id) => {
    const updatedTodos = todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (id) => {
    const remainingTodos = todos.filter(todo => todo.id !== id);
    setTodos(remainingTodos);
  };

  // --- AFFICHAGE (C'est ici que nous faisons le changement) ---
  return (
    <div className="app-container">
      <h1>To-Do List Simple</h1>
      
      <form onSubmit={handleAddTodo} className="todo-form">
        <input 
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ajouter une tâche..."
        />
        <button type="submit">Ajouter</button>
      </form>

      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            
            {/* NOUVEAU : La case à cocher */}
            <input
              type="checkbox"
              className="todo-checkbox"
              checked={todo.completed} // Son état (coché/décoché) est lié à l'état de la tâche
              onChange={() => handleToggleComplete(todo.id)} // Quand on la coche, on appelle notre fonction
            />
            
            {/* Le texte reste cliquable, ce qui est une bonne pratique */}
            <span onClick={() => handleToggleComplete(todo.id)}>
              {todo.text}
            </span>

            <button onClick={() => handleDeleteTodo(todo.id)} className="delete-button">
              &times;
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;