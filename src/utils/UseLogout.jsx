import React from 'react'
import { useNavigate } from 'react-router-dom'

function UseLogout() {
    let navigate = useNavigate();
  return () => {
    sessionStorage.clear();
    navigate('/login')
  }
}

export default UseLogout
