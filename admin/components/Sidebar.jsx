import React from 'react'
import { Link } from 'react-router-dom'
import {BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsGrid3X3GapFill,
  BsPeopleFill, BsListCheck, BsMenuButtonWideFill, BsFillGearFill, BsFillBellFill
} from 'react-icons/bs'

const Sidebar = () => {
  return (
    <aside id="sidebar">
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          <Link to='/admin/dashboard'>
            <BsCart3 className='icon_header' /> TISORA SHOP
          </Link>      
        </div>
        <span className='icon close_icon'>X</span>
      </div>

        <ul className='sidebar-list' onClick={'/admin/Dashboard'}>
          <li className='sidebar-list-item'>
            <Link to='/admin/dashboard'>
              <BsGrid1X2Fill className='icon'/> Dashboard
            </Link>
          </li>

          <li className='sidebar-list-item'>
            <Link to='/admin/products'>
              <BsFillArchiveFill className='icon'/> Products
            </Link>
          </li>

          <li className='sidebar-list-item'>
            <Link to='/admin/users'>
              <BsPeopleFill className='icon'/> Users
            </Link>
          </li>

          <li className='sidebar-list-item'>
            <Link to='/admin/inventories'>
              <BsListCheck className='icon'/> Inventories
            </Link>
          </li>

          <li className='sidebar-list-item'>
            <Link to='/admin/orders'>
              <BsFillBellFill className='icon'/> Orders
            </Link>
          </li>

          <li className='sidebar-list-item'>
            <Link to='/admin/settings'>
              <BsFillGearFill className='icon'/> Settings
            </Link>
          </li>
        </ul>
    </aside>
  )
}

export default Sidebar
