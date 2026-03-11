"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Map, MapPin, Layers, Clock, Filter, Play, Pause, 
  AlertTriangle, Activity, Eye, Radio, Target
} from "lucide-react"
import { Area, AreaChart, ResponsiveContainer, XAxis, Tooltip, Bar, BarChart, Cell } from "recharts"

const regions = [
  { id: 1, name: "Eastern Europe", risk: "high", events: 47, lat: 50, lng: 30, intensity: 85 },
  { id: 2, name: "Middle East", risk: "critical", events: 72, lat: 33, lng: 44, intensity: 95 },
  { id: 3, name: "East Asia", risk: "medium", events: 28, lat: 35, lng: 120, intensity: 55 },
  { id: 4, name: "North Africa", risk: "high", events: 38, lat: 28, lng: 10, intensity: 75 },
  { id: 5, name: "Southeast Asia", risk: "medium", events: 22, lat: 12, lng: 105, intensity: 45 },
  { id: 6, name: "Central Asia", risk: "low", events: 12, lat: 42, lng: 65, intensity: 25 },
  { id: 7, name: "South America", risk: "low", events: 15, lat: -15, lng: -55, intensity: 30 },
  { id: 8, name: "Sub-Saharan Africa", risk: "high", events: 45, lat: 5, lng: 20, intensity: 70 },
]

const eventTimeline = [
  { time: "00:00", count: 8 },
  { time: "04:00", count: 5 },
  { time: "08:00", count: 18 },
  { time: "12:00", count: 32 },
  { time: "16:00", count: 28 },
  { time: "20:00", count: 41 },
  { time: "Now", count: 35 },
]

const recentEvents = [
  { id: 1, type: "Movement", location: "Tehran, Iran", time: "5 min ago", priority: "high" },
  { id: 2, type: "Communication", location: "Moscow, Russia", time: "12 min ago", priority: "medium" },
  { id: 3, type: "Gathering", location: "Kabul, Afghanistan", time: "25 min ago", priority: "high" },
  { id: 4, type: "Transaction", location: "Dubai, UAE", time: "1 hour ago", priority: "medium" },
  { id: 5, type: "Surveillance", location: "Beijing, China", time: "2 hours ago", priority: "low" },
]

const riskColors = {
  critical: { bg: "bg-red-600", text: "text-red-500", gradient: "#dc2626" },
  high: { bg: "bg-orange-500", text: "text-orange-500", gradient: "#f97316" },
  medium: { bg: "bg-amber-500", text: "text-amber-500", gradient: "#f59e0b" },
  low: { bg: "bg-green-500", text: "text-green-500", gradient: "#22c55e" },
}

const priorityColors = {
  high: "bg-red-500/10 text-red-500 border-red-500/30",
  medium: "bg-amber-500/10 text-amber-500 border-amber-500/30",
  low: "bg-green-500/10 text-green-500 border-green-500/30",
}

