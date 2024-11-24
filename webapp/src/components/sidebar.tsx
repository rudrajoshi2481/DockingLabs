"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { UserButton } from "@clerk/nextjs"
import { mockRecentProjects } from "@/lib/utils/project"
import {
  LayoutDashboard,
  PlusCircle,
  FileText,
  Users,
  Settings,
  Beaker,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

const navigationItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
  },
  {
    title: "New Project",
    icon: PlusCircle,
    href: "/project?newProject=true",
  },
  {
    title: "Projects",
    icon: FileText,
    href: "/project",
  },
  {
    title: "Team",
    icon: Users,
    href: "/team",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/settings",
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col border-r bg-background">
      {/* Header with Logo and User */}
      <div className="flex h-14 items-center justify-between border-b px-4">
        <div className="flex items-center space-x-2">
          <Beaker className="h-6 w-6" />
          <span className="font-semibold">DockingLabs</span>
        </div>
        <UserButton afterSignOutUrl="/" />
      </div>
      
      <ScrollArea className="flex-1">
        {/* Main Navigation */}
        <nav className="space-y-1 p-4">
          {navigationItems.map((item) => {
            const isActive = item.href === pathname ||
              (item.href === "/project" && pathname.startsWith("/project"))

            return (
              <Button
                key={item.title}
                variant={isActive ? "secondary" : "ghost"}
                asChild
                className="w-full justify-start"
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-2"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              </Button>
            )
          })}
        </nav>

        {/* Recent Projects */}
        <div className="px-4 py-2">
          <div className="flex items-center gap-2 py-2">
            <Clock className="h-4 w-4" />
            <span className="text-sm font-medium">Recent Projects</span>
          </div>
          <Separator className="my-2" />
          <div className="space-y-1">
            {mockRecentProjects.map((project) => (
              <Button
                key={project.id}
                variant="ghost"
                asChild
                className="w-full justify-start"
              >
                <Link href={`/project/${project.id}`}>
                  <div className="flex flex-col items-start gap-0.5">
                    <span className="text-sm">{project.name}</span>
                    <span className="text-xs text-muted-foreground font-mono">
                      {project.id}
                    </span>
                  </div>
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="border-t p-4">
        <p className="text-xs text-muted-foreground">
          Version 1.0.0
        </p>
      </div>
    </div>
  )
}
