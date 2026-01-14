import React from 'react'
import "../assets/style/Hero.css";
import Benefits_ from "./Benefits"
import Navbar from "./Navbar"
import Booking from"./booking" 

export default function Hero() {
  return (
      <>


      <Navbar/>

 <header className="min-h-screen  py-10 px-5 xl:py-0 xl:px-0">
  <div className="min-h-screen xl:grid place-items-center place-content-center xl:grid-cols-2 xl:max-w-screen-xl mx-auto w-11/12 xl:max-w-screen-2xl gap-14">
    <div className="max-w-xl mx-auto xl:max-w-2xl xl:-mt-8">
      <h1 className="text-3xl xl:text-5xl font-semibold xl:leading-snug text-white 2xl:text-6xl 2xl:leading-snug">Appointments  <span className="span__">Faster </span> for your Business</h1>
      <p className="xl:leading-9 text-white xl:text-lg mt-3 mb-10">Streamline your schedule and give your clients the seamless booking experience they deserve.</p>
      <button className="btnSubscr text-white rounded-lg py-3.5 px-5 tracking-wider text-sm hover:bg-purple-800 shadow-lg inline-block">Get Started</button>

      <div className="flex items-center max-w-sm justify-between mt-16 mx-auto text-center lg:text-left lg:mx-0 text-white">
        <div>
          <span className="text-3xl font-semibold text-white">10K+</span>
          <p className="capitalize mt-2">Appointments Booked</p>
        </div>
        <div className="w-0.5 h-12 bg-white" />
        <div>
          <span className="text-3xl font-semibold text-white">99%</span>
          <p className="capitalize mt-2">Client Satisfaction</p>
        </div>
      </div>
    </div>
    <div className="card__grid mt-14 xl:mt-0 sm:justify-items-center">
      <div className="card--1 max-w-xs bg-white shadow-xl rounded-3xl pt-4 pb-8 px-5 lg:row-start-1 lg:row-end-3">
        <div className="w-full h-40 lg:h-48 xl:h-56">
          <img className="w-full h-full object-cover rounded-2xl" src="https://images.pexels.com/photos/33041/antelope-canyon-lower-canyon-arizona.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="Antelope Canyon" />
        </div>
        <div>
          <h2 className="capitalize font-semibold text-lg mt-3 mb-2 text-gray-900 ">antelope canyon</h2>
          <p className="text-gray-400 text-sm flex justify-between items-center">Elise Doe <span className="flex items-center"><svg className="w-5 h-5 mr-1 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>5.0</span></p>
        </div>
      </div>
      <div className="card--2 w-full max-w-xs flex items-center bg-white shadow-xl rounded-3xl w-80 p-5 lg:row-start-1 lg:row-end-2">
        <div className="w-20 h-20">
          <img src="https://images.pexels.com/photos/573299/pexels-photo-573299.jpeg?auto=compress&cs=tinysrgb&crop=faces&fit=crop&h=200&w=200" alt="Elise Doe" className="rounded-2xl object-cover w-full h-full" />
        </div>
        <div className="ml-4">
          <h2 className="text-lg text-gray-900 font-semibold capitalize">elise doe</h2>
          <p className="text-gray-400 mt-1 mb-2 text-sm">Artist</p>
          <ul className="flex">
            <li>
              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </li>
            <li><svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg></li>
            <li><svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg></li>
            <li><svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg></li>
            <li><svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg></li>
          </ul>
        </div>
      </div>
      <div className="card--3 max-w-xs bg-white shadow-xl rounded-3xl pt-4 pb-8 px-5 lg:row-start-2 lg:row-end-5">
        <div className="w-full h-40 lg:h-48 xl:h-56">
          <img className="w-full h-full object-cover rounded-2xl" src="https://images.pexels.com/photos/33688/delicate-arch-night-stars-landscape.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="Galaxy Abstract Paint" />
        </div>
        <div>
          <h2 className="capitalize font-semibold text-lg mt-3 mb-2 text-gray-900">galaxy abstract</h2>
          <p className="text-gray-400 flex justify-between items-center text-sm">John Doe <span className="flex items-center"><svg className="w-5 h-5 mr-1 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>5.0</span></p>
        </div>
      </div>
      <div className="card--4 lg:row-start-3 lg:row-end-4 max-w-xs flex items-center bg-white shadow-xl rounded-3xl w-80 p-5 w-full">
        <div className="w-20 h-20">
          <img src="https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&crop=faces&fit=crop&h=200&w=200" alt="John Doe" className="rounded-2xl object-cover w-full h-full" />
        </div>
        <div className="ml-4">
          <h2 className="text-lg text-gray-900 font-semibold capitalize">john doe</h2>
          <p className="text-gray-400 mt-1 mb-2 text-sm">Artist</p>
          <ul className="flex">
            <li>
              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </li>
            <li><svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg></li>
            <li><svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg></li>
            <li><svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg></li>
            <li><svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</header>








<section className="py-20 ">
  <div className="flex flex-col px-8 mx-auto space-y-12 max-w-7xl xl:px-12">
    <div className="relative">
      <h2 className="w-full text-3xl font-bold text-center sm:text-4xl md:text-5xl text-white"> Level Up Your Designs</h2>
      <p className="w-full py-8 mx-auto -mt-2 text-lg text-center text-white intro sm:max-w-3xl">Add some nice touches to your interface with our latest designs, components, and templates. We've crafted a beautiful user experience that your visitors will love. </p>
    </div>
    <div className="flex flex-col mb-8 animated fadeIn sm:flex-row">
      <div className="flex items-center mb-8 sm:w-1/2 md:w-5/12 sm:order-last">
        <img className="rounded-lg shadow-xl" src="https://cdn.devdojo.com/images/december2020/dashboard-011.png" alt />
      </div>
      <div className="flex flex-col justify-center mt-5 mb-8 md:mt-0 sm:w-1/2 md:w-7/12 sm:pr-16">

        <h3 className="mt-2 text-2xl sm:text-left md:text-4xl text-white">Design Made Easy</h3>
        <p className="mt-5 text-lg text-white text md:text-left">Crafting your user experience has never been easier, with our intuitive drag'n drop interface you will be creating beatiful designs in no time.</p>
      </div>
    </div>
    <div className="flex flex-col mb-8 animated fadeIn sm:flex-row">
      <div className="flex items-center mb-8 sm:w-1/2 md:w-5/12">
        <img className="rounded-lg shadow-xl" src="https://cdn.devdojo.com/images/december2020/dashboard-04.png" alt />
      </div>
      <div className="flex flex-col justify-center mt-5 mb-8 md:mt-0 sm:w-1/2 md:w-7/12 sm:pl-16">
        <h3 className="mt-2 text-2xl sm:text-left md:text-4xl text-white">Optimized For Conversions</h3>
        <p className="mt-5 text-lg text-white text md:text-left">Backed by data, these templates have been crafted for ultimate optimization. Now, converting your visitors into customers is easier than ever before.</p>
      </div>
    </div>
    <div className="flex flex-col mb-8 animated fadeIn sm:flex-row">
      <div className="flex items-center mb-8 sm:w-1/2 md:w-5/12 sm:order-last">
        <img className="rounded-lg shadow-xl" src="https://cdn.devdojo.com/images/december2020/dashboard-03.png" alt />
      </div>
      <div className="flex flex-col justify-center mt-5 mb-8 md:mt-0 sm:w-1/2 md:w-7/12 sm:pr-16">
   
        <h3 className="mt-2 text-2xl sm:text-left md:text-4xl text-white">Make It Your Own</h3>
        <p className="mt-5 text-lg text-white text md:text-left">All templates and components are fully customizable. You can use these templates to tell your personal story and convey your message.</p>
      </div>
    </div>
  </div>
</section>

















<Benefits_/>










  <Booking/>




























    </>
  )
}
