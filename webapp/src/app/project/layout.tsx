"use client"

import { useSearchParams } from "next/navigation"

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const searchParams = useSearchParams()
  const isNewProject = searchParams.get("newProject") === "true"
  const projectId = searchParams.get("id")

  return (
    <div className="container py-10">
      {children}
    </div>
  )
}
