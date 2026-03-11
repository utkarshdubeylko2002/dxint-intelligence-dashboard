"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Filter, MapPin, AlertTriangle, Clock, RefreshCw, Play, Pause, 
  Layers, Target, Crosshair, Radio, Zap, Shield, Globe
} from "lucide-react"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Bar, BarChart } from "recharts"

const threatZones = [
  { id: 1, name: "Middle East Sector A", lat: 33, lng: 44, threat: "critical", incidents: 47, category: "political", lastUpdate: "5 min ago", trend: "+15%" },
  { id: 2, name: "Eastern Europe Zone", lat: 50, lng: 30, threat: "high", incidents: 23, category: "cyber", lastUpdate: "12 min ago", trend: "+8%" },
  { id: 3, name: "North Africa Region", lat: 28, lng: 3, threat: "critical", incidents: 38, category: "extremist", lastUpdate: "3 min ago", trend: "+22%" },
  { id: 4, name: "Southeast Asia Hub", lat: 12, lng: 105, threat: "medium", incidents: 19, category: "economic", lastUpdate: "8 min ago", trend: "-5%" },
  { id: 5, name: "Central America", lat: 15, lng: -88, threat: "low", incidents: 7, category: "political", lastUpdate: "25 min ago", trend: "-12%" },
  { id: 6, name: "Northern Europe", lat: 60, lng: 18, threat: "low", incidents: 5, category: "cyber", lastUpdate: "1 hour ago", trend: "0%" },
  { id: 7, name: "South America East", lat: -15, lng: -47, threat: "medium", incidents: 15, category: "economic", lastUpdate: "18 min ago", trend: "+3%" },
  { id: 8, name: "West Africa", lat: 12, lng: -2, threat: "high", incidents: 32, category: "extremist", lastUpdate: "7 min ago", trend: "+18%" },
  { id: 9, name: "Central Asia", lat: 41, lng: 69, threat: "medium", incidents: 14, category: "political", lastUpdate: "22 min ago", trend: "+6%" },
  { id: 10, name: "Horn of Africa", lat: 8, lng: 45, threat: "critical", incidents: 51, category: "extremist", lastUpdate: "2 min ago", trend: "+28%" },
]

const threatColors = {
  critical: { bg: "bg-red-600", border: "border-red-600", text: "text-red-500", glow: "shadow-red-500/60", pulse: "animate-pulse" },
  high: { bg: "bg-orange-500", border: "border-orange-500", text: "text-orange-500", glow: "shadow-orange-500/50", pulse: "" },
  medium: { bg: "bg-amber-500", border: "border-amber-500", text: "text-amber-500", glow: "shadow-amber-500/50", pulse: "" },
  low: { bg: "bg-green-500", border: "border-green-500", text: "text-green-500", glow: "shadow-green-500/50", pulse: "" },
}

const categoryIcons = {
  political: Shield,
  cyber: Zap,
  extremist: Target,
  economic: Globe,
}

const timelineData = [
  { time: "00:00", incidents: 12 },
  { time: "04:00", incidents: 8 },
  { time: "08:00", incidents: 24 },
  { time: "12:00", incidents: 45 },
  { time: "16:00", incidents: 38 },
  { time: "20:00", incidents: 52 },
  { time: "Now", incidents: 47 },
]

const categoryBreakdown = [
  { category: "Political", count: 42, color: "#3b82f6" },
  { category: "Cyber", count: 35, color: "#8b5cf6" },
  { category: "Extremist", count: 28, color: "#ef4444" },
  { category: "Economic", count: 23, color: "#f59e0b" },
]

