import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import backgroundImage from '../assets/homesec1.jpg'

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section
          className="relative h-[calc(100vh-64px)] bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >

          <div className="absolute inset-0 bg-black bg-opacity-50"></div>

          <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Home
