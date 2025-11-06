export type Todo = {
  id: string;
  name: string;
  description: string;
  isCompleted: boolean;
  isSelected?: boolean;
  createdAt: number;
};

export type ApiTodo = {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
};