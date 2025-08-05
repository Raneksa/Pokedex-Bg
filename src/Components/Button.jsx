import React from 'react'
import '../Css/Button.css'

const Button = ({label , onclick}) => {
  return (
    <button onClick={onclick}>{label}</button>
  )
}

export default Button