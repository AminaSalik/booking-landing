import React, { useEffect } from 'react'
import "../assets/style/Hero.css";
import Benefits_ from "./Benefits"
import Navbar from "./Navbar"
import Booking from "./booking" 
import Doctor from '../assets/img/Doctor.png'
import Lawyer from '../assets/img/Lawyer.png'
import Teacher from '../assets/img/Teacher.png'
import Project_Team from '../assets/img/Project_Team.png'
import Problem      from '../assets/img/Problem.png'
import Solution     from '../assets/img/Solution.png'
import { OrbController } from "../utils/animations" // Import the controller

export default function Hero() {
  useEffect(() => {
    new OrbController(); // Initialize the animation
  }, []);

  return (
    <>
      <Navbar/>

      <header className="min-h-screen py-10 px-5 xl:py-0 xl:px-0">
        <div className="min-h-screen xl:grid place-items-center place-content-center xl:grid-cols-2 xl:max-w-screen-xl mx-auto w-11/12 xl:max-w-screen-2xl gap-14">
          <div className="max-w-xl mx-auto xl:max-w-2xl xl:-mt-8">
            <h1 className="text-3xl xl:text-5xl font-semibold xl:leading-snug text-white 2xl:text-6xl 2xl:leading-snug">Appointments <span className="span__">Faster </span> for your Business</h1>
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
            {/* Added orb-canvas to the card container */}
            <div className="card--1 max-w-xs bg-white shadow-xl rounded-3xl pt-4 pb-8 px-5 lg:row-start-1 lg:row-end-3 orb-canvas">
              <div className="w-full h-40 lg:h-48 xl:h-56">
                <img className="w-full h-full object-cover rounded-2xl img-floating" src={Project_Team} alt="Project Team" />
              </div>
              <div>
                <h2 className="capitalize font-semibold text-lg mt-3 mb-2 text-gray-900 ">Project Team</h2>
                <p className="text-gray-400 text-sm flex justify-between items-center">Team <span className="flex items-center"><svg className="w-5 h-5 mr-1 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>5.0</span></p>
              </div>
            </div>

            <div className="card--2 w-full max-w-xs flex items-center bg-white shadow-xl rounded-3xl w-80 p-5 lg:row-start-1 lg:row-end-2 orb-canvas">
              <div className="w-20 h-20">
                <img src={Teacher} alt="Elise Doe" className="rounded-2xl object-cover w-full h-full img-floating" />
              </div>
              <div className="ml-4">
                <h2 className="text-lg text-gray-900 font-semibold capitalize">Teacher</h2>
                <p className="text-gray-400 mt-1 mb-2 text-sm">Teacher</p>
                <ul className="flex">
                  {[...Array(5)].map((_, i) => (
                    <li key={i}><svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg></li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="card--3 max-w-xs bg-white shadow-xl rounded-3xl pt-4 pb-8 px-5 lg:row-start-2 lg:row-end-5 orb-canvas">
              <div className="w-full h-40 lg:h-48 xl:h-56">
                <img className="w-full h-full object-cover rounded-2xl img-floating" src={Lawyer} alt="Galaxy Abstract Paint" />
              </div>
              <div>
                <h2 className="capitalize font-semibold text-lg mt-3 mb-2 text-gray-900">Lawyer</h2>
                <p className="text-gray-400 flex justify-between items-center text-sm">Lawyer <span className="flex items-center"><svg className="w-5 h-5 mr-1 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>5.0</span></p>
              </div>
            </div>

            <div className="card--4 lg:row-start-3 lg:row-end-4 max-w-xs flex items-center bg-white shadow-xl rounded-3xl w-80 p-5 w-full orb-canvas">
              <div className="w-20 h-20">
                <img src={Doctor} alt="John Doe" className="rounded-2xl object-cover w-full h-full img-floating" />
              </div>
              <div className="ml-4">
                <h2 className="text-lg text-gray-900 font-semibold capitalize">Doctor</h2>
                <p className="text-gray-400 mt-1 mb-2 text-sm">Doctor</p>
                <ul className="flex">
                   {[...Array(5)].map((_, i) => (
                    <li key={i}><svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Showcase Section */}
      <section className="py-20 bg-black">
  <div className="flex flex-col px-8 mx-auto space-y-12 max-w-7xl xl:px-12">
    
    {/* Header Section */}
    <div className="relative text-center">
      <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl text-white">
        Stop Wasting Time on <span className="text-yellow-500">Manual Scheduling</span>
      </h2>
      <p className="py-8 text-lg text-gray-300 intro sm:max-w-3xl mx-auto">
        We solved the biggest headaches in appointment booking so you can focus on what you do best.
      </p>
    </div>

    {/* Problem 1 -> Solution 1 */}
    <div className="flex flex-col mb-8 animated fadeIn sm:flex-row items-center">
      <div className="flex items-center mb-8 sm:w-1/2 md:w-5/12 sm:order-last">
        {/* Replace with your 'Appointment Confirmed' image */}
        <img className="rounded-lg shadow-xl img-floating border " src={Problem} alt="Smart Booking Interface" />
      </div>
      <div className="flex flex-col justify-center sm:w-1/2 md:w-7/12 sm:pr-16 text-white">
        <div className="text-red-500 font-bold mb-2 text-sm uppercase tracking-widest">The Problem</div>
        <h3 className="text-2xl md:text-4xl font-bold">Endless Back-and-Forth</h3>
        <p className="mt-5 text-lg text-gray-400">
          Spending hours on phone calls or texts just to find a time that works for everyone.
        </p>
        <div className="mt-6 p-4 bg-gray-900 border-l-4 border-yellow-500 rounded-r">
          <p className="font-semibold text-yellow-500">The Solution: Instant Self-Booking</p>
          <p className="text-sm text-gray-300">Clients view your real-time availability and book their own slot in under 30 seconds.</p>
        </div>
      </div>
    </div>

    {/* Problem 2 -> Solution 2 */}
    <div className="flex flex-col mb-8 animated fadeIn sm:flex-row items-center">
      <div className="flex items-center mb-8 sm:w-1/2 md:w-5/12">
        {/* Replace with your 'Dashboard' image */}
        <img className="rounded-lg shadow-xl img-floating border" src={Solution} alt="WhatsApp Integration" />
      </div>
      <div className="flex flex-col justify-center sm:w-1/2 md:w-7/12 sm:pl-16 text-white">
        <div className="text-red-500 font-bold mb-2 text-sm uppercase tracking-widest">The Problem</div>
        <h3 className="text-2xl md:text-4xl font-bold">No-Shows & Cancellations</h3>
        <p className="mt-5 text-lg text-gray-400">
          Losing money and time because clients simply forget their appointments.
        </p>
        <div className="mt-6 p-4 bg-gray-900 border-l-4 border-green-500 rounded-r">
          <p className="font-semibold text-green-500">The Solution: WhatsApp Reminders</p>
          <p className="text-sm text-gray-300">Our system sends smart alerts to ensure your clients show up on time, every time.</p>
        </div>
      </div>
    </div>

  </div>
</section>

      <Benefits_/>
      <Booking/>
    </>
  )
}