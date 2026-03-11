"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Radio, 
  MessageSquare, 
  AlertTriangle, 
  Users, 
  Globe, 
  TrendingUp,
  Eye,
  Zap,
  Network
} from "lucide-react"

type EventType = "communication" | "sentiment" | "poi" | "regional" | "cyber" | "network"

interface IntelEvent {
  id: number
  type: EventType
  message: string
  location: string
  timestamp: string
  priority: "high" | "medium" | "low"
}

const initialEvents: IntelEvent[] = [
  {
    id: 1,
    type: "communication",
    message: "Encrypted channel activity spike detected",
    location: "Moscow, Russia",
    timestamp: "12s ago",
    priority: "high",
  },
  {
    id: 2,
    type: "sentiment",
    message: "Negative sentiment surge on monitored hashtags",
    location: "Tehran, Iran",
    timestamp: "45s ago",
    priority: "medium",
  },
  {
    id: 3,
    type: "poi",
    message: "New person of interest flagged by AI analysis",
    location: "Shenzhen, China",
    timestamp: "1m ago",
    priority: "high",
  },
  {
    id: 4,
    type: "regional",
    message: "Unusual military movements detected",
    location: "Donbas Region",
    timestamp: "2m ago",
    priority: "high",
  },
  {
    id: 5,
    type: "cyber",
    message: "Coordinated bot activity identified",
    location: "Multiple Sources",
    timestamp: "3m ago",
    priority: "medium",
  },
  {
    id: 6,
    type: "network",
    message: "New entity relationship cluster identified",
    location: "Beirut, Lebanon",
    timestamp: "5m ago",
    priority: "low",
  },
]

const eventConfig: Record<EventType, { icon: typeof Radio; color: string; bgColor: string }> = {
  communication: { icon: Radio, color: "text-blue-500", bgColor: "bg-blue-500/10" },
  sentiment: { icon: TrendingUp, color: "text-amber-500", bgColor: "bg-amber-500/10" },
  poi: { icon: Users, color: "text-red-500", bgColor: "bg-red-500/10" },
  regional: { icon: Globe, color: "text-emerald-500", bgColor: "bg-emerald-500/10" },
  cyber: { icon: Zap, color: "text-purple-500", bgColor: "bg-purple-500/10" },
  network: { icon: Network, color: "text-cyan-500", bgColor: "bg-cyan-500/10" },
}

const priorityConfig = {
  high: "border-l-red-500 bg-red-500/5",
  medium: "border-l-amber-500 bg-amber-500/5",
  low: "border-l-blue-500 bg-blue-500/5",
}

export function IntelligenceFeed() {
  const [events, setEvents] = useState(initialEvents)
  const [isLive, setIsLive] = useState(true)

  return (
    <Card className="bg-card border-border h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Intelligence Feed</CardTitle>
            {isLive && (
              <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20 text-[10px]">
                <span className="mr-1 h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                LIVE
              </Badge>
            )}
          </div>
          <span className="text-[10px] text-muted-foreground font-mono">
            {events.length} events
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 max-h-[400px] overflow-y-auto">
        {events.map((event) => {
          const config = eventConfig[event.type]
          const Icon = config.icon
          return (
            <div
              key={event.id}
              className={`group flex items-start gap-3 rounded-lg border-l-2 p-3 transition-all hover:bg-muted/30 cursor-pointer ${priorityConfig[event.priority]}`}
            >
              <div className={`mt-0.5 rounded-md p-1.5 ${config.bgColor}`}>
                <Icon className={`h-3.5 w-3.5 ${config.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-card-foreground leading-snug">{event.message}</p>
                <div className="mt-1.5 flex items-center gap-2 text-[10px] text-muted-foreground">
                  <span className="font-medium">{event.location}</span>
                  <span className="text-border">|</span>
                  <span>{event.timestamp}</span>
                </div>
              </div>
              <Eye className="h-3.5 w-3.5 text-muted-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
