'use client'
import React from 'react'
import Link from 'next/link'
import { SparklesText } from "@/components/magicui/sparkles-text";
const Footer = () => {
  return (
    <footer className="bg-black text-white py-16">
      <div className="mx-auto max-w-6xl px-4 flex flex-col gap-10 md:flex-row md:justify-between">

        {/* Logo + Description */}
        <div className="flex flex-col gap-4 md:w-1/3">
          <Link href="/" className="inline-block text-white">
            <SparklesText className='text-lg'>Namaste</SparklesText>
          </Link>
          <div className="flex flex-col gap-5">

          <p className="text-sm leading-5 text-gray-300">
            I'm Rajeev - a full-stack developer, freelancer & problem solver. Thanks for checking out my site!
            </p>
            <p>Let's build something amazing together.</p>
          </div>
        </div>
        {/* Links */}
        <div className="flex flex-col gap-6 md:flex-row md:gap-16">
          {/* General */}
          <div>
            <h4 className="text-base font-semibold mb-3">Navigation</h4>
            <ul className="flex flex-wrap gap-3 md:flex-col">
              <li><Link href="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-blue-400 transition-colors">About</Link></li>
              <li><Link href="/projects" className="hover:text-blue-400 transition-colors">Projects</Link></li>
              <li><Link href="/blog" className="hover:text-blue-400 transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Specifics */}
          <div>
            <h4 className="text-base font-semibold mb-3">Explore</h4>
            <ul className="flex flex-wrap gap-3 md:flex-col">
              <li><Link href="/guestbook" className="hover:text-blue-400 transition-colors">Guest Book</Link></li>
              <li><Link href="/bucket-list" className="hover:text-blue-400 transition-colors">Bucket List</Link></li>
              <li><Link href="/uses" className="hover:text-blue-400 transition-colors">My Setup</Link></li>
              <li><Link href="/attribution" className="hover:text-blue-400 transition-colors opacity-50 pointer-events-none">Attribution</Link></li>
            </ul>
          </div>

          {/* More */}
          <div>
            <h4 className="text-base font-semibold mb-3">Connect</h4>
            <ul className="flex flex-wrap gap-3 md:flex-col">
              <li><Link href="/contact" className="hover:text-blue-400 transition-colors">Book a Call</Link></li>
              <li><Link href="/links" className="hover:text-blue-400 transition-colors">All Links</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mx-auto max-w-6xl mt-10 border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between px-4">
        <p className="text-sm text-gray-400">
          &copy; 2025 <Link href="/" className="hover:text-blue-400 transition-colors">DigitalCraftsman</Link>. Crafted with passion.
        </p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Link href="https://linkedin.com/in/iaayushbharti" target="_blank" className="hover:text-blue-400 transition-colors">LinkedIn</Link>
          <span>|</span>
          <Link href="https://github.com/aayushbharti" target="_blank" className="hover:text-blue-400 transition-colors">GitHub</Link>
          <span>|</span>
          <Link href="https://x.com/iaayushbharti" target="_blank" className="hover:text-blue-400 transition-colors">Twitter</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer