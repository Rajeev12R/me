'use client'
import React from 'react'
import RetroGrid from '@/components/magicui/retro-grid'
const OpenToWork = () => {
  return (
    <section className="relative z-10 flex w-full max-w-6xl flex-col gap-y-6 text-center mx-auto text-white lg:mx-0">
      
      {/* Wings (optional decorative image) */}
      <div className="relative flex h-[500px] w-full flex-col my-8 items-center justify-center overflow-hidden rounded-lg bg-foreground">

      <RetroGrid />

      {/* Headline */}
      <div>
        <h3 className="text-2xl sm:text-4xl lg:text-5xl font-light tracking-wide">
          FROM CONCEPT TO <span className="font-extrabold">CREATION</span>
        </h3>
        <h3 className="mt-3 text-2xl sm:text-4xl lg:text-5xl font-light tracking-wide">
          LET'S MAKE IT <span className="font-extrabold">HAPPEN!</span>
        </h3>
      </div>

      {/* Button */}
      <div className="mt-6">
        <button className="group relative inline-flex items-center rounded-full border hover:border-gray-500 border-black/30 bg-white py-2 px-5 text-base font-medium text-black dark:text-white backdrop-blur transition-transform hover:scale-105 hover:bg-transparent">
          <span className="z-10 transition-colors duration-300 group-hover:text-white dark:group-hover:text-black">
            Get In Touch
          </span>
          <span className="absolute inset-0 translate-x-[45%] scale-0 rounded-full bg-black opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100 dark:bg-white"></span>
        </button>
      </div>

      {/* Subtext */}
      <p className="mt-4 text-base font-semibold lg:text-2xl">
        I'm available for full-time roles & freelance projects.
      </p>
      <p className="mt-2 text-sm lg:text-xl font-extralight tracking-wide text-white/75 dark:text-black/75">
        I thrive on crafting dynamic web applications and delivering seamless user experiences.
      </p>
    </div>
    </section>
  )
}

export default OpenToWork
