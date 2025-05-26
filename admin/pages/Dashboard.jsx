import React from 'react'
import Header from '../components/header'
import Sidebar from '../components/Sidebar'
import Home from '../components/Home'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

function Dashboard() {
 return (
  <div>
    <Nav />
    <Header />
    <Sidebar />
    <Home />
    <Footer />
  </div>
 )
}

export default Dashboard;
