'use client'
import React from 'react'
import Link from 'next/link'

const Header = () => {
  return (
    <header className="sticky top-6 px-4 z-100">
      <nav className="max-w-xl mx-auto relative ">
        <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl shadow-black/20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 opacity-50"></div>
          
          <div className="relative px-4 py-4 flex justify-evenly items-center space-x-2">
            <Link 
              href="/" 
              className="relative group px-4 py-2 text-white/90 font-medium text-sm tracking-wide transition-all duration-300 hover:text-white"
            >
              <span className="relative z-10">Home</span>
              <div className="absolute inset-0 bg-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-95 group-hover:scale-100 transform"></div>
            </Link>
            
            <Link 
              href="/about" 
              className="relative group px-4 py-2 text-white/90 font-medium text-sm tracking-wide transition-all duration-300 hover:text-white"
            >
              <span className="relative z-10">About</span>
              <div className="absolute inset-0 bg-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-95 group-hover:scale-100 transform"></div>
            </Link>
            
            <Link 
              href="/projects" 
              className="relative group px-4 py-2 text-white/90 font-medium text-sm tracking-wide transition-all duration-300 hover:text-white"
            >
              <span className="relative z-10">Projects</span>
              <div className="absolute inset-0 bg-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-95 group-hover:scale-100 transform"></div>
            </Link>
            
            <Link 
              href="/blogs" 
              className="relative group px-4 py-2 text-white/90 font-medium text-sm tracking-wide transition-all duration-300 hover:text-white"
            >
              <span className="relative z-10">Blogs</span>
              <div className="absolute inset-0 bg-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-95 group-hover:scale-100 transform"></div>
            </Link>
            
            <Link 
              href="/contact" 
              className="relative group px-4 py-2 text-white/90 font-medium text-sm tracking-wide transition-all duration-300 hover:text-white"
            >
              <span className="relative z-10">Contact</span>
              <div className="absolute inset-0 bg-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-95 group-hover:scale-100 transform"></div>
            </Link>
          </div>
          
          {/* Bottom highlight line */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        </div>
        
        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-xl opacity-30 -z-10"></div>
      </nav>
    </header>
  )
}

export default Header