import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { generateRandomId } from "../../../utils/random";
import { addTodo } from "../slice/todoSlice";
import { Todo } from "../types";
import Header from "./Header";

const dateNow = Date.now();

const TodoAdd = ({
  setCurrentView,
  isEdit = false,
}: {
  setCurrentView: (view: string) => void;
  isEdit?: boolean;
}) => {
  const dispatch = useDispatch();



  const [todoItem, setTodoItem] = useState<Todo>({
    id: generateRandomId(),
    name: "",
    description: "",
    isCompleted: false,
    isSelected: false,
    createdAt: dateNow,
  });

  const { name, description } = todoItem;

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!name || !description) return;

    dispatch(addTodo(todoItem));

    setCurrentView("list");
  };

  return (
    <div className="p-4">
      <Header
        backButton={
          <button
            onClick={() => setCurrentView("list")}
            className="text-blue-600 hover:text-blue-800 transition duration-150 flex items-center font-medium"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
          </button>
        }
        title={isEdit ? "Edit" : "Add New"}
        button={
          <button
            onClick={handleSubmit}
            disabled={!name.trim()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 disabled:bg-blue-300 transition duration-200 flex items-center text-sm"
          >
            Done
          </button>
        }
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setTodoItem({ ...todoItem, name: e.target.value })}
            placeholder="Buy groceries, Walk the dog, etc."
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) =>
              setTodoItem({ ...todoItem, description: e.target.value })
            }
            placeholder="Detail about the task..."
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 resize-none"
          />
        </div>
      </form>
    </div>
  );
};

export default TodoAdd;
