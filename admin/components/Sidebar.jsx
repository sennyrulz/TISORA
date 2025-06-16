import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { BsCart3, BsGrid1X2Fill, BsFillGearFill, BsFillBellFill
} from 'react-icons/bs';
import { handleWebhook } from '../../backEnd/controllers/orderController';

const Sidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false); // Close sidebar on navigation
  };

  return (
    <>
      {/* Overlay (only when sidebar is open) */}
      {isOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}

      {/* Always show hamburger */}
      <div className="hamburger-wrapper">
        <span className="toggle-icon" onClick={toggleSidebar}>
          {isOpen ? <X /> : <Menu />}
        </span>
      </div>

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-title">
          <div className="sidebar-brand">
            <BsCart3 className='icon-header' />
            PROFILE
          </div>
        </div>

        <ul className="sidebar-list">
          <li className="sidebar-list-item" onClick={() => handle('/dashboard')}>
            <BsGrid1X2Fill className='icon' /> Dashboard
          </li>
          <li className="sidebar-list-item" onClick={() => handleNavigate('/orders')}>
            <BsFillBellFill className='icon' /> Orders
          </li>
             <li className='sidebar-list-item' onClick= {() => navigate('/users')}>
              <BsPeopleFill className='icon'/> Users  
          </li>
          <li className='sidebar-list-item' onClick= {() => navigate('/inventories')}>
              <BsListCheck className='icon'/> Inventories
          </li>

          <li className='sidebar-list-item' onClick= {() => navigate( '/products')}>
             <BsFillBellFill className='icon' /> Products
          </li>

          <li className="sidebar-list-item" onClick={() => handleNavigate('/settings')}>
            <BsFillGearFill className='icon' /> Settings
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;

