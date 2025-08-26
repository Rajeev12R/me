"use client"
import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { Plus, Trash2, Save, Edit3, Eye, EyeOff, Upload, User, Mail, Briefcase, Link, Code } from "lucide-react"

interface Project {
  title: string
  heading: string
  liveLink: string
  githubLink: string
  description: string
  features: string[]
  skills: string[]
  image: string[]
  skillsInput?: string
  featuresInput?: string
  imageInput?: string
}

interface Blog {
  title: string
  link: string
  summary?: string
  image: string[]
  date: string
  tags: string[]
  tagsInput?: string
  imageInput?: string
}

interface HomeContent {
  _id?: string
  name: string
  role: string
  email: string
  links: { [key: string]: string }
  skills: string[]
  heading: string
  subHeading: string
  description: string
  imageUrl: string
  topProjects: Project[]
  topBlogs: Blog[]
  linksInput?: string
  skillsInput?: string
}

const AdminDashboard: React.FC = () => {
  const [formData, setFormData] = useState<HomeContent>({
    name: "",
    role: "",
    email: "",
    links: {},
    skills: [],
    heading: "",
    subHeading: "",
    description: "",
    imageUrl: "",
    topProjects: [],
    topBlogs: [],
    linksInput: "",
    skillsInput: "",
  })

  const [loading, setLoading] = useState(false)
  const [existingContent, setExistingContent] = useState<HomeContent | null>(null)
  const [activeTab, setActiveTab] = useState<"personal" | "basic" | "projects" | "blogs">("personal")
  const [showPreview, setShowPreview] = useState(false)

  useEffect(() => {
    fetchExistingContent()
  }, [])

  const fetchExistingContent = async () => {
  try {
    const response = await fetch("/api/homeContentApi")
    const result = await response.json()
    console.log("Admin: Fetched data:", result)
    
    if (result.success && result.data) {
      const processedData = {
        ...result.data,
        name: result.data.name || "",
        role: result.data.role || "",
        email: result.data.email || "",
        links: result.data.links || {},
        skills: result.data.skills || [],
        linksInput: result.data.links
          ? Object.entries(result.data.links)
              .map(([key, value]) => `${key}:${value}`)
              .join(", ")
          : "",
        skillsInput: result.data.skills ? result.data.skills.join(", ") : "",
        topProjects: (result.data.topProjects || []).map((project: any) => ({
          ...project,
          title: project.title || "",
          heading: project.heading || "",
          liveLink: project.liveLink || "",
          githubLink: project.githubLink || "",
          description: project.description || "",
          features: Array.isArray(project.features) ? project.features : [],
          skills: Array.isArray(project.skills) ? project.skills : [],
          image: Array.isArray(project.image) ? project.image : [],
          skillsInput: project.skills ? project.skills.join(", ") : "",
          featuresInput: Array.isArray(project.features) ? project.features.join(", ") : "",
          imageInput: project.image ? project.image.join(", ") : "",
        })),
        topBlogs: (result.data.topBlogs || []).map((blog: any) => ({
          ...blog,
          title: blog.title || "",
          link: blog.link || "",
          summary: blog.summary || "",
          image: Array.isArray(blog.image) ? blog.image : [],
          date: blog.date || new Date().toISOString().split("T")[0],
          tags: Array.isArray(blog.tags) ? blog.tags : [],
          tagsInput: blog.tags ? blog.tags.join(", ") : "",
          imageInput: blog.image ? blog.image.join(", ") : "",
        })),
      }
      console.log("Admin: Processed data:", processedData)
      setFormData(processedData)
      setExistingContent(result.data)
    }
  } catch (error) {
    console.error("Error fetching existing content:", error)
  }
}

  const updateBasicField = useCallback((field: string, value: string) => {
    setFormData((prev) => {
      const newData = { ...prev, [field]: value }

      if (field === "linksInput") {
        const linksObj: { [key: string]: string } = {}
        if (value.trim()) {
          value.split(",").forEach((item) => {
            const [key, ...valueParts] = item.split(":")
            if (key && valueParts.length > 0) {
              linksObj[key.trim()] = valueParts.join(":").trim()
            }
          })
        }
        newData.links = linksObj
      } else if (field === "skillsInput") {
        newData.skills = value
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item)
      }

      return newData
    })
  }, [])

  const handleProjectChange = useCallback((index: number, field: string, value: string) => {
    setFormData((prev) => {
      const newProjects = [...prev.topProjects]
      const project = { ...newProjects[index] }

      if (field === "skillsInput") {
        project.skillsInput = value
        project.skills = value
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item)
      } else if (field === "featuresInput") {
        project.featuresInput = value
        project.features = value
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item)
      } else if (field === "imageInput") {
        project.imageInput = value
        project.image = value
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item)
      } else {
        ;(project as any)[field] = value
      }

      newProjects[index] = project
      return { ...prev, topProjects: newProjects }
    })
  }, [])

  const handleBlogChange = useCallback((index: number, field: string, value: string) => {
    setFormData((prev) => {
      const newBlogs = [...prev.topBlogs]
      const blog = { ...newBlogs[index] }

      if (field === "tagsInput") {
        blog.tagsInput = value
        blog.tags = value
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item)
      } else if (field === "imageInput") {
        blog.imageInput = value
        blog.image = value
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item)
      } else {
        ;(blog as any)[field] = value
      }

      newBlogs[index] = blog
      return { ...prev, topBlogs: newBlogs }
    })
  }, [])

