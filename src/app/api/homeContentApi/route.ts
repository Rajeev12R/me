import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import HomeContent from "@/models/homeContents"

// Create New Document
export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const body = await request.json()
    
    // Ensure all projects have heading and features with proper defaults
    if (body.topProjects) {
      body.topProjects = body.topProjects.map((proj: any) => ({
        ...proj,
        heading: proj.heading || "",
        features: proj.features || [],
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
    
    // Extract ALL fields from body including links
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

    let content = await HomeContent.findOne().sort({ createdAt: -1 })
    
    if (content) {
      // Update all fields
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
      
      // Ensure each project has heading & features with proper defaults
      if (topProjects) {
        content.topProjects = topProjects.map((proj: any) => ({
          title: proj.title || "",
          heading: proj.heading || "", // Make sure this is included
          liveLink: proj.liveLink || "",
          githubLink: proj.githubLink || "",
          description: proj.description || "",
          features: proj.features || [], // Make sure this is included
          skills: proj.skills || [],
          image: proj.image || [],
        }))
      }
      
      if (topBlogs) {
        content.topBlogs = topBlogs.map((blog: any) => ({
          title: blog.title || "",
          link: blog.link || "",
          summary: blog.summary || "",
          image: blog.image || [],
          date: blog.date || new Date(),
          tags: blog.tags || [],
        }))
      }
      
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
        skills: skills || [],
        email: email || "",
        heading: heading || "",
        subHeading: subHeading || "",
        links: links || {},
        topProjects: (topProjects || []).map((proj: any) => ({
          title: proj.title || "",
          heading: proj.heading || "", // Include heading
          liveLink: proj.liveLink || "",
          githubLink: proj.githubLink || "",
          description: proj.description || "",
          features: proj.features || [], // Include features
          skills: proj.skills || [],
          image: proj.image || [],
        })),
        topBlogs: (topBlogs || []).map((blog: any) => ({
          title: blog.title || "",
          link: blog.link || "",
          summary: blog.summary || "",
          image: blog.image || [],
          date: blog.date || new Date(),
          tags: blog.tags || [],
        })),
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
    return NextResponse.json({ success: true, data: content })
  } catch (error) {
    console.error("Error fetching home content:", error)
    return NextResponse.json({ success: false, message: "Error fetching home content", error }, { status: 500 })
  }
}