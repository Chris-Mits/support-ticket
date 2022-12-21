import React from 'react'
import {Link} from 'react-router-dom'
import {FaArrowAltCircleLeft} from 'react-icons/fa'

export const BackButton = ({url}) => {
  return (
    <Link to={url} className='btn btn-reverse btn-back'>
      <FaArrowAltCircleLeft /> Back
    </Link>
  )
}