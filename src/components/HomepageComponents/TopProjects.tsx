"use client"
import { useState, useEffect, useRef } from "react"
import axios from "axios"

interface Project {
  _id?: string
  title: string
  heading?: string
  description: string
  features?: string[]
  liveLink?: string
  githubLink?: string
  skills: string[]
  image: string[]
}

const TopProjects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const projectsContainerRef = useRef<HTMLDivElement>(null)
  const projectRefs = useRef<(HTMLDivElement | null)[]>([])

  const gradientColors = [
    "from-purple-600 via-purple-700 to-purple-800",
    "from-pink-600 via-red-700 to-red-800",
    "from-blue-600 via-indigo-700 to-purple-800",
    "from-green-600 via-teal-700 to-blue-800",
    "from-orange-600 via-red-700 to-pink-800",
    "from-yellow-600 via-orange-700 to-red-800",
  ]

  // Custom cursor effect
  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`
      cursor.style.top = `${e.clientY}px`
    }

    const handleMouseEnter = () => {
      if (cursor) {
        cursor.style.transform = "translate(-50%, -50%) scale(1)"
        cursor.style.opacity = "1"
      }
    }

    const handleMouseLeave = () => {
      if (cursor) {
        cursor.style.transform = "translate(-50%, -50%) scale(0.8)"
        cursor.style.opacity = "0"
      }
    }

    document.addEventListener("mousemove", moveCursor)

    const projectCards = document.querySelectorAll(".project-card")
    projectCards.forEach((card) => {
      card.addEventListener("mouseenter", handleMouseEnter)
      card.addEventListener("mouseleave", handleMouseLeave)
    })

    return () => {
      document.removeEventListener("mousemove", moveCursor)
      projectCards.forEach((card) => {
        card.removeEventListener("mouseenter", handleMouseEnter)
        card.removeEventListener("mouseleave", handleMouseLeave)
      })
    }
  }, [projects])

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        console.log("[TopProjects] Fetching projects from API...")
        const response = await axios.get("/api/homeContentApi")
        console.log("[TopProjects] API response:", response.data)

        if (response.data.success && response.data.data?.topProjects) {
          // Filter out empty projects
          const fetchedProjects = response.data.data.topProjects.filter(
            (project: Project) => project.title && project.title.trim() !== "",
          )
          console.log("[TopProjects] Filtered projects:", fetchedProjects)

          if (fetchedProjects.length > 0) {
            setProjects(fetchedProjects)
            setSelectedProject(fetchedProjects[0])
          } else {
            setError("No valid projects found")
          }
        } else {
          throw new Error("No projects found in response")
        }
      } catch (err) {
        console.error("[TopProjects] Error fetching projects:", err)
        setError("Failed to fetch projects")
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  // Set up intersection observer for scroll-based project selection
  useEffect(() => {
    if (projects.length === 0 || !projectsContainerRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const projectIndex = projectRefs.current.findIndex((ref) => ref === entry.target)
            if (projectIndex !== -1 && projects[projectIndex]) {
              setSelectedProject(projects[projectIndex])
            }
          }
        })
      },
      {
        root: projectsContainerRef.current,
        threshold: 0.6,
        rootMargin: "-20% 0px -20% 0px",
      },
    )

    projectRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => {
      projectRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
    }
  }, [projects])

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)

    const projectIndex = projects.findIndex((p) => p._id === project._id)
    if (projectIndex !== -1 && projectRefs.current[projectIndex]) {
      projectRefs.current[projectIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading projects...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">{error}</div>
      </div>
    )
  }

  if (projects.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">No projects available</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className="fixed w-20 h-20 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full pointer-events-none z-50 transition-all duration-300 ease-out opacity-0 flex items-center justify-center"
        style={{ transform: "translate(-50%, -50%) scale(0.8)" }}
      >
        <div className="text-white text-xs font-medium tracking-wider">VIEW</div>
        <div
          className="absolute inset-0 border border-white/30 rounded-full animate-spin"
          style={{ animationDuration: "8s" }}
        >
          <div className="absolute top-0 left-1/2 w-1 h-1 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
      </div>

      <div className="flex h-screen">
        {/* Left Side - Scrollable Projects */}
        <div ref={projectsContainerRef} className="w-1/2 h-full overflow-y-auto p-8 space-y-8">
          {projects.map((project, index) => (
            <div
              key={project._id || index}
              ref={(el) => (projectRefs.current[index] = el)}
              className={`project-card cursor-none transition-all duration-500 ${
                selectedProject?._id === project._id ? "scale-100" : "scale-95 opacity-60 hover:opacity-80"
              }`}
              onClick={() => handleProjectClick(project)}
            >
              {/* Project Card */}
              <div
                className={`bg-gradient-to-br ${gradientColors[index % gradientColors.length]} rounded-3xl p-8 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300`}
              >
                {/* Arrow Icon */}
                <div className="absolute top-6 right-6">
                  <svg
                    className="w-6 h-6 text-white/70 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </div>

                {/* Project Description */}
                <div className="mb-8 pr-12">
                  <h3 className="text-xl leading-relaxed text-white/90 font-light">
                    {project.heading || project.description || project.title}
                  </h3>
                </div>

                {/* Browser/Screen Mockup with Glow */}
                <div className="relative">
                  {/* Glowing effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 rounded-2xl blur-xl opacity-30 scale-110"></div>

                  {/* Screen Container */}
                  <div className="relative bg-gray-900/80 backdrop-blur-sm rounded-2xl p-4 shadow-2xl border border-gray-700/30">
                    <div className="bg-black rounded-xl relative overflow-hidden">
                      {/* Browser Bar */}
                      <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
                        <div className="flex space-x-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                        <div className="flex-1 mx-4">
                          <div className="bg-gray-700 rounded-full px-3 py-1 text-xs text-gray-300 text-center max-w-xs">
                            {project.title.toLowerCase().replace(/\s+/g, "")}.vercel.app
                          </div>
                        </div>
                        <div className="w-16"></div>
                      </div>

                      {/* Screen Content */}
                      <div className="w-full h-64 bg-gray-800 relative overflow-hidden">
                        <img
                          src={
                            project.image?.[0] ||
                            "/placeholder.svg?height=256&width=400&text=" + encodeURIComponent(project.title)
                          }
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                        {/* Screen glow overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-transparent to-blue-900/20"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side - Project Details */}
        <div className="w-1/2 h-full flex items-center justify-center p-12">
          <div className="max-w-lg w-full">
            {selectedProject && (
              <div className="space-y-8">
                {/* Project Header - IMPROVED ALIGNMENT */}
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-10 bg-purple-500 rounded-full flex-shrink-0 mt-1"></div>
                    <div className="flex-1">
                      <h1 className="text-4xl font-bold text-white leading-tight">{selectedProject.title}</h1>
                    </div>
                  </div>

                  {/* Description with consistent left alignment */}
                  <div className="pl-6">
                    <p className="text-gray-300 text-lg leading-relaxed border-l-2 border-gray-600/30 pl-6">
                      {selectedProject.description}
                    </p>
                  </div>
                </div>

                {/* Links - PROPERLY ALIGNED */}
                {(selectedProject.liveLink || selectedProject.githubLink) && (
                  <div className="pl-6">
                    <div className="flex gap-4">
                      {selectedProject.liveLink && (
                        <a
                          href={selectedProject.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-purple-500/25 hover:scale-105"
                        >
                          Live Demo
                        </a>
                      )}
                      {selectedProject.githubLink && (
                        <a
                          href={selectedProject.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-gray-500/25 hover:scale-105"
                        >
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {/* Tech Stack - CONSISTENT ALIGNMENT */}
                <div className="pl-6 space-y-4">
                  <h3 className="text-xl font-semibold text-gray-300">Tech Stack</h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.skills?.map((skill, index) => (
                      <span
                        key={index}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-800/60 text-gray-200 text-sm rounded-full border border-gray-700/30 hover:border-purple-500/50 transition-all duration-300 hover:scale-105"
                      >
                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features Section - NEW */}
                {selectedProject.features && selectedProject.features.length > 0 && (
                  <div className="pl-6 space-y-4">
                    <h3 className="text-xl font-semibold text-gray-300">Key Features</h3>
                    <div className="space-y-2">
                      {selectedProject.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-300 text-sm leading-relaxed">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Project URL - ALIGNED WITH CONTENT */}
                {selectedProject.liveLink && (
                  <div className="pl-6 pt-4 border-t border-gray-700/30 ml-6">
                    <div className="flex items-center gap-3 text-gray-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                        />
                      </svg>
                      <span className="text-sm font-mono">{selectedProject.liveLink.replace(/^https?:\/\//, "")}</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        ::-webkit-scrollbar {
          width: 0px;
          background: transparent;
        }
      `}</style>
    </div>
  )
}

export default TopProjects
