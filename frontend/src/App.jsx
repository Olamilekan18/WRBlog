import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='flex flex-col  min-h-screen bg-gray-100'>
      <Navbar />
      <h1 class="text-3xl font-bold underline ">
    Hello world!
  </h1>
  <h2 className='bg-amber-200'>Fucker</h2>
  </div>
    </>
  )
}

export default App
