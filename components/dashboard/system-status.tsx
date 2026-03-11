"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Server, 
  Database, 
  Cpu, 
  HardDrive, 
  Wifi, 
  Shield,
  CheckCircle,
  AlertCircle
} from "lucide-react"

const systems = [
  {
    name: "SIGINT Processor",
    status: "operational",
    load: 67,
    icon: Server,
  },
  {
    name: "OSINT Crawler",
    status: "operational",
    load: 45,
    icon: Wifi,
  },
  {
    name: "Analytics Engine",
    status: "operational",
    load: 82,
    icon: Cpu,
  },
  {
    name: "Threat Database",
    status: "operational",
    load: 34,
    icon: Database,
  },
  {
    name: "Neural Network",
    status: "degraded",
    load: 91,
    icon: Shield,
  },
  {
    name: "Archive Storage",
    status: "operational",
    load: 56,
    icon: HardDrive,
  },
]

const statusConfig = {
  operational: { color: "text-green-500", bg: "bg-green-500", icon: CheckCircle },
  degraded: { color: "text-amber-500", bg: "bg-amber-500", icon: AlertCircle },
  offline: { color: "text-red-500", bg: "bg-red-500", icon: AlertCircle },
}

export function SystemStatus() {
  const operationalCount = systems.filter(s => s.status === "operational").length

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-card-foreground">System Status</CardTitle>
          <Badge variant="outline" className="text-[10px] bg-green-500/10 text-green-500 border-green-500/20">
            {operationalCount}/{systems.length} ONLINE
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {systems.map((system) => {
            const config = statusConfig[system.status as keyof typeof statusConfig]
            const StatusIcon = config.icon
            return (
              <div
                key={system.name}
                className="rounded-lg bg-muted/30 border border-border/50 p-3 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <system.icon className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-xs font-medium text-card-foreground">{system.name}</span>
                  </div>
                  <StatusIcon className={`h-3.5 w-3.5 ${config.color}`} />
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={system.load} className="h-1.5 flex-1" />
                  <span className="text-[10px] font-mono text-muted-foreground">{system.load}%</span>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
