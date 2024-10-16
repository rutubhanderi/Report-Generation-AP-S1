import React from 'react'
import Header from '../components/Header'
import styles from './Home.module.css'

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">

        {/* Section 1 of home page */}
        <section className={`${styles.backgroundImage} relative h-[calc(100vh-64px)]`}>    
          <div className={`${styles.overlay} absolute inset-0`}></div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
          
          </div>
        </section>


        {/* section 2 of home page */}
        <section className="bg-gray-100 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">ABOUT US</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className={`${styles.missionVisionCard} bg-gray-700 text-white rounded-lg p-6 shadow-lg flex flex-col items-center`}>
                <h3 className="text-2xl font-semibold mb-4 text-center">Mission</h3>
                <ul className="space-y-2 text-center">
                  <li>Helping child to take his first step to the literacy.</li>
                  <li>Giving emotional security to the child along with his education.</li>
                  <li>Spreading awareness in the parents about their child's education</li>
                  <li>Bringing awareness amongst the children about Children's Right.</li>
                </ul>
              </div>
              <div className={`${styles.missionVisionCard} bg-gray-700 text-white rounded-lg p-6 shadow-lg flex flex-col items-center`}>
                <h3 className="text-2xl font-semibold mb-4 text-center">Vision</h3>
                <p className="mb-4 text-center">Support to Sustain Education for Underprivileged Children.</p>
                <ol className="list-decimal list-inside space-y-2 text-center">
                  <li>Every child's education should start at his correct age.</li>
                  <li>Bridging the gap between underprivileged children and the main stream of education.</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  )
}

export default Home