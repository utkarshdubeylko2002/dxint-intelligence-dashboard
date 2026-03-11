"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Network, Users, Building, MapPin, AlertTriangle, Eye,
  Maximize2, ZoomIn, ZoomOut, Filter, Download, RefreshCw
} from "lucide-react"

const networkNodes = [
  { id: "POI-001", type: "person", label: "A. Volkov", risk: 94, x: 50, y: 50 },
  { id: "POI-002", type: "person", label: "C. Wei Lin", risk: 87, x: 25, y: 30 },
  { id: "POI-003", type: "person", label: "A. Hassan", risk: 91, x: 75, y: 25 },
  { id: "ORG-001", type: "organization", label: "Shadow Network", x: 20, y: 60 },
  { id: "ORG-002", type: "organization", label: "Tech Collective", x: 80, y: 55 },
  { id: "ORG-003", type: "organization", label: "Eastern Syndicate", x: 35, y: 80 },
  { id: "LOC-001", type: "location", label: "Moscow Hub", x: 65, y: 75 },
  { id: "LOC-002", type: "location", label: "Dubai Center", x: 15, y: 45 },
  { id: "EVT-001", type: "event", label: "Op. Thunder", x: 85, y: 80 },
]

const networkEdges = [
  { from: "POI-001", to: "POI-002", strength: "strong" },
  { from: "POI-001", to: "POI-003", strength: "medium" },
  { from: "POI-001", to: "ORG-001", strength: "strong" },
  { from: "POI-002", to: "ORG-002", strength: "strong" },
  { from: "POI-002", to: "ORG-003", strength: "medium" },
  { from: "POI-003", to: "LOC-001", strength: "strong" },
  { from: "ORG-001", to: "LOC-002", strength: "weak" },
  { from: "ORG-002", to: "EVT-001", strength: "medium" },
  { from: "LOC-001", to: "EVT-001", strength: "strong" },
  { from: "POI-001", to: "LOC-001", strength: "medium" },
]

const suspiciousClusters = [
  {
    id: 1,
    name: "Eastern European Network",
    nodes: 12,
    risk: "high",
    description: "Interconnected group with financial and cyber operations",
    keyEntities: ["POI-001", "POI-007", "ORG-001"],
  },
  {
    id: 2,
    name: "Pacific Rim Collective",
    nodes: 8,
    risk: "medium",
    description: "Technology-focused network with economic espionage ties",
    keyEntities: ["POI-002", "ORG-002"],
  },
  {
    id: 3,
    name: "Middle East Consortium",
    nodes: 15,
    risk: "high",
    description: "Political operations and regional influence network",
    keyEntities: ["POI-003", "LOC-001"],
  },
]

const nodeTypeConfig = {
  person: { color: "bg-red-500", icon: Users, borderColor: "border-red-500" },
  organization: { color: "bg-amber-500", icon: Building, borderColor: "border-amber-500" },
  location: { color: "bg-blue-500", icon: MapPin, borderColor: "border-blue-500" },
  event: { color: "bg-purple-500", icon: AlertTriangle, borderColor: "border-purple-500" },
}

const edgeStrengthConfig = {
  strong: { stroke: "stroke-primary", width: 2, opacity: 0.8 },
  medium: { stroke: "stroke-primary", width: 1.5, opacity: 0.5 },
  weak: { stroke: "stroke-primary", width: 1, opacity: 0.3 },
}

