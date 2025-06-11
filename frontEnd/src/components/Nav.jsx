import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Menu, X } from 'lucide-react';
import logo from '../assets/Tisora.svg';
import QuickCart from './QuickCart';
import AuthSidebar from './AuthSidebar';

const NavLinks = ({ onClick }) => (
  <div className="nav-links1 py-10 pb-4 d-flex justify-center">
    <NavLink onClick={onClick} to="/newIn" style={{ textDecoration: 'none', color: 'white' }}>NEW IN</NavLink>
    <NavLink onClick={onClick} to="/shop" style={{ textDecoration: 'none', color: 'white' }}>SHOP</NavLink>
    <NavLink onClick={onClick} to="/discover" style={{ textDecoration: 'none', color: 'white' }}>DISCOVER</NavLink>
    <NavLink onClick={onClick} to="/user" style={{ textDecoration: 'none', color: 'white' }}>SIGN IN</NavLink>
  </div>
);

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showQuickCart, setShowQuickCart] = useState(false);
  const [showAuthSidebar, setShowAuthSidebar] = useState(false);

  return (
    <div className="container-fluid nav-container px-5">
      <div className="row justify-content-between align-items-center">
        {/* Logo */}
        <div className="col-lg-2 col-6 d-flex justify-content-start">
          <Link to="/">
            <img src={logo} alt="Logo" className="logo" />
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="col-lg-6 d-none d-lg-flex justify-content-center">
          <NavLinks onClick={() => setIsOpen(false)} />
        </div>

        {/* Right-side Icons & Mobile Menu */}
        <div className="col-lg-4 col-6 d-flex justify-content-end align-items-center">
          {/* Icons */}
          <div className="nav-icons d-flex gap-10">
            <NavLink to="/search">
              <FontAwesomeIcon icon={faSearch} />
            </NavLink>
            <NavLink to="#" onClick={() => setShowAuthSidebar(true)}>
              <FontAwesomeIcon icon={faUser} />
            </NavLink>
            <NavLink 
              to="#" 
              onClick={(e) => {
                e.preventDefault();
                setShowQuickCart(true);
              }}
            >
              <FontAwesomeIcon icon={faShoppingCart} />
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <Button className="hamburger d-lg-none" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="mobile-menu d-lg-none">
          <NavLinks onClick={() => setIsOpen(false)} />
        </div>
      )}

      {/* Quick Cart */}
      <QuickCart 
        isOpen={showQuickCart} 
        onClose={() => setShowQuickCart(false)} 
      />

      {/* Auth Sidebar */}
      <AuthSidebar 
        isOpen={showAuthSidebar}
        onClose={() => setShowAuthSidebar(false)}
      />
    </div>
  );
};

export default Nav;
