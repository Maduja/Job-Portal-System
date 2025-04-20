import React from 'react'
import { Link } from 'react-router-dom'
import './Menulinks.css'
function MenuLink(props) {
  return (
    <>
    
    <Link to={props.link} className='links'>{props.name}</Link>
    
    </>
  )
}

export default MenuLink
