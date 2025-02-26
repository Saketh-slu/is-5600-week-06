import React from 'react'

export default function Button({text, handleClick, disabled}) {
  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`pa3 ma2 ${disabled ? 'bg-gray' : 'bg-black'} white pointer`}
    >
      {text}
    </button>
  )
}



