"use client"

import { NewProjectForm } from "@/components/new-project-form"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

// Dummy project data
const projectDetails = {
  "project-1": {
    id: "project-1",
    name: "Protein Docking Analysis",
    type: "protein-ligand",
    status: "In Progress",
    created: "2024-01-15",
    description: "Analysis of protein-ligand interactions for drug discovery",
  },
  "project-2": {
    id: "project-2",
    name: "Molecular Dynamics Study",
    type: "protein-protein",
    status: "Completed",
    created: "2024-01-10",
    description: "Study of protein-protein interactions using molecular dynamics",
  },
  "project-3": {
    id: "project-3",
    name: "Ligand Optimization",
    type: "virtual-screening",
    status: "Pending",
    created: "2024-01-20",
    description: "Optimization of ligand structures for better binding affinity",
  },
}

export default function ProjectPage() {
  const searchParams = useSearchParams()
  const isNewProject = searchParams.get("newProject") === "true"
  const projectId = searchParams.get("id")

  if (isNewProject) {
    return <NewProjectForm />
  }

  if (projectId && projectDetails[projectId as keyof typeof projectDetails]) {
    const project = projectDetails[projectId as keyof typeof projectDetails]
    return (
      <div className="container py-10">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">{project.name}</CardTitle>
                <CardDescription>Project ID: {project.id}</CardDescription>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                project.status === "Completed" ? "bg-green-100 text-green-800" :
                project.status === "In Progress" ? "bg-blue-100 text-blue-800" :
                "bg-yellow-100 text-yellow-800"
              }`}>
                {project.status}
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground">{project.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Project Type</h3>
                <p className="text-muted-foreground capitalize">{project.type.replace("-", " ")}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Created On</h3>
                <p className="text-muted-foreground">{project.created}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Link 
          href="/project?newProject=true"
          className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md"
        >
          Create New Project
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Object.values(projectDetails).map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{project.name}</CardTitle>
                  <CardDescription>ID: {project.id}</CardDescription>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  project.status === "Completed" ? "bg-green-100 text-green-800" :
                  project.status === "In Progress" ? "bg-blue-100 text-blue-800" :
                  "bg-yellow-100 text-yellow-800"
                }`}>
                  {project.status}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
              <div className="mt-4">
                <Link 
                  href={`/project?id=${project.id}`}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  View Details →
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
