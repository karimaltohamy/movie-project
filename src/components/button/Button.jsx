import React from 'react'
import PropTypes from 'prop-types';

import "./button.scss"

const Button = (props) => {
  return (
    <button className={`btn ${props.className}`} onClick={() => props.onClick ? props.onClick() : ""}>
        {props.children}
    </button>
  )
}


export const ButtonOutLine = ({className, onClick, children}) => {
    return (
        <Button className={`btn-outline ${className}`} onClick={() => onClick ? onClick() : ""}>
            {children}
        </Button>
    )
}

Button.prototype = {
    onClick: PropTypes.func,
    className: PropTypes.string
}

export default Button