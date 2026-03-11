"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const regions = [
  { name: "North America", threat: "medium", incidents: 23, status: "Elevated" },
  { name: "Europe", threat: "low", incidents: 12, status: "Normal" },
  { name: "Middle East", threat: "high", incidents: 67, status: "Critical" },
  { name: "Asia Pacific", threat: "medium", incidents: 34, status: "Elevated" },
  { name: "South America", threat: "low", incidents: 8, status: "Normal" },
  { name: "Africa", threat: "high", incidents: 45, status: "Critical" },
]

const threatColors = {
  high: "bg-red-500",
  medium: "bg-amber-500",
  low: "bg-green-500",
}

const statusColors = {
  Critical: "bg-red-500/10 text-red-500 border-red-500/20",
  Elevated: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  Normal: "bg-green-500/10 text-green-500 border-green-500/20",
}

export function ThreatHeatmap() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-card-foreground">Global Threat Heatmap</CardTitle>
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-red-500" />
              <span className="text-muted-foreground">High</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-amber-500" />
              <span className="text-muted-foreground">Medium</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span className="text-muted-foreground">Low</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Simplified World Map Visualization */}
        <div className="relative mb-4 h-48 rounded-lg bg-muted/30 border border-border overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <svg viewBox="0 0 800 400" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
              {/* Simplified continent shapes */}
              <ellipse cx="200" cy="150" rx="80" ry="50" className="fill-primary/30" />
              <ellipse cx="350" cy="130" rx="100" ry="60" className="fill-primary/30" />
              <ellipse cx="580" cy="140" rx="120" ry="70" className="fill-primary/30" />
              <ellipse cx="350" cy="280" rx="60" ry="40" className="fill-primary/30" />
              <ellipse cx="620" cy="300" rx="50" ry="35" className="fill-primary/30" />
            </svg>
          </div>
          {/* Threat Points */}
          <div className="absolute top-[25%] left-[22%] h-4 w-4 animate-pulse">
            <div className="absolute inset-0 rounded-full bg-amber-500/30" />
            <div className="absolute inset-1 rounded-full bg-amber-500" />
          </div>
          <div className="absolute top-[30%] left-[42%] h-4 w-4 animate-pulse">
            <div className="absolute inset-0 rounded-full bg-green-500/30" />
            <div className="absolute inset-1 rounded-full bg-green-500" />
          </div>
          <div className="absolute top-[35%] left-[55%] h-5 w-5 animate-pulse">
            <div className="absolute inset-0 rounded-full bg-red-500/30" />
            <div className="absolute inset-1 rounded-full bg-red-500" />
          </div>
          <div className="absolute top-[32%] left-[72%] h-4 w-4 animate-pulse">
            <div className="absolute inset-0 rounded-full bg-amber-500/30" />
            <div className="absolute inset-1 rounded-full bg-amber-500" />
          </div>
          <div className="absolute top-[65%] left-[32%] h-3 w-3 animate-pulse">
            <div className="absolute inset-0 rounded-full bg-green-500/30" />
            <div className="absolute inset-1 rounded-full bg-green-500" />
          </div>
          <div className="absolute top-[55%] left-[48%] h-5 w-5 animate-pulse">
            <div className="absolute inset-0 rounded-full bg-red-500/30" />
            <div className="absolute inset-1 rounded-full bg-red-500" />
          </div>
        </div>

        {/* Region List */}
        <div className="space-y-2">
          {regions.map((region) => (
            <div
              key={region.name}
              className="flex items-center justify-between rounded-md bg-muted/30 px-3 py-2 text-sm"
            >
              <div className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${threatColors[region.threat]}`} />
                <span className="text-card-foreground">{region.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">{region.incidents} incidents</span>
                <Badge variant="outline" className={statusColors[region.status]}>
                  {region.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
