import { v4 } from "uuid";
import { TaskType } from "./components/TodoList";

export let initTasks: TaskType[] = [
  { id: v4(), title: "CSS", isDone: true },
  { id: v4(), title: "REDUX", isDone: false },
  { id: v4(), title: "JAVASCRIPT", isDone: true },
  { id: v4(), title: "REACT", isDone: true },
  { id: v4(), title: "NEXT", isDone: false },
]
