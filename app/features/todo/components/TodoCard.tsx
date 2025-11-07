import {
  deleteTodo,
  editTodo,
  selectTodo,
  toggleTodo,
} from "@/app/features/todo/slice/todoSlice";
import { Todo } from "@/app/features/todo/types";
import { Check, Pencil, Save, Trash2 } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";

type TodoCardProps = Todo & { onSave: () => void };

const TodoCard = ({
  id,
  name,
  description,
  isCompleted,
  isSelected,
  createdAt,
  onSave,
}: TodoCardProps) => {
  const dispatch = useDispatch();

  const [todoItem, setTodoItem] = useState<Todo>({
    id,
    name,
    description,
    isCompleted,
    isSelected,
    createdAt,
  });

  const handleSave = () => {
    if (!todoItem.name.trim()) return;
    dispatch(
      editTodo({
        id: todoItem.id,
        name: todoItem.name.trim(),
        description: todoItem.description.trim(),
        isCompleted: todoItem.isCompleted,
        isSelected: false,
        createdAt: todoItem.createdAt,
      })
    );

    onSave();
  };

  const handleEditClick = () => {
    dispatch(selectTodo(id));
  };

  const handleToggle = () => {
    dispatch(toggleTodo(id));
  };

  return (
    <div
      className={`flex items-start p-4 rounded-xl shadow-sm transition-all duration-300 ${
        isCompleted
          ? "bg-green-50 border-l-4 border-green-500 opacity-60"
          : "bg-white border border-slate-200 hover:shadow-md"
      }`}
    >
      {isSelected ? (
        <div className="w-full">
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={todoItem.name}
                onChange={(e) =>
                  setTodoItem({ ...todoItem, name: e.target.value })
                }
                placeholder="Buy groceries, Walk the dog, etc."
                className="w-full p-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-inner text-current"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Description
              </label>
              <textarea
                value={todoItem.description}
                onChange={(e) =>
                  setTodoItem({ ...todoItem, description: e.target.value })
                }
                placeholder="Detail about the task..."
                className="w-full p-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 resize-none shadow-inner"
                rows={3}
              />
            </div>
          </form>

          <div className="flex justify-end pt-4 space-x-2">
            <button
              onClick={() => dispatch(deleteTodo(id))}
              className="p-2 text-red-500 hover:text-red-700 transition duration-150 rounded-full hover:bg-red-50"
              aria-label="Delete todo"
              title="Hapus"
            >
              <Trash2 className="w-5 h-5" />
            </button>
            <button
              onClick={handleSave}
              className={`p-2 transition duration-150 rounded-full hover:bg-blue-50 ${
                todoItem?.name?.trim()
                  ? "text-blue-500 hover:text-blue-700"
                  : "text-gray-400 cursor-not-allowed"
              }`}
              aria-label="Save todo"
              title="Simpan"
              disabled={!todoItem.name?.trim()}
            >
              <Save className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        <>
          <div
            className="flex-shrink-0 cursor-pointer pt-1"
            onClick={handleToggle}
          >
            <div
              className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center transition duration-200 ${
                isCompleted
                  ? "bg-green-500 border-green-500"
                  : "border-gray-400 hover:bg-gray-200"
              }`}
            >
              {isCompleted && <Check className="w-4 h-4 text-white" />}
            </div>
          </div>

          <div className="flex-grow min-w-0">
            <p
              className={`text-lg leading-tight ${
                isCompleted
                  ? "line-through text-slate-500"
                  : "text-slate-800 font-medium"
              }`}
            >
              {name}
            </p>
            {description && (
              <p
                className={`text-sm mt-0.5 leading-snug ${
                  isCompleted ? "text-green-600" : "text-slate-500"
                }`}
              >
                {description.substring(0, 70)}
                {description.length > 70 ? "..." : ""}
              </p>
            )}
          </div>

          <button
            onClick={handleEditClick}
            className="flex-shrink-0 ml-4 p-2 text-blue-500 hover:text-blue-700 transition duration-150 rounded-full hover:bg-blue-50"
            aria-label="Edit todo"
            title="Edit"
          >
            <Pencil className="w-5 h-5" />
          </button>

          <button
            onClick={() => dispatch(deleteTodo(id))}
            className="flex-shrink-0 ml-2 p-2 text-red-500 hover:text-red-700 transition duration-150 rounded-full hover:bg-red-50"
            aria-label="Delete todo"
            title="Hapus Permanen"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </>
      )}
    </div>
  );
};

export default TodoCard;
