import { v4 as uuid } from "uuid";
import React, { useState } from "react";
import Add from "./components/Add";
import "./App.css";

interface Todo {
  key: string;
  value: string;
}

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAdd = (newTodo: string) => {
    setTodos((prev) => [...prev, { key: uuid(), value: newTodo }]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 data-testid="header-title">Todo List</h1>
      </header>
      <main className="App-main">
        <ul data-testid="list">
          {todos.map((todo) => (
            <li key={todo.key}>{todo.value}</li>
          ))}
        </ul>
        <Add onAdd={handleAdd} />
      </main>
    </div>
  );
};

export default App;
