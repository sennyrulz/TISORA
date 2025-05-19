import React from 'react'
import heroImage from '../assets/TisoraBanner_1.jpg'
import whatsapp from '../assets/whatsapp.png'
import instagram from '../assets/instagram.png'
import TikTok from '../assets/Tiktok.png'
import { Link } from "react-router";


const HeroBanner = () => {
  return (
  <>
  <div style={{marginTop:-750, marginLeft:200}}>
    
    <h1 style={{
          marginLeft: 500, 
          marginBottom: 20, 
          textSize: 50,
          zIndex:1 }}> 
          Rooted in the vibrant diverse<br />cultures of Africa.
    </h1>


    <Link to = "/shop">
    <button style={{
      marginLeft: 500, 
      marginBottom: 570, 
      marginTop:-700,
      textSize: 50,
      height: 40,
      width:300,
      zIndex:1,
      color:'white',
      background:'black',
      border: 'none',
      pointer: 'mouse'}}> Explore
    </button>
    </Link> 
{/*     
    <span style={{
      backgroundColor:'black', 
      height:200, 
      width:200, 
      zIndex:2,
      marginTop:-100,
      }}>
      </span> */}
  </div>
    
    <div className='hero-container' style={{ height: "450px", margin: '-900px 0 200px 0', zIndex:-1 }}>
      <img className='heroBanner1' style={{ height: "450px" }} src={heroImage} alt="Hero Banner" />
      
      <div className='social-icons'>
        <img style={{cursor: 'pointer'}} onClick={"http://whatsapp.com"} src={whatsapp} alt="Whatsapp" />
        <img src={instagram} alt="Instagram" />
        <img src={TikTok} alt="Tiktok" />
      </div>
    </div>
  </>
  )
}

export default HeroBanner;
