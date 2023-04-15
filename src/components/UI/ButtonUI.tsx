import React from "react"

interface IButtonProps {
  title: string
  onclick: () => void
}

export function ButtonUI({ title, onclick }: IButtonProps) {
  return (
    <button className='btn btn-sm btn-primary' onClick={() => onclick()}>
      {title}
    </button>
  )
}
