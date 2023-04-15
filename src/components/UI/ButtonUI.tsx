import React from "react"

interface IButtonProps {
  title?: string
  color: ButtonColorType
  onclick: () => void
  activeButton?: boolean
}

export type ButtonColorType =
  | "success"
  | "primary"
  | "danger"
  | "warning"
  | "secondary"
  | string

export function ButtonUI({
  title,
  onclick,
  color,
  activeButton,
}: IButtonProps) {
  const buttonColor = `btn btn-sm ${color}`
  return (
    <button
      disabled={activeButton}
      className={buttonColor}
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        onclick()
      }}
    >
      {title}
    </button>
  )
}
