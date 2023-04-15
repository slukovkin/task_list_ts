import React, { useState } from "react"
import { FilterValueType } from "./App"

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  title: string
  tasks: TaskType[]
  removeTask: (id: string) => void
  changeFilter: (value: FilterValueType) => void
  addTask: (value: string) => void
  changeChecked: (id: string) => void
}

export function TodoList({
  title,
  tasks,
  removeTask,
  changeFilter,
  addTask,
  changeChecked,
}: PropsType) {
  const [value, setValue] = useState("")

  const onChangeTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value)
  const onPressEnterHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTask(value)
      setValue("")
    }
  }
  const addNewTask = () => {
    addTask(value)
    setValue("")
  }

  const onAllClickHandler = () => changeFilter("all")
  const onActiveClickHandler = () => changeFilter("active")
  const onCompletedClickHandler = () => changeFilter("completed")

  return (
    <div>
      <h3 className='title'>{title}</h3>
      <div>
        <input
          type='text'
          style={{ padding: "4px" }}
          value={value}
          onChange={onChangeTitleHandler}
          onKeyDown={onPressEnterHandler}
        />
        <button onClick={addNewTask}>+</button>
      </div>
      <hr />
      <ul>
        {tasks.map((task) => {
          const onRemoveHandler = () => {
            removeTask(task.id)
          }
          const onChangeCheckedHandler = () => {
            changeChecked(task.id)
          }
          return (
            <li key={task.id}>
              <input
                type='checkbox'
                checked={task.isDone}
                onChange={onChangeCheckedHandler}
              />
              <span>{task.title}</span>
              <button onClick={onRemoveHandler}>X</button>
            </li>
          )
        })}
      </ul>
      <hr />
      <div className='title'>
        <button onClick={onAllClickHandler}>All</button>
        <button onClick={onActiveClickHandler}>Active</button>
        <button onClick={onCompletedClickHandler}>Completed</button>
      </div>
    </div>
  )
}
