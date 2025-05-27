import React from 'react'
import { useNavigate } from 'react-router-dom'
import {BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsGrid3X3GapFill,
  BsPeopleFill, BsListCheck, BsMenuButtonWideFill, BsFillGearFill, BsFillBellFill
} from 'react-icons/bs'

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <aside id="sidebar">
      <div className='sidebar-title'>
        <div className='sidebar-brand'  onClick= {() => navigate('/admin/Dashboard')} >
          <BsCart3 className='icon_header' /> TISORA SHOP    
        </div>
        <span className='icon close_icon'>X</span>
      </div>

        <ul className='sidebar-list' onClick= {() => navigate('/admin/Dashboard')} >
          <li className='sidebar-list-item' onClick={() => navigate ('/admin/dashboard')}>
              <BsGrid1X2Fill className='icon'/> Dashboard
          </li>

          <li className='sidebar-list-item' onClick= {() => navigate('/admin/products')}>
              <BsFillArchiveFill className='icon'/> Products
          </li>

          <li className='sidebar-list-item' onClick= {() => navigate('/admin/users')}>
              <BsPeopleFill className='icon'/> Users  
          </li>

          <li className='sidebar-list-item' onClick= {() => navigate('/admin/inventories')}>
              <BsListCheck className='icon'/> Inventories
          </li>

          <li className='sidebar-list-item' onClick= {() => navigate( '/admin/orders')}>
              <BsFillBellFill className='icon'/> Orders
          </li>

          <li className='sidebar-list-item' onClick= {() => navigate('/admin/settings')}>
              <BsFillGearFill className='icon'/> Settings
          </li>
        </ul>
    </aside>
  )
}

export default Sidebar
