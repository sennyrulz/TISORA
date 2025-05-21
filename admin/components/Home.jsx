import React from 'react'
import {BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsGrid3X3GapFill,
  BsPeopleFill, BsListCheck, BsMenuButtonWideFill, BsFillGearFill,
  BsFillBellFill
} from 'react-icons/bs'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
    Legend, ResponsiveContainer } from 'recharts';


const Home = () => {

    const data = [
  {
    date: '2025-01',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    date: '2025-02',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    date: '2025-03',
    uv: 2025,
    pv: 9800,
    amt: 2290,
  },
  {
    date: '2025-04',
    uv: 2780,
    pv: 3908,
    amt: 2025,
  },
  {
    date: '2025-05',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    date: '2025-06',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    date: '2025-07',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    date: '2025-08',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    date: '2025-09',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    date: '2025-10',
    uv: 2025,
    pv: 9800,
    amt: 2290,
  },
  {
    date: '2025-11',
    uv: 2780,
    pv: 3908,
    amt: 2025,
  },
  {
    date: '2025-12',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
];

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

            <div className='card'>
                <div className='card-inner'>
                    <h3>SETTINGS</h3>
                     <BsFillGearFill className='card-icon'/>
                </div>
                <h1>300</h1>
            </div>

            <div className='charts'>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickFormatter={monthTickFormatter} />
                    <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        interval={0}
                        tick={renderQuarterTick}
                        height={1}
                        scale="band"
                        xAxisId="quarter"/>
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="pv" fill="#8884d8" />
                    <Bar dataKey="uv" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    </main>
  )
}

export default Home
