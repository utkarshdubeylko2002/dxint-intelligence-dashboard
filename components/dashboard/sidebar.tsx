"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Globe,
  Users,
  BarChart3,
  FileText,
  Bell,
  Shield,
  Network,
  Map,
  Brain,
  Activity,
  ChevronDown,
} from "lucide-react"

const navSections = [
  {
    title: "COMMAND CENTER",
    items: [
      { name: "Dashboard", href: "/", icon: LayoutDashboard },
      { name: "Alerts", href: "/alerts", icon: Bell },
    ],
  },
  {
    title: "INTELLIGENCE",
    items: [
      { name: "Threat Map", href: "/threat-map", icon: Globe },
      { name: "Persons of Interest", href: "/persons-of-interest", icon: Users },
      { name: "Network Analysis", href: "/network-analysis", icon: Network },
      { name: "Geospatial Intel", href: "/geospatial", icon: Map },
    ],
  },
  {
    title: "ANALYTICS",
    items: [
      { name: "Sentiment Analysis", href: "/sentiment-analysis", icon: BarChart3 },
      { name: "Predictive Analysis", href: "/predictive-analysis", icon: Brain },
    ],
  },
  {
    title: "REPORTS",
    items: [
      { name: "Intelligence Reports", href: "/intelligence-reports", icon: FileText },
    ],
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [lastSync, setLastSync] = useState<string | null>(null)
  const [systemStats, setSystemStats] = useState({ cpu: 0, memory: 0, alerts: 0 })

  useEffect(() => {
    setLastSync(new Date().toLocaleTimeString())
    setSystemStats({ cpu: 23, memory: 67, alerts: 12 })
    
    const interval = setInterval(() => {
      setLastSync(new Date().toLocaleTimeString())
      setSystemStats(prev => ({
        cpu: Math.max(15, Math.min(45, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(55, Math.min(85, prev.memory + (Math.random() - 0.5) * 5)),
        alerts: prev.alerts,
      }))
    }, 5000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar border-r border-sidebar-border">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-5">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 border border-primary/30">
            <Shield className="h-5 w-5 text-primary" />
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-sidebar-foreground">DXINT</span>
            <span className="text-[9px] uppercase tracking-[0.2em] text-primary/70">Intelligence Platform</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {navSections.map((section) => (
            <div key={section.title}>
              <div className="flex items-center gap-2 px-3 mb-2">
                <span className="text-[10px] font-semibold tracking-wider text-muted-foreground/60">
                  {section.title}
                </span>
                <div className="flex-1 h-px bg-sidebar-border/50" />
              </div>
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all",
                        isActive
                          ? "bg-primary/10 text-primary border border-primary/20"
                          : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground border border-transparent"
                      )}
                    >
                      <item.icon className={cn(
                        "h-4 w-4 transition-colors",
                        isActive ? "text-primary" : "text-sidebar-foreground/50 group-hover:text-sidebar-foreground/70"
                      )} />
                      {item.name}
                      {isActive && (
                        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                      )}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* System Status Footer */}
        <div className="border-t border-sidebar-border p-4 space-y-3">
          {/* Mini Stats */}
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center">
              <div className="text-[10px] text-muted-foreground/60 uppercase">CPU</div>
              <div className="text-xs font-mono text-primary">{systemStats.cpu.toFixed(0)}%</div>
            </div>
            <div className="text-center border-x border-sidebar-border">
              <div className="text-[10px] text-muted-foreground/60 uppercase">MEM</div>
              <div className="text-xs font-mono text-primary">{systemStats.memory.toFixed(0)}%</div>
            </div>
            <div className="text-center">
              <div className="text-[10px] text-muted-foreground/60 uppercase">ALERTS</div>
              <div className="text-xs font-mono text-amber-500">{systemStats.alerts}</div>
            </div>
          </div>
          
          {/* Status Indicator */}
          <div className="flex items-center justify-between pt-2 border-t border-sidebar-border/50">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <div className="absolute inset-0 h-2 w-2 rounded-full bg-green-500 animate-ping opacity-75" />
              </div>
              <span className="text-[10px] font-medium text-green-500/80 uppercase tracking-wider">Operational</span>
            </div>
            {lastSync && (
              <span className="text-[9px] font-mono text-muted-foreground/50">
                {lastSync}
              </span>
            )}
          </div>
        </div>
      </div>
    </aside>
  )
}
