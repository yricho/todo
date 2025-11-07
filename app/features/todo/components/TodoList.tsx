import { DUMMY_TODOS } from "@/app/utils/constant";
import { normalizeData } from "@/app/utils/normalizedData";
import { Check, LoaderCircle, Plus } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetch } from "../hooks/usefetch";
import { setStatus } from "../slice/initDataSlice";
import { addInitData } from "../slice/todoSlice";
import { ApiTodo, Todo } from "../types";
import TodoCard from "./TodoCard";

const TodoList = ({
  setCurrentView,
}: {
  setCurrentView: Dispatch<SetStateAction<string>>;
}) => {
  const todos = useSelector((state: { todos: Todo[] }) => state.todos ?? []);

  const initData = useSelector(
    (state: { initData: boolean }) => state.initData ?? false
  );

  const [isSorted, setIsSorted] = useState(false);
  const [displayData, setDisplayData] = useState<Todo[]>([]);

  const dispatch = useDispatch();

  const sortedTodos = [...todos].sort((a, b) => {
    if (a.isCompleted !== b.isCompleted) {
      return a.isCompleted ? -1 : 1;
    }
    return a.createdAt - b.createdAt;
  });

  const {
    data: apiData,
    loading: apiLoading,
    error: apiError,
  } = useFetch(DUMMY_TODOS);

  useEffect(() => {
    if (isSorted) {
      setDisplayData(sortedTodos);
    } else {
      const s = [...todos].sort((a, b) => a.createdAt - b.createdAt);

      setDisplayData(s);
    }
  }, [isSorted, todos]);

  useEffect(() => {
    if (!initData) {
      if (!apiLoading && apiData && apiData.length > 0) {
        const normalizedData = normalizeData(apiData as ApiTodo[]);
        dispatch(addInitData(normalizedData));
        dispatch(setStatus(true));
      }
    }
  }, [apiData, apiLoading, apiError, dispatch]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h1 className="text-3xl font-extrabold text-blue-600">TODO</h1>
        <button
          onClick={() => setCurrentView("add")}
          className="text-white bg-blue-600 rounded-full p-2 shadow-md hover:bg-blue-700 transition duration-200"
          aria-label="Tambah tugas baru"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      {apiLoading ? (
        <div className="text-center py-10 text-slate-500 bg-slate-50 rounded-lg">
          <p>
            <LoaderCircle className="inline-block w-5 h-5 mr-2 animate-spin" />
            Loading todos...
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {displayData.length === 0 && (
            <div className="text-center py-10 text-slate-500 bg-slate-50 rounded-lg">
              <p>Add a New Todo</p>
            </div>
          )}

          {displayData.length > 0 && (
            <>
              <button
                aria-label="Sort todos"
                className={`relative flex items-center p-3 space-x-2 text-slate-300 ${
                  isSorted ? "bg-green-500 text-white" : "bg-white"
                } rounded-full shadow-md hover:bg-slate-100 transition duration-200 mb-6`}
                onClick={() => setIsSorted(!isSorted)}
              >
                <Check
                  className={`w-5 h-5 rounded-full ${
                    isSorted ? "text-green-500 bg-green-50" : "text-slate-300 bg-green-200"
                  }`}
                />
                <span>Completed</span>
              </button>
              {displayData.map((todo) => (
                <TodoCard
                  key={todo.id}
                  {...todo}
                  onSave={() => setCurrentView("list")}
                />
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};
export default TodoList;
