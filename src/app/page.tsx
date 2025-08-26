import React from 'react'
import Hero from '@/components/HomepageComponents/Hero'
import SocialBar from '@/components/HomepageComponents/SocialBar'
import TopProjects from '@/components/HomepageComponents/TopProjects'
const page = () => {
  return (
    <main className='max-w-6xl mx-auto flex flex-col '>
      <Hero />
      <TopProjects/>

      <SocialBar />
    </main>
  )
}

export default page