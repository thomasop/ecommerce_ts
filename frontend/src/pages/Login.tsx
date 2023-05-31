import React, { useState } from 'react'
import LoginDisplay from '../components/display/LoginDisplay'
import RegisterDisplay from '../components/display/RegisterDisplay'

const Login = () => {
  const [page, setPage] = useState<string>("login")
  return (
    <div className='login'>
      {(page === 'login' && <LoginDisplay setPage={setPage} />) || (page === 'register' && <RegisterDisplay setPage={setPage} />)}
      
    </div>
    
  )
}

export default Login