export default function NetworkAnalysisPage() {
  const [selectedNode, setSelectedNode] = useState<typeof networkNodes[0] | null>(null)
  const [filterType, setFilterType] = useState("all")
  const [zoom, setZoom] = useState(1)

  const filteredNodes = filterType === "all" 
    ? networkNodes 
    : networkNodes.filter(n => n.type === filterType)

  const getNodePosition = (id: string) => {
    const node = networkNodes.find(n => n.id === id)
    return node ? { x: node.x, y: node.y } : { x: 50, y: 50 }
  }

  return (
    <DashboardLayout title="Network Intelligence">
      <div className="space-y-4">
        {/* Control Bar */}
        <Card className="bg-card border-border">
          <CardContent className="flex flex-wrap items-center gap-4 p-3">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Filter:</span>
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[150px] h-8 text-xs">
                <SelectValue placeholder="Entity Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="person">Persons</SelectItem>
                <SelectItem value="organization">Organizations</SelectItem>
                <SelectItem value="location">Locations</SelectItem>
                <SelectItem value="event">Events</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex items-center gap-1 ml-auto">
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-xs text-muted-foreground w-12 text-center">{Math.round(zoom * 100)}%</span>
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setZoom(Math.min(2, zoom + 0.1))}>
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8 ml-2">
                <Maximize2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="h-8 ml-2">
                <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
                <span className="text-xs">Refresh</span>
              </Button>
              <Button variant="outline" size="sm" className="h-8">
                <Download className="mr-1.5 h-3.5 w-3.5" />
                <span className="text-xs">Export</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          {/* Network Graph */}
          <Card className="lg:col-span-8 bg-card border-border">
            <CardHeader className="pb-2 pt-3 px-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CardTitle className="text-sm font-medium">Entity Relationship Graph</CardTitle>
                  <Badge variant="outline" className="text-[10px] font-mono">
                    {networkNodes.length} nodes / {networkEdges.length} connections
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-[10px]">
                  <div className="flex items-center gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
                    <span className="text-muted-foreground">Person</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                    <span className="text-muted-foreground">Organization</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                    <span className="text-muted-foreground">Location</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-purple-500" />
                    <span className="text-muted-foreground">Event</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div 
                className="relative h-[500px] rounded-lg bg-background/50 border border-border overflow-hidden"
                style={{ transform: `scale(${zoom})`, transformOrigin: 'center' }}
              >
                {/* Grid Background */}
                <div className="absolute inset-0 opacity-5">
                  <div className="h-full w-full" style={{
                    backgroundImage: 'radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)',
                    backgroundSize: '30px 30px'
                  }} />
                </div>

                {/* Edges */}
                <svg className="absolute inset-0 w-full h-full">
                  {networkEdges.map((edge, i) => {
                    const from = getNodePosition(edge.from)
                    const to = getNodePosition(edge.to)
                    const config = edgeStrengthConfig[edge.strength as keyof typeof edgeStrengthConfig]
                    return (
                      <line
                        key={i}
                        x1={`${from.x}%`}
                        y1={`${from.y}%`}
                        x2={`${to.x}%`}
                        y2={`${to.y}%`}
                        className={config.stroke}
                        strokeWidth={config.width}
                        opacity={config.opacity}
                      />
                    )
                  })}
                </svg>

                {/* Nodes */}
                {filteredNodes.map((node) => {
                  const config = nodeTypeConfig[node.type as keyof typeof nodeTypeConfig]
                  const Icon = config.icon
                  const isSelected = selectedNode?.id === node.id
                  return (
                    <button
                      key={node.id}
                      onClick={() => setSelectedNode(node)}
                      className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all ${
                        isSelected ? 'scale-125 z-20' : 'hover:scale-110 z-10'
                      }`}
                      style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    >
                      <div className={`relative flex flex-col items-center`}>
                        {/* Node circle */}
                        <div className={`h-10 w-10 rounded-full ${config.color} shadow-lg flex items-center justify-center ${
                          isSelected ? 'ring-2 ring-white ring-offset-2 ring-offset-background' : ''
                        }`}>
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        {/* Label */}
                        <div className="mt-1 px-2 py-0.5 rounded bg-card/90 border border-border text-[9px] font-medium text-card-foreground whitespace-nowrap">
                          {node.label}
                        </div>
                        {/* Risk indicator for persons */}
                        {node.type === "person" && (
                          <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-card border border-border flex items-center justify-center">
                            <span className="text-[8px] font-bold text-red-500">{node.risk}</span>
                          </div>
                        )}
                      </div>
                    </button>
                  )
                })}

                {/* Selected node info */}
                {selectedNode && (
                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-lg bg-card/95 border border-border backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`h-8 w-8 rounded-full ${nodeTypeConfig[selectedNode.type as keyof typeof nodeTypeConfig].color} flex items-center justify-center`}>
                          {(() => {
                            const Icon = nodeTypeConfig[selectedNode.type as keyof typeof nodeTypeConfig].icon
                            return <Icon className="h-4 w-4 text-white" />
                          })()}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-card-foreground">{selectedNode.label}</p>
                          <p className="text-[10px] text-muted-foreground capitalize">{selectedNode.type} - {selectedNode.id}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-[10px]">
                          {networkEdges.filter(e => e.from === selectedNode.id || e.to === selectedNode.id).length} connections
                        </Badge>
                        <Button size="sm" variant="outline" className="h-7 text-xs">
                          <Eye className="mr-1 h-3 w-3" />
                          Investigate
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Side Panels */}
          <div className="lg:col-span-4 space-y-4">
            {/* Suspicious Clusters */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-2 pt-3 px-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">Suspicious Clusters</CardTitle>
                  <Badge variant="outline" className="text-[10px] bg-red-500/10 text-red-500 border-red-500/30">
                    {suspiciousClusters.filter(c => c.risk === 'high').length} HIGH RISK
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2 px-4 pb-4">
                {suspiciousClusters.map((cluster) => (
                  <div
                    key={cluster.id}
                    className={`p-3 rounded-lg border ${
                      cluster.risk === 'high' 
                        ? 'bg-red-500/5 border-red-500/20' 
                        : 'bg-amber-500/5 border-amber-500/20'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-sm font-medium text-card-foreground">{cluster.name}</p>
                        <p className="text-[10px] text-muted-foreground">{cluster.nodes} entities</p>
                      </div>
                      <Badge className={cluster.risk === 'high' ? 'bg-red-500' : 'bg-amber-500'}>
                        {cluster.risk.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{cluster.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {cluster.keyEntities.map((entity) => (
                        <Badge key={entity} variant="outline" className="text-[9px]">
                          {entity}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Entity Statistics */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-2 pt-3 px-4">
                <CardTitle className="text-sm font-medium">Entity Statistics</CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <div className="space-y-3">
                  {[
                    { type: "Persons", count: networkNodes.filter(n => n.type === "person").length, color: "bg-red-500", icon: Users },
                    { type: "Organizations", count: networkNodes.filter(n => n.type === "organization").length, color: "bg-amber-500", icon: Building },
                    { type: "Locations", count: networkNodes.filter(n => n.type === "location").length, color: "bg-blue-500", icon: MapPin },
                    { type: "Events", count: networkNodes.filter(n => n.type === "event").length, color: "bg-purple-500", icon: AlertTriangle },
                  ].map((stat) => (
                    <div key={stat.type} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                      <div className="flex items-center gap-2">
                        <div className={`h-6 w-6 rounded ${stat.color}/20 flex items-center justify-center`}>
                          <stat.icon className={`h-3.5 w-3.5 ${stat.color.replace('bg-', 'text-')}`} />
                        </div>
                        <span className="text-xs text-card-foreground">{stat.type}</span>
                      </div>
                      <span className="text-sm font-bold text-card-foreground">{stat.count}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t border-border">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Total Connections</span>
                    <span className="font-bold text-card-foreground">{networkEdges.length}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs mt-2">
                    <span className="text-muted-foreground">Strong Links</span>
                    <span className="font-bold text-primary">{networkEdges.filter(e => e.strength === 'strong').length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Link Analysis */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-2 pt-3 px-4">
                <CardTitle className="text-sm font-medium">Recent Link Analysis</CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4 space-y-2">
                {[
                  { from: "POI-001", to: "ORG-003", type: "New connection", time: "2h ago" },
                  { from: "POI-002", to: "LOC-002", type: "Strength increased", time: "5h ago" },
                  { from: "ORG-001", to: "EVT-001", type: "New connection", time: "1d ago" },
                ].map((link, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-muted/30 text-xs">
                    <Badge variant="outline" className="text-[9px]">{link.from}</Badge>
                    <Network className="h-3 w-3 text-primary" />
                    <Badge variant="outline" className="text-[9px]">{link.to}</Badge>
                    <span className="text-muted-foreground ml-auto">{link.time}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
