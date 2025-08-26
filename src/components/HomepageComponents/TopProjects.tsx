"use client"
import { useState, useEffect } from "react"
import axios from "axios"
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
  topProjects: Project[]
}

const TopProjects = () => {
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
        console.error("Error fetching projects content:", error)
      }
    }

    fetchContent()
  }, [])

  if (!content?.topProjects || content.topProjects.length === 0) {
    return null
  }

  return (
    <section className="w-full bg-black text-white px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Top Projects</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {content.topProjects.map((project, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 relative overflow-hidden group hover:scale-105 transition-transform duration-300"
            >
              {/* Project Content */}
              <div className="relative z-10 flex flex-col h-full">
                {/* Header Section */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-3">
                    {project.heading || project.title}
                  </h3>
                  <p className="text-white/90 text-sm mb-4">
                    {project.description}
                  </p>
                </div>

                {/* Features Section */}
                {project.features && project.features.length > 0 && (
                  <div className="mb-6 flex-grow">
                    <ul className="space-y-2">
                      {project.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-2 text-sm">
                          <span className="text-green-400 mt-1">•</span>
                          <span className="text-white/90">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Skills Tags */}
                {project.skills && project.skills.length > 0 && (
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {project.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 mt-auto">
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-white text-purple-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </a>
                  )}
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
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

              {/* Project Image */}
              {project.image && project.image.length > 0 && (
                <div className="absolute bottom-6 right-6 w-32 h-20 rounded-lg overflow-hidden opacity-80 group-hover:opacity-100 transition-opacity">
                  <img
                    src={project.image[0]}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Background Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TopProjects