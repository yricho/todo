import { ApiTodo, Todo } from "../features/todo/types";

export const normalizeData = (apiTodos: ApiTodo[]): Todo[] => {
  if (!apiTodos || apiTodos.length === 0) {
    return [];
  }

  return apiTodos.map((apiTodo) => {
    return {
      id: String(apiTodo.id),
      name: apiTodo.todo,
      isCompleted: apiTodo.completed,
      description: "",
      isSelected: false,
      createdAt: Date.now(),
    };
  });
};
