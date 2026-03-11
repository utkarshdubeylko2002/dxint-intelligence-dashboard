"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, AlertCircle, Info, Clock } from "lucide-react"

const alerts = [
  {
    id: 1,
    title: "Unusual network activity detected",
    location: "Tehran, Iran",
    severity: "high",
    time: "2 min ago",
    type: "Network",
  },
  {
    id: 2,
    title: "New persona identified in monitored forum",
    location: "Moscow, Russia",
    severity: "medium",
    time: "15 min ago",
    type: "HUMINT",
  },
  {
    id: 3,
    title: "Encrypted communication spike",
    location: "Beijing, China",
    severity: "high",
    time: "23 min ago",
    type: "SIGINT",
  },
  {
    id: 4,
    title: "Routine surveillance update",
    location: "Berlin, Germany",
    severity: "low",
    time: "1 hour ago",
    type: "OSINT",
  },
  {
    id: 5,
    title: "Financial transaction anomaly",
    location: "Zurich, Switzerland",
    severity: "medium",
    time: "2 hours ago",
    type: "FININT",
  },
]

const severityConfig = {
  high: {
    icon: AlertTriangle,
    badge: "bg-red-500/10 text-red-500 border-red-500/20",
    iconColor: "text-red-500",
  },
  medium: {
    icon: AlertCircle,
    badge: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    iconColor: "text-amber-500",
  },
  low: {
    icon: Info,
    badge: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    iconColor: "text-blue-500",
  },
}

export function AlertsPanel() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-card-foreground">Real-time Alerts</CardTitle>
          <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">
            <span className="mr-1 h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
            Live
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {alerts.map((alert) => {
          const config = severityConfig[alert.severity as keyof typeof severityConfig]
          const Icon = config.icon
          return (
            <div
              key={alert.id}
              className="group flex items-start gap-3 rounded-lg bg-muted/30 p-3 transition-colors hover:bg-muted/50 cursor-pointer"
            >
              <div className={`mt-0.5 rounded-md bg-muted p-1.5 ${config.iconColor}`}>
                <Icon className="h-3.5 w-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium text-card-foreground truncate">{alert.title}</p>
                  <Badge variant="outline" className={`shrink-0 text-[10px] ${config.badge}`}>
                    {alert.severity.toUpperCase()}
                  </Badge>
                </div>
                <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{alert.location}</span>
                  <span className="text-border">|</span>
                  <span>{alert.type}</span>
                </div>
                <div className="mt-1.5 flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{alert.time}</span>
                </div>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
