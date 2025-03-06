import { useState } from 'react'
import './App.css'

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState('')

  const Login = () => {
    fetch("http://localhost:3000/users")
    .then((res) => res.json())
    .then((users) => {
      const user = users.find((u) => u.username === username && u.password === password)
      if(user) {
        setNotification("Login Successful")
      } else {
        setNotification("Username or Password is incorrect")
      }
    })
    .catch((error) => console.error("Error fetching users: ", error))
  }

  return (
    <>
      <div className='main-container'>
        <div className='content'>
          <h1 className='stretch'>SPACEBIN</h1>
          <div><input placeholder='Username' className='loginInput' onChange={e => setUsername(e.target.value)}/></div>
          <div><input placeholder='Password' type='password' className='loginInput' onChange={e => setPassword(e.target.value)}/></div>
          <div className='links'>
            <span>Forgot Password</span>
            <span>Sign up</span>
          </div>
          <button className='loginBtn' onClick={Login}>Login</button>
          <div>{notification === "Login Successful" ? <div style={{color: "green"}}>{notification}</div> : <div style={{color: "red"}}>{notification}</div>}</div>
        </div>
      </div>
    </>
  )
}

export default App
