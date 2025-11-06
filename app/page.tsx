"use client";

import { useState } from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import TodoAdd from "./features/todo/components/TodoAdd";
import TodoList from "./features/todo/components/TodoList";

const App = () => {
  const [currentView, setCurrentView] = useState("list");

  const renderView = () => {
    switch (currentView) {
      case "add":
        return <TodoAdd setCurrentView={setCurrentView} />;
      case "list":
      default:
        return <TodoList setCurrentView={setCurrentView} />;
    }
  };

  return (
    <Provider store={store}>
      <div className="min-h-screen bg-slate-50 p-4 sm:p-8 flex items-start justify-center">
        <div className="w-full max-w-sm bg-white shadow-2xl rounded-xl min-h-[600px] border-8 border-slate-200 overflow-hidden">
          {renderView()}
        </div>
      </div>
    </Provider>
  );
};

export default App;
