import React, { useEffect, useState } from "react"
import { FilterValueType } from "../App"
import { ButtonUI } from "./UI/ButtonUI"

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  title: string
  tasks: TaskType[]
  activeButton: boolean
  filter?: FilterValueType
  removeTask: (id: string) => void
  changeFilter: (value: FilterValueType) => void
  addTask: (value: string) => void
  changeTaskStatus: (id: string) => void
}

export function TodoList({
  title,
  tasks,
  activeButton,
  removeTask,
  changeFilter,
  addTask,
  changeTaskStatus,
  filter,
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
          className={
            error
              ? "w-100 px-3 border-danger form-control"
              : "w-100 px-3 form-control"
          }
          value={value}
          onChange={onChangeTitleHandler}
          onKeyDown={onPressEnterHandler}
          onFocus={onFocus}
        />
        <ButtonUI
          title='Create'
          onclick={addNewTask}
          color='btn-success'
          activeButton={false}
        />
      </div>

      {error && (
        <div className='d-flex justify-content-center text-danger'>{error}</div>
      )}

      <ul className='rounded'>
        {tasks.map((task) => {
          const onRemoveHandler = () => {
            removeTask(task.id)
          }
          const onChangeCheckedHandler = () => {
            changeTaskStatus(task.id)
          }
          return (
            <label htmlFor={task.id}>
              <li
                key={task.id}
                className={
                  task.isDone
                    ? "text-white text-opacity-25 bg-secondary rounded"
                    : "rounded"
                }
              >
                <input
                  type='checkbox'
                  id={task.id}
                  checked={task.isDone}
                  onChange={onChangeCheckedHandler}
                />
                <h5>{task.title}</h5>
                <ButtonUI
                  color='btn-danger py-1 px-3'
                  onclick={onRemoveHandler}
                  title='x'
                  activeButton={false}
                />
              </li>
            </label>
          )
        })}
      </ul>

      <div className='title mt-2 d-flex justify-content-center align-center'>
        <ButtonUI
          color={
            filter === "all"
              ? "btn btn-sm px-5 btn-success"
              : "btn btn-sm btn-outline-primary px-5"
          }
          onclick={onAllClickHandler}
          activeButton={activeButton}
          title='All'
        />
        <ButtonUI
          color={
            filter === "active"
              ? "btn btn-sm px-5 btn-success"
              : "btn btn-sm btn-outline-primary px-5"
          }
          onclick={onActiveClickHandler}
          activeButton={activeButton}
          title='Active'
        />
        <ButtonUI
          color={
            filter === "completed"
              ? "btn btn-sm px-5 btn-success"
              : "btn btn-sm btn-outline-primary px-5"
          }
          onclick={onCompletedClickHandler}
          activeButton={activeButton}
          title='Completed'
        />
      </div>
    </div>
  )
}
