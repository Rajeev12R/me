"use client"

import React, { useEffect, useState } from "react"
import axios from "axios"
import Hero from "@/components/HomepageComponents/Hero"
import SocialBar from "@/components/HomepageComponents/SocialBar"
import TopProjects from "@/components/HomepageComponents/TopProjects"
import SkillSet from "@/components/HomepageComponents/SkillSet"
import Available from "@/components/HomepageComponents/Available"
import AboutSection from "@/components/HomepageComponents/AboutSection"
import { Testimonials } from "@/components/BackgroundComponents/Testimonials"
import OpenToWork from "@/components/HomepageComponents/OpenToWork"
import Footer from "@/components/HomepageComponents/Footer"
import SmoothCursor from "@/components/ui/smooth-cursor"
import TerminalLoader from "@/components/BackgroundComponents/TerminalLoader"

interface HomeContent {
  heading?: string
  subHeading?: string
  imageUrl?: string
  description?: string
  name?: string
  role?: string
  email?: string
  skills?: string[]
  topProjects?: any[]
}

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<HomeContent | null>(null)
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/homeContentApi")
        setData(res.data?.data)
        setIsLoading(false)
      } catch (err) {
        console.error("Error fetching home content:", err)
        setIsLoading(false)
      }
    }
    
    fetchData()
  }, [])

  useEffect(() => {
  const timer = setTimeout(() => {
    setShowLoader(false)
  }, 4100)

  return () => clearTimeout(timer)
}, [])

  return (
    <>
      {showLoader && (
        <TerminalLoader 
          isLoading={isLoading} 
          loadingText="Initializing portfolio environment" 
          maxDisplayTime={5000} 
        />
      )}
      
      {!showLoader && (
        <main className="max-w-6xl mx-auto flex flex-col">
          <SmoothCursor />
          <Available/>
          <Hero data={data} />
          <TopProjects data={data} />
          <SkillSet data={data} />
          <AboutSection/>
          <Testimonials/>
          <OpenToWork/>
          <Footer/>
          <SocialBar />
        </main>
      )}
    </>
  )
}

export default HomePage