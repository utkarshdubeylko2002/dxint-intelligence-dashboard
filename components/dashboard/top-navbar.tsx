"use client"

import { useState, useEffect } from "react"
import { Bell, Search, Settings, User, Activity, Shield, Zap, Radio } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface TopNavbarProps {
  title?: string
}

export function TopNavbar({ title = "Dashboard" }: TopNavbarProps) {
  const [currentTime, setCurrentTime] = useState<string | null>(null)
  const [threatLevel, setThreatLevel] = useState("ELEVATED")

  useEffect(() => {
    setCurrentTime(new Date().toLocaleTimeString('en-US', { hour12: false }))
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { hour12: false }))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold text-foreground">{title}</h1>
          <Badge variant="outline" className="text-[10px] font-mono border-primary/30 text-primary">
            CLASSIFIED
          </Badge>
        </div>
        
        {/* Status Indicators */}
        <div className="hidden lg:flex items-center gap-4 pl-4 border-l border-border">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Radio className="h-3.5 w-3.5 text-green-500" />
              <div className="absolute inset-0 animate-ping">
                <Radio className="h-3.5 w-3.5 text-green-500 opacity-50" />
              </div>
            </div>
            <span className="text-[11px] text-muted-foreground">Live Feed</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-3.5 w-3.5 text-amber-500" />
            <span className="text-[11px] text-amber-500 font-medium">{threatLevel}</span>
          </div>
          {currentTime && (
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-muted-foreground">UTC {currentTime}</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 rounded-lg border border-border bg-muted/30 px-3 py-1.5">
          <Search className="h-3.5 w-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search entities, locations, events..."
            className="w-72 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <kbd className="hidden lg:inline-flex items-center rounded border border-border bg-background/50 px-1.5 text-[9px] text-muted-foreground font-mono">
            ⌘K
          </kbd>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-1">
          {/* Activity */}
          <Button variant="ghost" size="icon" className="h-8 w-8 relative">
            <Activity className="h-4 w-4" />
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 relative">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[9px] font-bold text-destructive-foreground">
                  7
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="flex items-center justify-between">
                <span>Recent Alerts</span>
                <Badge variant="destructive" className="text-[9px]">7 NEW</Badge>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-red-500" />
                  <span className="text-sm font-medium">High-priority target detected</span>
                </div>
                <span className="text-xs text-muted-foreground pl-4">Eastern Europe - 2 min ago</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-amber-500" />
                  <span className="text-sm font-medium">Sentiment anomaly detected</span>
                </div>
                <span className="text-xs text-muted-foreground pl-4">Social Media Cluster - 8 min ago</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-amber-500" />
                  <span className="text-sm font-medium">New entity relationship identified</span>
                </div>
                <span className="text-xs text-muted-foreground pl-4">Network Analysis - 15 min ago</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center text-primary">
                View all alerts
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Settings */}
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Settings className="h-4 w-4" />
          </Button>
        </div>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2 pl-2 pr-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 text-primary border border-primary/30">
                <User className="h-3.5 w-3.5" />
              </div>
              <div className="hidden xl:flex flex-col items-start">
                <span className="text-xs font-medium">Agent Shadow</span>
                <span className="text-[10px] text-muted-foreground">Level 5 Clearance</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span>Agent Shadow</span>
                <span className="text-xs font-normal text-muted-foreground">shadow@dxint.gov</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Security Settings</DropdownMenuItem>
            <DropdownMenuItem>Access Logs</DropdownMenuItem>
            <DropdownMenuItem>API Keys</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
