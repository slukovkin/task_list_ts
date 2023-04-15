import React, { useEffect, useState } from "react"
import { FilterValueType } from "./App"
import { ButtonUI } from "./components/UI/ButtonUI"

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
  changeTaskStatus: (id: string) => void
}

export function TodoList({
  title,
  tasks,
  removeTask,
  changeFilter,
  addTask,
  changeTaskStatus,
}: PropsType) {
  const [value, setValue] = useState("")
  const [error, setError] = useState<string | null>(null)

  const onChangeTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }
  const onPressEnterHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (value.trim() === "") {
        return setError("Это поле обязательное и не может быть пустым")
      }
      addTask(value)
      setValue("")
    }
  }
  const addNewTask = () => {
    if (value.trim() === "") {
      return setError("Это поле обязательное и не может быть пустым")
    }
    addTask(value)
    setValue("")
  }

  const onAllClickHandler = () => changeFilter("all")
  const onActiveClickHandler = () => changeFilter("active")
  const onCompletedClickHandler = () => changeFilter("completed")
  const onFocus = () => setError(null)

  useEffect(() => {
    setError(null)
  }, [changeFilter])

  return (
    <div>
      <h3 className='title'>{title}</h3>
      <div className='d-flex item-center'>
        <input
          type='text'
          className={error ? "w-100 px-3 border-danger" : "w-100 px-3"}
          value={value}
          onChange={onChangeTitleHandler}
          onKeyDown={onPressEnterHandler}
          onFocus={onFocus}
        />
        <ButtonUI title='+' onclick={addNewTask} />
      </div>

      {error && (
        <div className='d-flex justify-content-center text-danger'>{error}</div>
      )}

      <ul>
        {tasks.map((task) => {
          const onRemoveHandler = () => {
            removeTask(task.id)
          }
          const onChangeCheckedHandler = () => {
            changeTaskStatus(task.id)
          }
          return (
            <li key={task.id}>
              <input
                type='checkbox'
                checked={task.isDone}
                onChange={onChangeCheckedHandler}
              />
              <span>{task.title}</span>
              <button
                onClick={onRemoveHandler}
                className='btn btn-sm btn-danger py-1 px-3'
              >
                x
              </button>
            </li>
          )
        })}
      </ul>

      <div className='title mt-2 d-flex justify-content-center align-center'>
        <button
          className='btn btn-sm btn-primary px-5'
          onClick={onAllClickHandler}
        >
          All
        </button>
        <button
          className='btn btn-sm btn-primary px-5'
          onClick={onActiveClickHandler}
        >
          Active
        </button>
        <button
          className='btn btn-sm btn-primary px-3'
          onClick={onCompletedClickHandler}
        >
          Completed
        </button>
      </div>
    </div>
  )
}
