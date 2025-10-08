import React from 'react'

const BrandTopic = () => {
  return (
    <div className='container-Brand-Topic mt-5 pt-5 mx-5 col-lg-12'>
      <h3 className='text-start p-5 font-black'>BRAND TOPIC</h3>
        <div className='bg-white d-flex flex-row px-5' >
          <img className='brandImg' style={{height: "500px"}} 
            src="https://res.cloudinary.com/dr1ay8vmn/image/upload/v1749553258/image00007_cxcbt4.jpg" 
            alt="" />
            <p className='text-lg-start pt-3 justify-text text-wrap' style={{margin:"150px 70px"}}>
              Tisora is a contemporary fashion house founded by Yemi. A brand rooted in African craftsmanship and reimagined for the modern world. Each collection blends heritage textiles with refined tailoring and fluid silhouettes that celebrate individuality and timeless elegance.From hand-dyed Adire and woven Aso-Oke to luxurious linen, silk, plissé, and mesh, every fabric tells a story -one of culture, creativity, and craftsmanship. Guided by intentional design and storytelling, Tisora creates pieces that move with grace and meaning, transcending trends.More than fashion, Tisora is a celebration of authenticity, artistry, and heritage refined; a reflection of where we come from and the beauty of how far we can go.
            </p>
        </div>
    </div>
  )
}

export default BrandTopic
