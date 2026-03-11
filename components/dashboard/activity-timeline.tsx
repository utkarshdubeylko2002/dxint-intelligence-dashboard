"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, User, MapPin, Shield, Zap } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "report",
    title: "Intelligence Report Generated",
    description: "Automated threat assessment for Eastern European region",
    time: "09:45 AM",
    icon: FileText,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    id: 2,
    type: "person",
    title: "New POI Added to Database",
    description: "Subject linked to financial irregularities in Sector 7",
    time: "09:32 AM",
    icon: User,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
  {
    id: 3,
    type: "location",
    title: "Geofence Alert Triggered",
    description: "Monitored asset entered restricted zone in Damascus",
    time: "09:15 AM",
    icon: MapPin,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
  },
  {
    id: 4,
    type: "security",
    title: "Encryption Protocol Updated",
    description: "System-wide security enhancement deployed",
    time: "08:52 AM",
    icon: Shield,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    id: 5,
    type: "alert",
    title: "Anomaly Detection Alert",
    description: "Unusual traffic patterns detected on monitored network",
    time: "08:30 AM",
    icon: Zap,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
]

export function ActivityTimeline() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-card-foreground">Recent Intelligence Events</CardTitle>
          <Badge variant="outline" className="text-xs">Today</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative space-y-4">
          {/* Timeline line */}
          <div className="absolute left-[15px] top-2 h-[calc(100%-24px)] w-px bg-border" />
          
          {activities.map((activity) => {
            const Icon = activity.icon
            return (
              <div key={activity.id} className="relative flex gap-4 pl-10">
                <div className={`absolute left-0 flex h-8 w-8 items-center justify-center rounded-full ${activity.bgColor}`}>
                  <Icon className={`h-4 w-4 ${activity.color}`} />
                </div>
                <div className="flex-1 space-y-1 pt-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-card-foreground">{activity.title}</p>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{activity.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
