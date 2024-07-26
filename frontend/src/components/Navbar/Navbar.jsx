import React from 'react'

const Navbar = () => {
  const userName = localStorage.getItem('userName')
  return (
    <div className='flex justify-center items-center mt-7 text-2xl'>
        <h1>Welcome, {userName || 'Guest'}!</h1>

    </div>
  )
}

export default Navbar