export default function GeospatialPage() {
  const [selectedRegion, setSelectedRegion] = useState<typeof regions[0] | null>(null)
  const [timeRange, setTimeRange] = useState("24h")
  const [layerType, setLayerType] = useState("heatmap")
  const [isPlaying, setIsPlaying] = useState(false)
  const [timelinePosition, setTimelinePosition] = useState([100])

  return (
    <DashboardLayout title="Geospatial Intelligence">
      <div className="space-y-4">
        {/* Control Bar */}
        <Card className="bg-card border-border">
          <CardContent className="flex flex-wrap items-center gap-4 p-3">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Layer:</span>
            </div>
            <Select value={layerType} onValueChange={setLayerType}>
              <SelectTrigger className="w-[130px] h-8 text-xs">
                <SelectValue placeholder="Layer Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="heatmap">Risk Heatmap</SelectItem>
                <SelectItem value="events">Event Markers</SelectItem>
                <SelectItem value="clusters">Activity Clusters</SelectItem>
              </SelectContent>
            </Select>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[120px] h-8 text-xs">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1h">Last Hour</SelectItem>
                <SelectItem value="24h">Last 24h</SelectItem>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex items-center gap-2 ml-auto">
              <Badge variant="outline" className="text-[10px] bg-green-500/10 text-green-500 border-green-500/30">
                <Radio className="mr-1 h-2.5 w-2.5 animate-pulse" />
                LIVE TRACKING
              </Badge>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          {/* Main Map */}
          <Card className="lg:col-span-8 bg-card border-border">
            <CardHeader className="pb-2 pt-3 px-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CardTitle className="text-sm font-medium">Global Activity Heatmap</CardTitle>
                  <Badge variant="outline" className="text-[10px] font-mono">
                    {regions.reduce((sum, r) => sum + r.events, 0)} events tracked
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-[10px]">
                  <div className="flex items-center gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-600" />
                    <span className="text-muted-foreground">Critical</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-orange-500" />
                    <span className="text-muted-foreground">High</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                    <span className="text-muted-foreground">Medium</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
                    <span className="text-muted-foreground">Low</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="relative h-[400px] rounded-lg bg-background/50 border border-border overflow-hidden">
                {/* World Map Background */}
                <svg viewBox="0 0 1000 500" className="absolute inset-0 h-full w-full opacity-20">
                  {/* North America */}
                  <path d="M120,100 Q180,80 240,100 T320,120 T380,100 Q420,80 400,140 Q380,200 320,210 Q260,220 200,200 Q140,180 120,140 Z" className="fill-primary/30 stroke-primary/40" strokeWidth="0.5" />
                  {/* South America */}
                  <path d="M220,260 Q260,240 300,260 T340,320 Q360,380 320,420 Q280,460 240,440 Q200,420 200,360 Q200,300 220,260 Z" className="fill-primary/30 stroke-primary/40" strokeWidth="0.5" />
                  {/* Europe */}
                  <path d="M440,80 Q500,60 560,80 T640,100 Q680,120 660,160 Q640,200 580,200 Q520,200 480,180 Q440,160 440,120 Z" className="fill-primary/30 stroke-primary/40" strokeWidth="0.5" />
                  {/* Africa */}
                  <path d="M460,200 Q520,180 560,220 T580,300 Q600,380 540,420 Q480,460 440,420 Q400,380 420,300 Q440,240 460,200 Z" className="fill-primary/30 stroke-primary/40" strokeWidth="0.5" />
                  {/* Asia */}
                  <path d="M640,80 Q720,60 800,80 T900,100 T940,140 Q960,180 920,220 Q880,260 800,260 Q720,260 680,220 Q640,180 640,140 Z" className="fill-primary/30 stroke-primary/40" strokeWidth="0.5" />
                  {/* Australia */}
                  <path d="M820,320 Q880,300 920,340 T920,400 Q920,440 860,440 Q800,440 780,400 Q760,360 820,320 Z" className="fill-primary/30 stroke-primary/40" strokeWidth="0.5" />
                </svg>

                {/* Heatmap Regions */}
                {regions.map((region) => {
                  const x = ((region.lng + 180) / 360) * 100
                  const y = ((90 - region.lat) / 180) * 100
                  const color = riskColors[region.risk as keyof typeof riskColors]
                  const size = 30 + (region.intensity / 100) * 40
                  
                  return (
                    <button
                      key={region.id}
                      onClick={() => setSelectedRegion(region)}
                      className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all ${
                        selectedRegion?.id === region.id ? 'z-20 scale-110' : 'z-10 hover:scale-105'
                      }`}
                      style={{ left: `${x}%`, top: `${y}%` }}
                    >
                      {/* Heatmap glow */}
                      <div 
                        className="rounded-full opacity-40 blur-md"
                        style={{ 
                          width: `${size * 1.5}px`, 
                          height: `${size * 1.5}px`,
                          backgroundColor: color.gradient,
                        }}
                      />
                      {/* Center marker */}
                      <div 
                        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full ${color.bg} flex items-center justify-center shadow-lg ${
                          region.risk === 'critical' ? 'animate-pulse' : ''
                        }`}
                        style={{ width: '24px', height: '24px' }}
                      >
                        <span className="text-[8px] font-bold text-white">{region.events}</span>
                      </div>
                    </button>
                  )
                })}

                {/* Selected Region Info */}
                {selectedRegion && (
                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-lg bg-card/95 border border-border backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`h-10 w-10 rounded-lg ${riskColors[selectedRegion.risk as keyof typeof riskColors].bg}/20 flex items-center justify-center`}>
                          <Map className={`h-5 w-5 ${riskColors[selectedRegion.risk as keyof typeof riskColors].text}`} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-card-foreground">{selectedRegion.name}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <Badge className={riskColors[selectedRegion.risk as keyof typeof riskColors].bg}>
                              {selectedRegion.risk.toUpperCase()}
                            </Badge>
                            <span className="text-[10px] text-muted-foreground">{selectedRegion.events} events</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-muted-foreground">Activity Intensity</p>
                        <p className={`text-xl font-bold ${riskColors[selectedRegion.risk as keyof typeof riskColors].text}`}>
                          {selectedRegion.intensity}%
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Timeline Control */}
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-3">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-7 w-7"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                  </Button>
                  <div className="flex-1">
                    <Slider
                      value={timelinePosition}
                      onValueChange={setTimelinePosition}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground w-16 text-right">
                    {timelinePosition[0] === 100 ? 'Live' : `${Math.round(24 - (timelinePosition[0] / 100 * 24))}h ago`}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Side Panels */}
          <div className="lg:col-span-4 space-y-4">
            {/* Regional Risk Levels */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-2 pt-3 px-4">
                <CardTitle className="text-sm font-medium">Regional Risk Levels</CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4 space-y-2">
                {regions.sort((a, b) => b.intensity - a.intensity).slice(0, 5).map((region) => {
                  const color = riskColors[region.risk as keyof typeof riskColors]
                  return (
                    <button
                      key={region.id}
                      onClick={() => setSelectedRegion(region)}
                      className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${
                        selectedRegion?.id === region.id 
                          ? 'bg-primary/10 border border-primary/30' 
                          : 'bg-muted/30 hover:bg-muted/50 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`h-2.5 w-2.5 rounded-full ${color.bg}`} />
                        <span className="text-xs text-card-foreground">{region.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                          <div 
                            className={`h-full ${color.bg}`}
                            style={{ width: `${region.intensity}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-mono text-muted-foreground w-8">{region.intensity}%</span>
                      </div>
                    </button>
                  )
                })}
              </CardContent>
            </Card>

            {/* Event Timeline Chart */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-2 pt-3 px-4">
                <CardTitle className="text-sm font-medium">24h Event Timeline</CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <div className="h-28">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={eventTimeline}>
                      <XAxis dataKey="time" tick={{ fontSize: 9 }} stroke="hsl(var(--muted-foreground))" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                          fontSize: "11px",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="count"
                        stroke="hsl(var(--primary))"
                        fill="hsl(var(--primary))"
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Recent Events */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-2 pt-3 px-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">Recent Events</CardTitle>
                  <Badge variant="outline" className="text-[10px]">
                    {recentEvents.length} new
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="px-4 pb-4 space-y-2 max-h-[200px] overflow-y-auto">
                {recentEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center gap-3 p-2 rounded-lg bg-muted/30"
                  >
                    <div className={`h-2 w-2 rounded-full ${
                      event.priority === 'high' ? 'bg-red-500' : event.priority === 'medium' ? 'bg-amber-500' : 'bg-green-500'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-card-foreground">{event.type}</p>
                      <p className="text-[10px] text-muted-foreground truncate">{event.location}</p>
                    </div>
                    <span className="text-[9px] text-muted-foreground">{event.time}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[
            { label: "Critical Regions", value: regions.filter(r => r.risk === 'critical').length, color: "text-red-600" },
            { label: "High Risk Regions", value: regions.filter(r => r.risk === 'high').length, color: "text-orange-500" },
            { label: "Total Events (24h)", value: regions.reduce((sum, r) => sum + r.events, 0), color: "text-primary" },
            { label: "Avg. Intensity", value: `${Math.round(regions.reduce((sum, r) => sum + r.intensity, 0) / regions.length)}%`, color: "text-amber-500" },
          ].map((stat) => (
            <Card key={stat.label} className="bg-card border-border">
              <CardContent className="p-3">
                <p className="text-[10px] text-muted-foreground uppercase">{stat.label}</p>
                <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
