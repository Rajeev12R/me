"use client"
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { MotionPathPlugin } from "gsap/MotionPathPlugin"
gsap.registerPlugin(MotionPathPlugin)

interface SkillsProps {
  data: {
    skills?: string[]
  } | null
}

const SkillSet = ({ data }: SkillsProps) => {
  const [loading, setLoading] = useState(!data?.skills?.length)
  const avatarRef = useRef<HTMLDivElement | null>(null)
  const waveRef = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    if (data?.skills?.length) {
      setLoading(false)
    }
  }, [data])

  useEffect(() => {
    if (avatarRef.current && waveRef.current) {
      const avatar = avatarRef.current

      const tl = gsap.timeline({ repeat: -1 })

      // Initial bounce entrance
      tl.fromTo(
        avatar,
        {
          y: -200,
          x: -300,
          opacity: 0,
          scale: 0.5,
          rotation: 0,
        },
        {
          y: 0,
          x: -300,
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "bounce.out",
        },
      )

      tl.to(avatar, {
        x: 300,
        y: 15, // Lower to ground while moving
        rotation: 360,
        duration: 3,
        ease: "power2.inOut",
      })

        .to(avatar, {
          y: -10,
          duration: 0.2,
          ease: "power2.out",
        })
        .to(avatar, {
          y: 15,
          duration: 0.3,
          ease: "bounce.out",
        })

        .to(avatar, {
          x: -300,
          y: 15, // Stay lowered to ground
          rotation: 720, // Continue rotation in same direction
          duration: 3,
          ease: "power2.inOut",
        })

        .to(avatar, {
          y: -10,
          duration: 0.2,
          ease: "power2.out",
        })
        .to(avatar, {
          y: 15,
          duration: 0.3,
          ease: "bounce.out",
        })

      const shadow = document.createElement("div")
      shadow.className = "absolute w-16 h-4 bg-black/40 rounded-full blur-sm"
      shadow.style.bottom = "2rem"
      shadow.style.left = "50%"
      shadow.style.transform = "translateX(-50%)"
      avatar.parentElement?.appendChild(shadow)

      const shadowTl = gsap.timeline({ repeat: -1 })
      shadowTl
        .set(shadow, { x: -300 })
        .to(shadow, { x: 300, duration: 3, ease: "power2.inOut", delay: 1.5 })
        .to(shadow, { x: -300, duration: 3, ease: "power2.inOut", delay: 0.5 })
    }
  }, [])

  return (
    <section className="w-full h-full bg-black text-white px-6 py-16 relative overflow-hidden">
      <div className="w-full text-center">
        {/* Title */}
        <h2 className="text-4xl font-bold mb-4">My Skillset</h2>
        <p className="max-w-7xl mx-auto text-md font-semibold max-w-2xl mx-auto">
          Proficient in modern web technologies and frameworks, delivering responsive and scalable solutions.
        </p>

        {/* Skills */}
        <div className="max-w-2xl mx-auto my-12 mb-32 flex flex-wrap justify-center gap-4">
          {loading && <p className="text-gray-400 text-sm">Loading skills...</p>}

          {!loading && data?.skills?.length
            ? data.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-4 py-2 rounded-full text-sm font-medium text-white bg-gray-900 border border-gray-700 hover:shadow-[0_0_15px_rgba(255,255,255,0.6)] transition-all duration-300"
                >
                  {skill}
                </span>
              ))
            : !loading && <p className="text-gray-400 text-sm">No skills found.</p>}
        </div>

      </div>
        <div
          ref={avatarRef}
          className="w-24 h-24 rounded-full border-4 border-white overflow-hidden absolute left-1/2 -translate-x-1/2 z-20 shadow-lg"
          style={{
            bottom: "4rem",
            filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.5))",
            background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3), transparent 50%)",
          }}
        >
          <img src="/images/avatar.png" alt="Profile" className="w-full h-full object-cover" />
          <div className="absolute top-2 left-2 w-4 h-4 bg-white/40 rounded-full blur-sm"></div>
        </div>

        <div className="w-full mt-15 absolute bottom-0 left-0">
          <svg
            ref={waveRef}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="w-full h-32"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#333" />
                <stop offset="100%" stopColor="#111" />
              </linearGradient>
            </defs>
            <path
              fill="url(#waveGradient)"
              d="M0,160L60,170C120,180,240,200,360,213.3C480,227,600,245,720,229.3C840,213,960,171,1080,138.7C1200,107,1320,85,1380,74.7L1440,64V320H0Z"
            ></path>
          </svg>
        </div>
    </section>
  )
}

export default SkillSet