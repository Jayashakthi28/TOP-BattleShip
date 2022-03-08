import React from 'react'
import error_img from '../../assets/error.jpg'
export const Error = () => {
  return (
    <div className='error'>
        <h2>We are working on it...Try it in a larger device</h2>
        <img src={error_img} alt=""/>
    </div>
  )
}
