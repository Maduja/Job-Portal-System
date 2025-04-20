import React from 'react'
import './Emplink.css'

function Emplink({text,icon,onClick,currentSection}) {
  return (
    <div id='empnavigation' className={currentSection ? 'active' : ''} onClick={onClick}>
        <div className="icon">{icon}</div>
        <div className="text">{text}</div> 
    </div>
  )
}

export default Emplink