const addProject = () => {
  setFormData((prev) => ({
    ...prev,
    topProjects: [
      ...prev.topProjects,
      {
        title: "",
        heading: "",
        liveLink: "",
        githubLink: "",
        description: "",
        features: [],
        skills: [],
        image: [],
        skillsInput: "",
        featuresInput: "",
        imageInput: "",
      },
    ],
  }))
}

  const addBlog = () => {
    setFormData((prev) => ({
      ...prev,
      topBlogs: [
        ...prev.topBlogs,
        {
          title: "",
          link: "",
          summary: "",
          image: [],
          date: new Date().toISOString().split("T")[0],
          tags: [],
          tagsInput: "",
          imageInput: "",
        },
      ],
    }))
  }

  const removeProject = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      topProjects: prev.topProjects.filter((_, i) => i !== index),
    }))
  }

  const removeBlog = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      topBlogs: prev.topBlogs.filter((_, i) => i !== index),
    }))
  }

const prepareDataForSubmission = () => {
  const cleanData = {
    ...formData,
    topProjects: formData.topProjects.map((project) => {
      const { skillsInput, featuresInput, imageInput, ...cleanProject } = project
      return {
        ...cleanProject,
        title: cleanProject.title || "",
        heading: cleanProject.heading || "",
        liveLink: cleanProject.liveLink || "",
        githubLink: cleanProject.githubLink || "",
        description: cleanProject.description || "",
        features: Array.isArray(cleanProject.features) ? cleanProject.features : [],
        skills: Array.isArray(cleanProject.skills) ? cleanProject.skills : [],
        image: Array.isArray(cleanProject.image) ? cleanProject.image : [],
      }
    }),
    topBlogs: formData.topBlogs.map((blog) => {
      const { tagsInput, imageInput, ...cleanBlog } = blog
      return {
        ...cleanBlog,
        title: cleanBlog.title || "",
        link: cleanBlog.link || "",
        summary: cleanBlog.summary || "",
        image: Array.isArray(cleanBlog.image) ? cleanBlog.image : [],
        date: cleanBlog.date || new Date().toISOString().split("T")[0],
        tags: Array.isArray(cleanBlog.tags) ? cleanBlog.tags : [],
      }
    }),
  }

  // Remove helper input fields but keep links
  const { linksInput, skillsInput, ...finalData } = cleanData
  return finalData
}

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const url = "/api/homeContentApi"
      const method = existingContent ? "PUT" : "POST"
      const cleanedData = prepareDataForSubmission()
      console.log("Admin: Submitting data:", cleanedData)
      const payload = existingContent ? { ...cleanedData, id: existingContent._id } : cleanedData

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const result = await response.json()
      console.log("Admin: Submit response:", result)

      if (response.ok) {
        alert(existingContent ? "Content updated successfully!" : "Content saved successfully!")
        if (!existingContent) {
          setExistingContent(result.data)
        }
        // Refresh the data after successful save
        await fetchExistingContent()
      } else {
        alert("Error: " + result.message)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("An error occurred while saving content.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
              <p className="text-gray-600">Manage your portfolio content with ease</p>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                {showPreview ? <EyeOff size={18} /> : <Eye size={18} />}
                {showPreview ? "Hide Preview" : "Show Preview"}
              </button>
            </div>
          </div>

          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {existingContent ? "Editing Existing Content" : "Creating New Content"}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white text-black rounded-2xl shadow-xl overflow-hidden">
              {/* Tab Navigation */}
              <div className="bg-gray-50 p-6 border-b">
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveTab("personal")}
                    className={`px-6 py-3 font-medium rounded-lg transition-all duration-200 ${activeTab === "personal" ? "bg-blue-600 text-white shadow-lg" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                  >
                    Personal Info
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("basic")}
                    className={`px-6 py-3 font-medium rounded-lg transition-all duration-200 ${activeTab === "basic" ? "bg-blue-600 text-white shadow-lg" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                  >
                    Homepage Content
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("projects")}
                    className={`px-6 py-3 font-medium rounded-lg transition-all duration-200 ${activeTab === "projects" ? "bg-blue-600 text-white shadow-lg" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                  >
                    Top Projects
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("blogs")}
                    className={`px-6 py-3 font-medium rounded-lg transition-all duration-200 ${activeTab === "blogs" ? "bg-blue-600 text-white shadow-lg" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                  >
                    Top Blogs
                  </button>
                </div>
              </div>

              <div className="p-6">
                {/* Personal Information Tab */}
                {activeTab === "personal" && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <User size={24} className="text-blue-600" />
                      Personal Information
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                          <User size={16} />
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => updateBasicField("name", e.target.value)}
                          placeholder="John Doe"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                          <Briefcase size={16} />
                          Role/Title <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.role}
                          onChange={(e) => updateBasicField("role", e.target.value)}
                          placeholder="Full Stack Developer"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Mail size={16} />
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateBasicField("email", e.target.value)}
                        placeholder="john.doe@example.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Code size={16} />
                        Skills <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.skillsInput}
                        onChange={(e) => updateBasicField("skillsInput", e.target.value)}
                        placeholder="JavaScript, React, Node.js, MongoDB, Python"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                      <p className="text-xs text-gray-500">Separate skills with commas</p>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Link size={16} />
                        Social/Professional Links
                      </label>
                      <input
                        type="text"
                        value={formData.linksInput}
                        onChange={(e) => updateBasicField("linksInput", e.target.value)}
                        placeholder="github:https://github.com/username, linkedin:https://linkedin.com/in/username, twitter:https://twitter.com/username"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                      <p className="text-xs text-gray-500">
                        Format: platform:url, platform:url (e.g., github:https://github.com/username)
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        Profile Image URL <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.imageUrl}
                        onChange={(e) => updateBasicField("imageUrl", e.target.value)}
                        placeholder="https://example.com/your-photo.jpg"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                  </div>
                )}

                {/* Basic Information Tab */}
                {activeTab === "basic" && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Homepage Content</h2>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        Main Heading <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.heading}
                        onChange={(e) => updateBasicField("heading", e.target.value)}
                        placeholder="Welcome to my portfolio..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        Sub Heading <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.subHeading}
                        onChange={(e) => updateBasicField("subHeading", e.target.value)}
                        placeholder="I'm a full-stack developer..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        Description <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => updateBasicField("description", e.target.value)}
                        placeholder="Tell visitors about yourself and your expertise..."
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-vertical"
                      />
                    </div>
                  </div>
                )}

                {/* Projects Tab */}
                {activeTab === "projects" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold text-gray-800">Top Projects</h2>
                      <button
                        type="button"
                        onClick={addProject}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Plus size={18} />
                        Add Project
                      </button>
                    </div>

                    {formData.topProjects.map((project, index) => (
                      <div key={index} className="p-6 border border-gray-200 rounded-xl bg-gray-50">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-gray-700">Project {index + 1}</h3>
                          <button
                            type="button"
                            onClick={() => removeProject(index)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Project Title</label>
                            <input
                              type="text"
                              value={project.title}
                              onChange={(e) => handleProjectChange(index, "title", e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="My Awesome Project"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Project Heading</label>
                            <input
                              type="text"
                              value={project.heading || ""}
                              onChange={(e) => handleProjectChange(index, "heading", e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="A brief catchy heading for your project"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Live Link</label>
                            <input
                              type="url"
                              value={project.liveLink}
                              onChange={(e) => handleProjectChange(index, "liveLink", e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="https://myproject.com"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">GitHub Link</label>
                            <input
                              type="url"
                              value={project.githubLink}
                              onChange={(e) => handleProjectChange(index, "githubLink", e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="https://github.com/username/repo"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Skills (comma-separated)
                            </label>
                            <input
                              type="text"
                              value={project.skillsInput || ""}
                              onChange={(e) => handleProjectChange(index, "skillsInput", e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="React, Node.js, MongoDB"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Features (comma-separated)
                            </label>
                            <input
                              type="text"
                              value={project.featuresInput || ""}
                              onChange={(e) => handleProjectChange(index, "featuresInput", e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="User Authentication, Real-time Chat, Payment Integration"
                            />
                          </div>
                        </div>

                        <div className="mt-4 grid grid-cols-1 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <textarea
                              value={project.description}
                              onChange={(e) => handleProjectChange(index, "description", e.target.value)}
                              rows={3}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Brief description of your project..."
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Images (comma-separated URLs)
                            </label>
                            <input
                              type="text"
                              value={project.imageInput || ""}
                              onChange={(e) => handleProjectChange(index, "imageInput", e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                            />
                          </div>
                        </div>
                      </div>
                    ))}

                    {formData.topProjects.length === 0 && (
                      <div className="text-center py-12 text-gray-500">
                        <Upload size={48} className="mx-auto mb-4 opacity-50" />
                        <p>No projects added yet. Click "Add Project" to get started.</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Blogs Tab */}
                {activeTab === "blogs" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold text-gray-800">Top Blogs</h2>
                      <button
                        type="button"
                        onClick={addBlog}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Plus size={18} />
                        Add Blog
                      </button>
                    </div>

                    {formData.topBlogs.map((blog, index) => (
                      <div key={index} className="p-6 border border-gray-200 rounded-xl bg-gray-50">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-gray-700">Blog {index + 1}</h3>
                          <button
                            type="button"
                            onClick={() => removeBlog(index)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Blog Title</label>
                            <input
                              type="text"
                              value={blog.title}
                              onChange={(e) => handleBlogChange(index, "title", e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="My Blog Post Title"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Blog Link</label>
                            <input
                              type="url"
                              value={blog.link}
                              onChange={(e) => handleBlogChange(index, "link", e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="https://myblog.com/post"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Publication Date</label>
                            <input
                              type="date"
                              value={blog.date}
                              onChange={(e) => handleBlogChange(index, "date", e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Tags (comma-separated)
                            </label>
                            <input
                              type="text"
                              value={blog.tagsInput || ""}
                              onChange={(e) => handleBlogChange(index, "tagsInput", e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="JavaScript, Web Development, React"
                            />
                          </div>
                        </div>

                        <div className="mt-4 grid grid-cols-1 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Summary</label>
                            <textarea
                              value={blog.summary || ""}
                              onChange={(e) => handleBlogChange(index, "summary", e.target.value)}
                              rows={3}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Brief summary of your blog post..."
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Images (comma-separated URLs)
                            </label>
                            <input
                              type="text"
                              value={blog.imageInput || ""}
                              onChange={(e) => handleBlogChange(index, "imageInput", e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="https://example.com/blog-image.jpg"
                            />
                          </div>
                        </div>
                      </div>
                    ))}

                    {formData.topBlogs.length === 0 && (
                      <div className="text-center py-12 text-gray-500">
                        <Edit3 size={48} className="mx-auto mb-4 opacity-50" />
                        <p>No blogs added yet. Click "Add Blog" to get started.</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Submit Button */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex items-center justify-center gap-2 w-full py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        {existingContent ? "Updating..." : "Saving..."}
                      </>
                    ) : (
                      <>
                        <Save size={20} />
                        {existingContent ? "Update Content" : "Save Content"}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          {showPreview && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Live Preview</h3>

                <div className="space-y-4 text-sm">
                  {/* Personal Info Preview */}
                  {formData.name && (
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-lg text-blue-800 mb-1">{formData.name}</h4>
                      {formData.role && <p className="text-blue-600 text-sm font-medium">{formData.role}</p>}
                      {formData.email && <p className="text-gray-600 text-xs">{formData.email}</p>}
                    </div>
                  )}

                  {/* Skills Preview */}
                  {formData.skills.length > 0 && (
                    <div>
                      <h5 className="font-semibold text-gray-700 mb-2 flex items-center gap-1">
                        <Code size={14} />
                        Skills ({formData.skills.length})
                      </h5>
                      <div className="flex flex-wrap gap-1">
                        {formData.skills.slice(0, 6).map((skill, index) => (
                          <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                            {skill}
                          </span>
                        ))}
                        {formData.skills.length > 6 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                            +{formData.skills.length - 6} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Links Preview */}
                  {Object.keys(formData.links).length > 0 && (
                    <div>
                      <h5 className="font-semibold text-gray-700 mb-2 flex items-center gap-1">
                        <Link size={14} />
                        Links ({Object.keys(formData.links).length})
                      </h5>
                      <div className="space-y-1">
                        {Object.entries(formData.links)
                          .slice(0, 3)
                          .map(([platform, url]) => (
                            <div key={platform} className="text-xs text-blue-600 truncate">
                              {platform}: {url.substring(0, 30)}...
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Homepage Content Preview */}
                  {formData.heading && (
                    <div>
                      <h4 className="font-semibold text-lg text-gray-800 mb-1">{formData.heading}</h4>
                    </div>
                  )}

                  {formData.subHeading && <p className="text-gray-600 font-medium text-sm">{formData.subHeading}</p>}

                  {formData.description && (
                    <p className="text-gray-600 text-xs leading-relaxed">{formData.description.substring(0, 150)}...</p>
                  )}

                  {formData.imageUrl && (
                    <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden">
                      <img
                        src={formData.imageUrl || "/placeholder.svg"}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="space-y-3">
                    {formData.topProjects.length > 0 && (
                      <div>
                        <h5 className="font-semibold text-gray-700 mb-2">Projects ({formData.topProjects.length})</h5>
                        {formData.topProjects.slice(0, 2).map((project, index) => (
                          <div key={index} className="p-2 bg-blue-50 rounded text-xs mb-1">
                            <div className="font-medium">{project.title || `Project ${index + 1}`}</div>
                            <div className="text-gray-500">{project.skills.slice(0, 3).join(", ")}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {formData.topBlogs.length > 0 && (
                      <div>
                        <h5 className="font-semibold text-gray-700 mb-2">Blogs ({formData.topBlogs.length})</h5>
                        {formData.topBlogs.slice(0, 2).map((blog, index) => (
                          <div key={index} className="p-2 bg-green-50 rounded text-xs mb-1">
                            <div className="font-medium">{blog.title || `Blog ${index + 1}`}</div>
                            <div className="text-gray-500">{blog.tags.slice(0, 3).join(", ")}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
