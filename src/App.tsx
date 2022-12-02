import { v4 as uuid } from "uuid";
import React, { useEffect, useState } from "react";
import Add from "./components/Add";
import "./App.css";
import { LOCAL_STORAGE_KEY } from "./constants";
import List from "./components/List";
import { fetchList } from "./services/list";

export interface Todo {
  key: string;
  value: string;
  isComplete?: boolean;
}

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAdd = (newTodo: string) => {
    setTodos((prev) => {
      const newTodos = [...prev, { key: uuid(), value: newTodo }];
      globalThis.localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({
          data: newTodos,
        })
      );
      return newTodos;
    });
  };

  const handleChange = (newTodos: Todo[]) => {
    setTodos(newTodos);
    globalThis.localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({
        data: newTodos,
      })
    );
  };

  useEffect(() => {
    setTodos(fetchList());
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1 data-testid="header-title">Todo List</h1>
      </header>
      <main className="App-main">
        <List todos={todos} onChange={handleChange} />
        <Add onAdd={handleAdd} />
      </main>
    </div>
  );
};

export default App;
