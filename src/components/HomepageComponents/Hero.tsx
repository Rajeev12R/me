"use client"
import React from "react"
import { RiArrowRightSLine } from "react-icons/ri"
import { CiLocationArrow1 } from "react-icons/ci"
import ProfileGrid from "./ProfileGrid"

interface HeroProps {
  data: {
    heading?: string
    subHeading?: string
    imageUrl?: string
    description?: string
    name?: string
    role?: string
    email?: string
    skills?: string[]
  } | null
}

const Hero = ({ data }: HeroProps) => {
  return (
    <section className="flex flex-col h-full w-full items-center justify-center mt-20 px-4">
      <div className="max-w-lg mx-auto pr-4 pl-1 py-1 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center gap-2 shadow-sm">
        <span className="bg-blue-600 text-white text-xs font-medium px-2 py-0.5 rounded-full">New</span>
        <span className="text-sm text-white/80">
          Building <span className="font-semibold text-white">Converge-X</span>
        </span>
        <RiArrowRightSLine className="text-white/70 text-lg" />
      </div>

      <h1 className="max-w-[830px] leading-12 text-4xl sm:text-5xl font-bold text-center mt-6 bg-white bg-clip-text text-transparent">
        {data?.heading ?? "Crafting Digital Experiences with Code and Creativity"}
      </h1>

      <p className="max-w-2xl text-center mt-8 text-lg sm:text-xl text-white/70">
        {data?.subHeading ??
          "I'm Ranjan, a passionate developer dedicated to transforming ideas into innovative digital solutions."}
      </p>

      <div className="relative group rounded-full mt-8 px-6 py-3 inline-flex items-center gap-3 cursor-pointer shadow-lg overflow-hidden border border-white/10">
        <div className="absolute top-0 right-0 h-full w-full bg-white transform translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out z-0"></div>
        <button className="relative z-10 font-medium text-white group-hover:text-black transition-colors duration-500">
          Let's Connect
        </button>
        <CiLocationArrow1 className="relative z-10 text-white/70 group-hover:text-black text-lg transition-all duration-500 group-hover:translate-x-1 group-hover:rotate-45" />
      </div>

      <ProfileGrid data={data} />
    </section>
  )
}

export default Hero