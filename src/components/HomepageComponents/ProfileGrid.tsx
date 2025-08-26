"use client"
import { SiTailwindcss } from "react-icons/si"
import { useState, useEffect } from "react"
import axios from "axios"

interface HomeContent {
  imageUrl: string
  description: string
  name: string
  role: string
  email: string
  skills: string[]
}

const ProfileShowcaseSection = () => {
  const [content, setContent] = useState<HomeContent | null>(null)

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get("/api/homeContentApi")
        const data = await response.data
        if (data.success) {
          setContent(data.data)
        }
      } catch (error) {
        console.error("Error fetching profile content:", error)
      }
    }

    fetchContent()
  }, [])

  const skillsRow1 = content?.skills?.slice(0, Math.ceil((content.skills.length || 0) / 2)) || []
  const skillsRow2 = content?.skills?.slice(Math.ceil((content.skills.length || 0) / 2)) || []
  return (
    <section className="w-full bg-black text-white px-6 py-16 mt-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {/* Profile Card - Full Column Layout */}
        <div className="md:row-span-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col shadow-lg relative">
          {/* Full Image at Top */}
          <div className="w-full overflow-hidden rounded-xl mb-6">
            <img
              src={content?.imageUrl || "/default-profile.jpg"}
              alt="Profile"
              className="w-full h-64 md:h-80 object-cover rounded-xl"
            />
          </div>

          {/* Content in middle - grows to fill space */}
          <div className="flex-1 flex flex-col justify-center items-center text-center mb-6">
            <h3 className="text-2xl font-bold mb-2">{content?.name || "Rajeev"}</h3>
            <p className="text-purple-400 text-sm font-medium mb-4">{content?.role}</p>
          </div>

          {/* Description at Bottom */}
          <div className="mt-auto">
            <p className="text-gray-400 text-center text-sm leading-relaxed">
              {content?.description ||
                "I'm Ranjan, a passionate developer dedicated to transforming ideas into innovative digital solutions."}
            </p>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-lg overflow-hidden relative">
          <h3 className="text-xl font-semibold mb-4 text-purple-400">Passionate about cutting-edge technologies</h3>

          {/* Modern Marquee Container with gradient masks */}
          <div className="relative">
            {/* Gradient masks for smooth fade effect */}
            <div className="absolute left-0 top-0 w-8 h-full bg-gradient-to-r from-black/20 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 w-8 h-full bg-gradient-to-l from-black/20 to-transparent z-10 pointer-events-none"></div>

            {/* Row 1 - Modern smooth marquee */}
            <div className="marquee-container mb-3">
              <div className="marquee-content">
                {[...skillsRow1, ...skillsRow1].map((skill, idx) => (
                  <span
                    key={idx}
                    className="skill-tag bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-sm flex items-center gap-1 border border-white/20 hover:bg-white/20 transition-all duration-300"
                  >
                    {skill === "TailwindCSS" ? <SiTailwindcss className="text-cyan-400" /> : null}
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Row 2 - Reverse direction marquee */}
            <div className="marquee-container-reverse">
              <div className="marquee-content-reverse">
                {[...skillsRow2, ...skillsRow2].map((skill, idx) => (
                  <span
                    key={idx}
                    className="skill-tag bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-sm flex items-center gap-1 border border-white/20 hover:bg-white/20 transition-all duration-300"
                  >
                    {skill === "TailwindCSS" ? <SiTailwindcss className="text-cyan-400" /> : null}
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Contact CTA Card */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-lg text-center flex flex-col justify-center items-center">
          <h3 className="text-xl font-semibold mb-4">Let's work together on your next project</h3>
          <button className="flex items-center gap-3 px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition">
            <span>{content?.email}</span>
          </button>
        </div>

        <div className="md:col-span-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-lg overflow-hidden relative">
          <h3 className="text-xl font-semibold mb-4">The Inside Scoop</h3>

          {/* Static text with subtle animation */}
          <div className="relative mb-4">
            <div className="status-text whitespace-nowrap">
              <span className="text-gray-400 animate-pulse">
                Currently building a SaaS Application • Currently building a SaaS Application • Currently building a
                SaaS Application •{" "}
              </span>
            </div>
          </div>

          {/* Advanced Services Marquee */}
          <div className="relative">
            {/* Gradient masks */}
            <div className="absolute left-0 top-0 w-12 h-full bg-gradient-to-r from-black/30 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 w-12 h-full bg-gradient-to-l from-black/30 to-transparent z-10 pointer-events-none"></div>

            <div className="services-marquee">
              <div className="services-track">
                <div className="service-card bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-3">
                  Monitoring & Analytics Infrastructure
                </div>
                <div className="service-card bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-3">
                  Design System & UI Consistency
                </div>
                <div className="service-card bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-3">
                  API Gateway & Documentation
                </div>
                <div className="service-card bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-3">
                  User Onboarding Flow Design
                </div>
                <div className="service-card bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-3">
                  Payment System Architecture
                </div>
                <div className="service-card bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-3">
                  Real-time Collaboration Tools
                </div>
                {/* Duplicate for seamless loop */}
                <div className="service-card bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-3">
                  Monitoring & Analytics Infrastructure
                </div>
                <div className="service-card bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-3">
                  Design System & UI Consistency
                </div>
                <div className="service-card bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-3">
                  API Gateway & Documentation
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProfileShowcaseSection
