import React, { useState } from "react"
import "./App.css"
import { TodoList } from "./TodoList"
import { TaskType } from "./TodoList"
import { initTasks } from "./data"
import { v4 } from "uuid"

export type FilterValueType = "all" | "active" | "completed"

function App() {
  const [tasks, setTasks] = useState(initTasks)
  const [filter, setFilter] = useState<FilterValueType>("all")

  function removeTask(id: string) {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  function changeFilter(value: FilterValueType) {
    setFilter(value)
  }

  function addTask(value: string) {
    const newTask: TaskType = {
      id: v4(),
      title: value,
      isDone: false,
    }
    setTasks([newTask, ...tasks])
  }
  function changeChecked(id: string) {
    let newArrayTasks = [...tasks]
    if (id) {
      // eslint-disable-next-line array-callback-return
      newArrayTasks.find((task) => {
        if (task.id === id) {
          task.isDone = !task.isDone
        }
      })
      setTasks(newArrayTasks)
    }
  }

  let taskToTodolist: TaskType[] = tasks

  switch (filter) {
    case "active":
      taskToTodolist = tasks.filter((task) => task.isDone !== true)
      break
    case "completed":
      taskToTodolist = tasks.filter((task) => task.isDone)
      break
  }

  return (
    <div className='App'>
      {!tasks.length ? (
        <h2>Список задач пуст</h2>
      ) : (
        <TodoList
          title='What to learn'
          tasks={taskToTodolist}
          removeTask={removeTask}
          changeFilter={changeFilter}
          addTask={addTask}
          changeChecked={changeChecked}
        />
      )}
    </div>
  )
}

export default App
