import React, { useEffect } from 'react'
import { Pictures } from '../constants'

const Carousel = () => {
return (
        <div id="default-carousel" className="z-10 relative h-screen w-full" data-carousel="slide">
            {/* <!-- Carousel wrapper --> */}
            <div className="relative h-screen overflow-hidden">
                {/* <!-- Pictures --> */}
                {
                    Pictures.map((picture, index) => (
                        <div key={index} className="h-screen duration-700 ease-in-out" data-carousel-item>
                            {
                                <a href='#'>
                                    <div className='relative bg-cover bg-no-repeat h-screen w-full absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2' style={{backgroundImage: `url(${picture.picture})`}}>
                                        <div className=' absolute w-full h-full top-0 left-0 z-20 bg-gradient-to-b from-black to-transparent flex justify-start items-center'>
                                            <h1 className='text-4xl text-right leading-[5rem] text-white font-extrabold font-Rubik padding bg-transparent shadow-2xl w-[50%] h-[600px] flex justify-center items-center'>{picture.title}</h1>
                                            <h1 className='absolute h-[600px] right-0 text-8xl z-20 w-1/2 flex items-center justify-center text-white font-sans font-extrabold'>في موقعنا تجد</h1>
                                        </div>
                                    </div>
                                </a>
                            }
                        </div>
                    ))
                }
            </div>
        </div>
  )
}

export default Carousel