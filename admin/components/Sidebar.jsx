import React from 'react'
import {BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsGrid3X3GapFill,
  BsPeopleFill, BsListCheck, BsMenuButtonWideFill, BsFillGearFill, BsFillBellFill
} from 'react-icons/bs'

const Sidebar = () => {
  return (
    <aside id="sidebar">
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
            <BsCart3 className='icon_header' /> TISORA SHOP
        </div>
        <span className='icon close_icon'>X</span>
      </div>
        <ul className='sidebar-list'>
          <li className='sidebar-list-item'>
            <a href='/admin/Dashboard'>
              <BsGrid1X2Fill className='icon'/> Dashboard
            </a>
          </li>

          <li className='sidebar-list-item'>
            <a href='/admin/Products'>
              <BsFillArchiveFill className='icon'/> Products
            </a>
          </li>

          <li className='sidebar-list-item'>
            <a href='/admin/Users'>
              <BsPeopleFill className='icon'/> Users
            </a>
          </li>

          <li className='sidebar-list-item'>
            <a href='/admin/Inventories'>
              <BsListCheck className='icon'/> Inventories
            </a>
          </li>

          <li className='sidebar-list-item'>
            <a href='/admin/Orders'>
              <BsFillBellFill className='icon'/> Orders
            </a>
          </li>

          <li className='sidebar-list-item'>
            <a href='/admin/Settings'>
              <BsFillGearFill className='icon'/> Settings
            </a>
          </li>
        </ul>
    </aside>
  )
}

export default Sidebar
