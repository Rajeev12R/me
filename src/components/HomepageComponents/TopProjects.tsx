import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import HomeContent from "@/models/homeContents"

// Create New Document
export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const body = await request.json()
    
    // Ensure all projects have all required fields with proper defaults
    if (body.topProjects && Array.isArray(body.topProjects)) {
      body.topProjects = body.topProjects.map((proj: any) => ({
        title: proj.title || "",
        heading: proj.heading || "",
        liveLink: proj.liveLink || "",
        githubLink: proj.githubLink || "",
        description: proj.description || "",
        features: Array.isArray(proj.features) ? proj.features : [],
        skills: Array.isArray(proj.skills) ? proj.skills : [],
        image: Array.isArray(proj.image) ? proj.image : [],
      }))
    }
    
    const newContent = new HomeContent(body)
    const savedContent = await newContent.save()
    return NextResponse.json({ message: "Home content saved successfully", data: savedContent }, { status: 201 })
  } catch (error) {
    console.error("Error saving home content:", error)
    return NextResponse.json({ message: "Error saving home content", error }, { status: 500 })
  }
}

// Update (or create if not exists)
export async function PUT(request: NextRequest) {
  try {
    await connectDB()
    const body = await request.json()
    
    // Extract ALL fields from body
    const { 
      name, 
      role, 
      description, 
      imageUrl, 
      resume, 
      skills, 
      email, 
      heading, 
      subHeading, 
      topProjects, 
      topBlogs,
      links
    } = body

    console.log("Received topProjects:", topProjects)

    let content = await HomeContent.findOne().sort({ createdAt: -1 })
    
    if (content) {
      // Update all fields including new ones
      content.name = name || content.name
      content.role = role || content.role
      content.skills = skills || content.skills
      content.email = email || content.email
      content.description = description || content.description
      content.imageUrl = imageUrl || content.imageUrl
      content.resume = resume || content.resume
      content.heading = heading || content.heading
      content.subHeading = subHeading || content.subHeading
      content.links = links || content.links
      
      // Handle topProjects with all fields including new ones
      if (topProjects && Array.isArray(topProjects)) {
        content.topProjects = topProjects.map((proj: any) => ({
          title: proj.title || "",
          heading: proj.heading || "",
          liveLink: proj.liveLink || "",
          githubLink: proj.githubLink || "",
          description: proj.description || "",
          features: Array.isArray(proj.features) ? proj.features : [],
          skills: Array.isArray(proj.skills) ? proj.skills : [],
          image: Array.isArray(proj.image) ? proj.image : [],
        }))
      }
      
      // Handle topBlogs
      if (topBlogs && Array.isArray(topBlogs)) {
        content.topBlogs = topBlogs.map((blog: any) => ({
          title: blog.title || "",
          link: blog.link || "",
          summary: blog.summary || "",
          image: Array.isArray(blog.image) ? blog.image : [],
          date: blog.date || new Date(),
          tags: Array.isArray(blog.tags) ? blog.tags : [],
        }))
      }
      
      console.log("Updated content.topProjects:", content.topProjects)
      const savedContent = await content.save()
      return NextResponse.json({ message: "Home content updated successfully", data: savedContent }, { status: 200 })
      
    } else {
      // Create new document
      const newData = {
        name: name || "",
        role: role || "",
        description: description || "",
        imageUrl: imageUrl || "",
        resume: resume || "",
        skills: Array.isArray(skills) ? skills : [],
        email: email || "",
        heading: heading || "",
        subHeading: subHeading || "",
        links: links || {},
        topProjects: Array.isArray(topProjects) ? topProjects.map((proj: any) => ({
          title: proj.title || "",
          heading: proj.heading || "",
          liveLink: proj.liveLink || "",
          githubLink: proj.githubLink || "",
          description: proj.description || "",
          features: Array.isArray(proj.features) ? proj.features : [],
          skills: Array.isArray(proj.skills) ? proj.skills : [],
          image: Array.isArray(proj.image) ? proj.image : [],
        })) : [],
        topBlogs: Array.isArray(topBlogs) ? topBlogs.map((blog: any) => ({
          title: blog.title || "",
          link: blog.link || "",
          summary: blog.summary || "",
          image: Array.isArray(blog.image) ? blog.image : [],
          date: blog.date || new Date(),
          tags: Array.isArray(blog.tags) ? blog.tags : [],
        })) : [],
      }
      
      content = await HomeContent.create(newData)
      return NextResponse.json({ message: "Home content created successfully", data: content }, { status: 201 })
    }
    
  } catch (error) {
    console.error("Error updating home content:", error)
    return NextResponse.json({ message: "Error updating home content", error }, { status: 500 })
  }
}

// Get latest content
export async function GET() {
  try {
    await connectDB()
    const content = await HomeContent.findOne().sort({ createdAt: -1 })
    console.log("Fetched content:", content?.topProjects)
    return NextResponse.json({ success: true, data: content })
  } catch (error) {
    console.error("Error fetching home content:", error)
    return NextResponse.json({ success: false, message: "Error fetching home content", error }, { status: 500 })
  }
}