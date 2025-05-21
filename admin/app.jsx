import React from 'react'
import { useState } from 'react'
import Header from './components/header'
import Sidebar from './components/Sidebar'
import Home from './components/home'

const AdminApp = () => {
  return (
    <div className='grid-container'>
      <Header />
      <Sidebar />
      <Home />
    </div>
  )
}
export default AdminApp
