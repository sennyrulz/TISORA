import React from 'react'
import heroImage from '../assets/TisoraBanner_1.jpg'
import whatsapp from '../assets/whatsapp.png'
import instagram from '../assets/instagram.png'
import TikTok from '../assets/Tiktok.png'
import { useNavigate } from 'react-router-dom'


const HeroBanner = () => {

const navigate = useNavigate(); 
  return (
  <>
  <div style={{marginTop:-800, marginLeft:200}}>
    
    <h1 className='bannerText d-none d-md-block' 
      style={{
        marginLeft: 500, 
        marginBottom: 20, 
        fontSize: 50,
        zIndex:1 }}> 
        Rooted in the vibrant diverse<br />
        cultures of Africa.
    </h1>

    {/* <button 
    className='bannerBtn'
    style={{
      marginLeft: 500, 
      marginBottom: 560, 
      fontSize: 18,
      height: 40,
      width:250,
      zIndex:5,
      color:'white',
      background:'black',
      border: 'none',
      cursor: 'pointer'}}
      onClick={() => {
        navigate("/shop");
      }}>
      Explore
    </button> */}

  </div>
     <span className='social-icons'>
        <a href="https://wa.me/+2348087439193" target="_blank" rel="noopener noreferrer">
          <img style={{ cursor: 'pointer' }} src={whatsapp} alt="Whatsapp" />
        </a>
        <a href="https://www.instagram.com/tisoraa/" target="_blank" rel="noopener noreferrer">
          <img style={{ cursor: 'pointer' }} src={instagram} alt="Instagram" />
        </a>
        <a href="https://www.tiktok.com/@tisora.fashion" target="_blank" rel="noopener noreferrer">
          <img style={{ cursor: 'pointer' }} src={TikTok} alt="Tiktok" />
        </a>
      </span>

    <div className='hero-container' style={{ height: "450px", margin: '-900px 0 200px 0', zIndex:-1 }}>      
          <img className='heroBanner1' style={{ height: "450px" }} src={heroImage} alt="Hero Banner" />

    </div>
  </>
  )
}

export default HeroBanner;
