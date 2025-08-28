"use client"
import { useEffect, useRef, useState } from "react"
import { ExternalLink, Github } from "lucide-react"

interface Project {
  title: string
  heading: string
  liveLink: string
  githubLink: string
  description: string
  features: string[]
  skills: string[]
  image: string[]
}

interface HomeContent {
  topProjects?: Project[]
}

const gradients = [
  "from-indigo-500 to-purple-600",
  "from-emerald-500 to-teal-600",
  "from-orange-500 to-yellow-500",
  "from-pink-500 to-rose-600",
  "from-blue-500 to-cyan-500",
  "from-purple-600 to-pink-600",
]

const TopProjects = ({ data }: { data: HomeContent | null }) => {
  const [content, setContent] = useState<HomeContent | null>(data)
  const [activeIndex, setActiveIndex] = useState(0)
  const [loading, setLoading] = useState(!data?.topProjects?.length)

  const listRef = useRef<HTMLDivElement | null>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  // Fetch content if not provided via props
  useEffect(() => {
    if (data?.topProjects?.length) {
      setLoading(false)
      return
    }

    const fetchContent = async () => {
      try {
        const response = await fetch("/api/homeContentApi")
        const apiData = await response.json()
        if (apiData?.success && apiData?.data?.topProjects?.length) {
          setContent(apiData.data)
        }
      } catch (error) {
        console.error("Error fetching projects content:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchContent()
  }, [data])

  // Helper: choose the card whose center is closest to the list's center
  const computeActive = () => {
    const container = listRef.current
    if (!container || !itemRefs.current.length) return

    const cRect = container.getBoundingClientRect()
    const centerY = cRect.top + cRect.height / 2

    let bestIdx = 0
    let bestDist = Number.POSITIVE_INFINITY

    itemRefs.current.forEach((el, idx) => {
      if (!el) return
      const r = el.getBoundingClientRect()
      const itemCenter = r.top + r.height / 2
      const dist = Math.abs(centerY - itemCenter)
      if (dist < bestDist) {
        bestDist = dist
        bestIdx = idx
      }
    })

    setActiveIndex(bestIdx)
  }

  // Listen to scroll/resize to update the active index
  useEffect(() => {
    const container = listRef.current
    if (!container) return
    computeActive()

    const onScroll = () => computeActive()
    const onResize = () => computeActive()

    container.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onResize)
    return () => {
      container.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
    }
  }, [content?.topProjects?.length])

  // ✅ Loader UI
  if (loading) {
    return (
      <section className="w-full bg-black text-white px-6 py-16">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Top Projects</h2>
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
          </div>
          <p className="mt-4 text-sm text-white/60">Loading projects...</p>
        </div>
      </section>
    )
  }

  if (!content?.topProjects?.length) return null

  const projects = content.topProjects
  const current = projects[activeIndex] ?? projects[0]

  return (
    <section className="w-full bg-black text-white px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-4 mb-12">
          <h2 className="text-3xl font-bold text-center">Top Projects</h2>
          <p className="text-md font-semibold text-center">
            A showcase of impactful projects demonstrating problem-solving, clean architecture, and performance-driven development.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10">
          {/* Left Scrollable List */}
          <div
            ref={listRef}
            className="h-[75vh] lg:h-[80vh] overflow-y-scroll pr-1 scroll-smooth snap-y snap-mandatory no-scrollbar"
          >
            <div className="space-y-8">
              {projects.map((project, idx) => (
                <div
                  key={(project.title || project.heading || "project") + idx}
                  ref={(el) => {
                    if (el) itemRefs.current[idx] = el
                  }}
                  className={[
                    "snap-center rounded-3xl overflow-hidden p-4",
                    `bg-gradient-to-br ${gradients[idx % gradients.length]}`,
                    "shadow-xl ring-1 ring-white/10 relative",
                    "transition-transform duration-300",
                    idx === activeIndex ? "scale-[1.02]" : "scale-100 opacity-90",
                  ].join(" ")}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onFocus={() => setActiveIndex(idx)}
                  tabIndex={0}
                >
                  <div className="relative rounded-2xl overflow-hidden">
                    <img
                      src={project.image?.[0] || "/placeholder.png"}
                      alt={project.title || project.heading || `Project ${idx + 1}`}
                      className="w-full h-[420px] md:h-[520px] object-contain bg-black"
                      loading={idx > 2 ? "lazy" : "eager"}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="min-w-0">
                      <h3 className="truncate text-xl font-semibold">
                        {project.heading || project.title}
                      </h3>
                      <p className="text-white/80 text-sm truncate">
                        {project.description}
                      </p>
                    </div>
                    <span
                      className={[
                        "ml-4 inline-flex h-9 min-w-9 items-center justify-center rounded-full px-3 text-xs font-medium",
                        idx === activeIndex ? "bg-white text-gray-900" : "bg-white/20 text-white",
                      ].join(" ")}
                    >
                      {idx + 1}/{projects.length}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Details Card */}
          <div className="lg:sticky lg:top-24 self-start">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-xl">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-3">
                  {current.heading || current.title}
                </h3>
                <p className="text-white/90 text-sm">{current.description}</p>
              </div>

              {!!current.features?.length && (
                <div className="mb-6">
                  <ul className="space-y-2">
                    {current.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-green-400 mt-1">•</span>
                        <span className="text-white/90">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {!!current.skills?.length && (
                <div className="mb-6 flex flex-wrap gap-2">
                  {current.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex gap-3">
                {current.liveLink && (
                  <a
                    href={current.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                )}
                {current.githubLink && (
                  <a
                    href={current.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg font-medium hover:bg-white/30 transition-colors"
                  >
                    <Github size={16} />
                    Code
                  </a>
                )}
              </div>
            </div>

            <p className="text-xs text-white/60 mt-3 text-center">
              Scroll the gallery on the left — details update automatically.
            </p>
            <div className="mt-8 flex justify-center items-center">
              <button className="px-6 py-3 rounded-xl hover:cursor-pointer font-medium text-gray-800 bg-gray-100 shadow-[4px_4px_10px_rgba(0,0,0,0.2),-4px_-4px_10px_rgba(255,255,255,0.8)] transition-all duration-300 hover:shadow-[inset_4px_4px_10px_rgba(0,0,0,0.2),inset_-4px_-4px_10px_rgba(255,255,255,0.8)]">
                View All Projects
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TopProjects;