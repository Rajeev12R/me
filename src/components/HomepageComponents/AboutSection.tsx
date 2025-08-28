'use client'
import React from 'react'
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa'
import Link from 'next/link'
const AboutSection = () => {
  return (
    <section className="w-full min-h-screen bg-black text-white px-6 pt-16 relative overflow-hidden flex items-center">
      <div className="max-w-4xl space-y-6">
        <h6 className="uppercase text-sm font-thin text-white/70">Know About Me</h6>
        <h1 className="text-4xl md:text-5xl font-bold text-white/70">
          Full-Stack Developer and a little bit of everything
        </h1>

        <p className="text-md font-semibold text-white/70">
          I'm <span className="font-bold text-white">Rajeev Ranjan</span>, a proactive full-stack developer passionate about creating dynamic web experiences. 
          From frontend to backend, I thrive on solving complex problems with clean, efficient code. My expertise spans React, Next.js, and Node.js, and I'm always eager to learn more.
        </p>
        <p className="text-md font-semibold text-white/70">
          When I'm not immersed in work, I'm exploring new ideas and staying curious. Life's about balance, and I love embracing every part of it.
        </p>
        <p className="text-md font-semibold text-white/70">
          I believe in waking up each day eager to make a difference!
        </p>
        <div className="flex gap-4 mt-4">
          <Link href="/https://linkedin.com" target="_blank" className="hover:text-blue-500 transition-colors">
            <FaLinkedin size={24} />
          </Link>
          <Link href="/https://github.com" target="_blank" className="hover:text-gray-400 transition-colors">
            <FaGithub size={24} />
          </Link>
          <Link href="/https://twitter.com" target="_blank" className="hover:text-blue-400 transition-colors">
            <FaTwitter size={24} />
          </Link>
        </div>

        {/* Work Experience / Logo */}
        <div className="flex items-center gap-4 mt-8">
          <div className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-md border border-white/20 flex items-center justify-center text-white font-bold">
            RR
          </div>
          <span className="font-semibold text-white/80">Rajeev Ranjan</span>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
