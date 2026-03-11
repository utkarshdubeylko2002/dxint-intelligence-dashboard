"use client"

import { Sidebar } from "./sidebar"
import { TopNavbar } from "./top-navbar"

interface DashboardLayoutProps {
  children: React.ReactNode
  title?: string
}

export function DashboardLayout({ children, title }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="ml-64">
        <TopNavbar title={title} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
