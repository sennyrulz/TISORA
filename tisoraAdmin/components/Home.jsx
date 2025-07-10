import React from 'react'
import {BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsGrid3X3GapFill, BsPeopleFill, BsListCheck, BsMenuButtonWideFill, BsFillGearFill, BsFillBellFill} from 'react-icons/bs'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const Home = () => {

return (
    <main className='main-container'>
        <div className='main-title'>
            <h3>DASHBOARD</h3>
        </div>

        <div className='main-cards'>
            <div className='card'>
                <div className='card-inner'>
                    <h3>PRODUCTS</h3>
                    <BsFillArchiveFill className='card-icon'/>
                </div>
                <h1>300</h1>
            </div>

            <div className='card'>
                <div className='card-inner'>
                    <h3>USERS</h3>
                    <BsPeopleFill className='card-icon'/>
                </div>
                <h1>12</h1>
            </div>

            <div className='card'>
                <div className='card-inner'>
                    <h3>INVENTORIES</h3>
                    <BsListCheck className='card-icon'/>
                </div>
                <h1>300</h1>
            </div>

             <div className='card'>
                <div className='card-inner'>
                    <h3>ORDERS</h3>
                    <BsFillBellFill className='card-icon'/>
                </div>
                <h1>300</h1>
            </div>

            {/* <div className='card'>
                <div className='card-inner'>
                    <h3>SETTINGS</h3>
                     <BsFillGearFill className='card-icon'/>
                </div>
                <h1>300</h1>
            </div> */}
        </div>
    </main>
  )
}

export default Home
