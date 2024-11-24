"use client"

import { Separator } from "@/components/ui/separator"
import { SidebarNav } from "./components/sidebar-nav"
import { ProfileForm } from "./components/profile-form"
import { AccountForm } from "./components/account-form"
import { AppearanceForm } from "./components/appearance-form"
import { NotificationsForm } from "./components/notifications-form"
import { useSearchParams } from "next/navigation"

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/settings?tab=profile",
  },
  {
    title: "Account",
    href: "/settings?tab=account",
  },
  {
    title: "Appearance",
    href: "/settings?tab=appearance",
  },
  {
    title: "Notifications",
    href: "/settings?tab=notifications",
  },
  {
    title: "Display",
    href: "/settings?tab=display",
  },
]

export default function SettingsPage() {
  const searchParams = useSearchParams()
  const tab = searchParams.get("tab") || "profile"

  return (
    <div className="space-y-6 p-10 pb-16">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and set preferences.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex-1 lg:max-w-2xl">
          {tab === "profile" && <ProfileForm />}
          {tab === "account" && <AccountForm />}
          {tab === "appearance" && <AppearanceForm />}
          {tab === "notifications" && <NotificationsForm />}
        </div>
      </div>
    </div>
  )
}