export default function ThreatMapPage() {
  const [selectedRegion, setSelectedRegion] = useState<string>("all")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>("24h")
  const [selectedZone, setSelectedZone] = useState<typeof threatZones[0] | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [timelinePosition, setTimelinePosition] = useState([100])
  const [mapLayer, setMapLayer] = useState<string>("threats")

  const filteredZones = threatZones.filter(z => {
    if (selectedRegion !== "all" && z.threat !== selectedRegion) return false
    if (selectedCategory !== "all" && z.category !== selectedCategory) return false
    return true
  })

  return (
    <DashboardLayout title="Threat Intelligence Map">
      <div className="space-y-4">
        {/* Control Bar */}
        <Card className="bg-card border-border">
          <CardContent className="flex flex-wrap items-center gap-4 p-3">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Filters</span>
            </div>
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="w-[150px] h-8 text-xs">
                <SelectValue placeholder="Threat Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[150px] h-8 text-xs">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="political">Political</SelectItem>
                <SelectItem value="cyber">Cyber</SelectItem>
                <SelectItem value="extremist">Extremist</SelectItem>
                <SelectItem value="economic">Economic</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
              <SelectTrigger className="w-[130px] h-8 text-xs">
                <SelectValue placeholder="Timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1h">Last Hour</SelectItem>
                <SelectItem value="24h">Last 24h</SelectItem>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex items-center gap-2 ml-auto">
              <Tabs value={mapLayer} onValueChange={setMapLayer} className="h-8">
                <TabsList className="h-8">
                  <TabsTrigger value="threats" className="text-xs h-7 px-3">Threats</TabsTrigger>
                  <TabsTrigger value="heatmap" className="text-xs h-7 px-3">Heatmap</TabsTrigger>
                  <TabsTrigger value="clusters" className="text-xs h-7 px-3">Clusters</TabsTrigger>
                </TabsList>
              </Tabs>
              <Button variant="outline" size="sm" className="h-8">
                <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
                <span className="text-xs">Refresh</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          {/* Map Visualization */}
          <Card className="lg:col-span-8 bg-card border-border">
            <CardHeader className="pb-2 pt-3 px-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CardTitle className="text-sm font-medium text-card-foreground">Global Threat Distribution</CardTitle>
                  <Badge variant="outline" className="text-[10px] font-mono bg-red-500/10 text-red-500 border-red-500/30">
                    <Radio className="mr-1 h-2.5 w-2.5 animate-pulse" />
                    LIVE
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-[10px]">
                  <div className="flex items-center gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-600 shadow-sm shadow-red-500/50" />
                    <span className="text-muted-foreground">Critical</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-orange-500 shadow-sm shadow-orange-500/50" />
                    <span className="text-muted-foreground">High</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-amber-500 shadow-sm shadow-amber-500/50" />
                    <span className="text-muted-foreground">Medium</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 shadow-sm shadow-green-500/50" />
                    <span className="text-muted-foreground">Low</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="relative h-[380px] rounded-lg bg-background/50 border border-border overflow-hidden">
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

                {/* Grid overlay */}
                <div className="absolute inset-0 opacity-5">
                  <div className="h-full w-full" style={{
                    backgroundImage: 'linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--primary)) 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                  }} />
                </div>

                {/* Threat Zone Markers */}
                {filteredZones.map((zone) => {
                  const colors = threatColors[zone.threat as keyof typeof threatColors]
                  const CategoryIcon = categoryIcons[zone.category as keyof typeof categoryIcons]
                  const x = ((zone.lng + 180) / 360) * 100
                  const y = ((90 - zone.lat) / 180) * 100
                  return (
                    <button
                      key={zone.id}
                      onClick={() => setSelectedZone(zone)}
                      className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 group ${
                        selectedZone?.id === zone.id ? 'scale-150 z-20' : 'hover:scale-125 z-10'
                      }`}
                      style={{ left: `${x}%`, top: `${y}%` }}
                    >
                      {/* Outer pulse ring */}
                      <div className={`absolute -inset-2 rounded-full ${colors.bg} opacity-20 ${zone.threat === 'critical' ? 'animate-ping' : ''}`} />
                      {/* Main marker */}
                      <div className={`relative h-5 w-5 rounded-full ${colors.bg} shadow-lg ${colors.glow} flex items-center justify-center`}>
                        <CategoryIcon className="h-2.5 w-2.5 text-white" />
                      </div>
                      {/* Incident count badge */}
                      <div className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-card border border-border flex items-center justify-center">
                        <span className="text-[8px] font-bold text-card-foreground">{zone.incidents}</span>
                      </div>
                    </button>
                  )
                })}

                {/* Selected Zone Info Popup */}
                {selectedZone && (
                  <div 
                    className="absolute z-30 w-72 rounded-lg border border-border bg-card/95 backdrop-blur-sm p-4 shadow-2xl"
                    style={{
                      left: `${Math.min(Math.max(((selectedZone.lng + 180) / 360) * 100, 20), 72)}%`,
                      top: `${Math.min(Math.max(((90 - selectedZone.lat) / 180) * 100, 10), 65)}%`,
                      transform: 'translate(-50%, 20px)'
                    }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className={`h-3 w-3 rounded-full ${threatColors[selectedZone.threat as keyof typeof threatColors].bg}`} />
                        <span className="font-semibold text-card-foreground text-sm">{selectedZone.name}</span>
                      </div>
                      <button 
                        onClick={() => setSelectedZone(null)}
                        className="text-muted-foreground hover:text-foreground text-lg leading-none"
                      >
                        ×
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="space-y-1">
                        <span className="text-muted-foreground">Threat Level</span>
                        <Badge className={`${threatColors[selectedZone.threat as keyof typeof threatColors].bg} text-white block w-fit`}>
                          {selectedZone.threat.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <span className="text-muted-foreground">Category</span>
                        <div className="flex items-center gap-1.5">
                          {(() => {
                            const Icon = categoryIcons[selectedZone.category as keyof typeof categoryIcons]
                            return <Icon className="h-3.5 w-3.5 text-primary" />
                          })()}
                          <span className="font-medium text-card-foreground capitalize">{selectedZone.category}</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-muted-foreground">Active Incidents</span>
                        <span className="font-bold text-card-foreground text-lg">{selectedZone.incidents}</span>
                      </div>
                      <div className="space-y-1">
                        <span className="text-muted-foreground">Trend (24h)</span>
                        <span className={`font-medium ${selectedZone.trend.startsWith('+') ? 'text-red-500' : selectedZone.trend.startsWith('-') ? 'text-green-500' : 'text-muted-foreground'}`}>
                          {selectedZone.trend}
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                      <span className="text-[10px] text-muted-foreground">Updated {selectedZone.lastUpdate}</span>
                      <Button size="sm" variant="outline" className="h-6 text-[10px]">
                        <Crosshair className="mr-1 h-3 w-3" />
                        Investigate
                      </Button>
                    </div>
                  </div>
                )}

                {/* Coordinates display */}
                <div className="absolute bottom-2 left-2 px-2 py-1 rounded bg-card/80 border border-border text-[9px] font-mono text-muted-foreground">
                  {filteredZones.length} zones active
                </div>
              </div>

              {/* Timeline Playback */}
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
                  <span className="text-[10px] font-mono text-muted-foreground w-20 text-right">
                    {timelinePosition[0] === 100 ? 'Live' : `${Math.round(timelinePosition[0] / 100 * 24)}h ago`}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Side Panel */}
          <div className="lg:col-span-4 space-y-4">
            {/* Zone List */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-2 pt-3 px-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-card-foreground">Active Zones</CardTitle>
                  <span className="text-[10px] font-mono text-muted-foreground">{filteredZones.length} total</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-1.5 max-h-[240px] overflow-y-auto px-4 pb-4">
                {filteredZones.map((zone) => {
                  const colors = threatColors[zone.threat as keyof typeof threatColors]
                  const CategoryIcon = categoryIcons[zone.category as keyof typeof categoryIcons]
                  return (
                    <button
                      key={zone.id}
                      onClick={() => setSelectedZone(zone)}
                      className={`w-full flex items-center gap-2.5 rounded-md p-2 transition-colors text-left ${
                        selectedZone?.id === zone.id 
                          ? 'bg-primary/10 border border-primary/30' 
                          : 'bg-muted/30 hover:bg-muted/50 border border-transparent'
                      }`}
                    >
                      <div className={`h-2.5 w-2.5 rounded-full ${colors.bg} shadow-sm ${colors.glow}`} />
                      <div className="flex-1 min-w-0">
                        <span className="text-xs font-medium text-card-foreground truncate block">{zone.name}</span>
                        <span className="text-[10px] text-muted-foreground">{zone.incidents} incidents</span>
                      </div>
                      <CategoryIcon className="h-3.5 w-3.5 text-muted-foreground" />
                    </button>
                  )
                })}
              </CardContent>
            </Card>

            {/* Incident Timeline Chart */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-2 pt-3 px-4">
                <CardTitle className="text-sm font-medium text-card-foreground">24h Incident Timeline</CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <div className="h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={timelineData}>
                      <XAxis dataKey="time" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                      <YAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" width={30} />
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
                        dataKey="incidents"
                        stroke="hsl(var(--primary))"
                        fill="hsl(var(--primary))"
                        fillOpacity={0.2}
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Category Breakdown */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-2 pt-3 px-4">
                <CardTitle className="text-sm font-medium text-card-foreground">Category Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <div className="h-28">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={categoryBreakdown} layout="vertical">
                      <XAxis type="number" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                      <YAxis dataKey="category" type="category" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" width={60} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                          fontSize: "11px",
                        }}
                      />
                      <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                        {categoryBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Statistics Row */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
          {[
            { label: "Critical Zones", value: threatZones.filter(z => z.threat === 'critical').length, color: "text-red-500", bg: "bg-red-500/10" },
            { label: "High Risk", value: threatZones.filter(z => z.threat === 'high').length, color: "text-orange-500", bg: "bg-orange-500/10" },
            { label: "Medium Risk", value: threatZones.filter(z => z.threat === 'medium').length, color: "text-amber-500", bg: "bg-amber-500/10" },
            { label: "Low Risk", value: threatZones.filter(z => z.threat === 'low').length, color: "text-green-500", bg: "bg-green-500/10" },
            { label: "Total Incidents", value: threatZones.reduce((sum, z) => sum + z.incidents, 0), color: "text-primary", bg: "bg-primary/10" },
          ].map((stat) => (
            <Card key={stat.label} className="bg-card border-border">
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                    <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                  <div className={`h-8 w-8 rounded-lg ${stat.bg} flex items-center justify-center`}>
                    <AlertTriangle className={`h-4 w-4 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}

// Cell component for BarChart
const Cell = ({ fill, ...props }: { fill: string; [key: string]: unknown }) => (
  <rect {...props} fill={fill} />
)
