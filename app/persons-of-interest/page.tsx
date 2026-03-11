"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Search, Filter, Users, MapPin, Clock, AlertTriangle, 
  Network, Eye, FileText, ChevronRight, Activity,
  Building, Shield, Target
} from "lucide-react"
import { Area, AreaChart, ResponsiveContainer, XAxis, Tooltip } from "recharts"

const persons = [
  {
    id: "POI-001",
    name: "Alexei Volkov",
    alias: "The Architect",
    riskScore: 94,
    status: "active",
    location: "Moscow, Russia",
    lastSeen: "2 hours ago",
    category: "Cyber Operations",
    connections: 47,
    alerts: 12,
    organizations: ["Shadow Network", "Eastern Collective"],
    activity: [
      { date: "Mon", value: 3 }, { date: "Tue", value: 5 }, { date: "Wed", value: 2 },
      { date: "Thu", value: 8 }, { date: "Fri", value: 4 }, { date: "Sat", value: 6 }, { date: "Sun", value: 7 }
    ],
    recentAlerts: ["Encrypted communication detected", "New contact established"],
    behaviorSummary: "Increased operational tempo in past 72 hours. Multiple secure communications with known entities.",
  },
  {
    id: "POI-002",
    name: "Chen Wei Lin",
    alias: "Phantom",
    riskScore: 87,
    status: "active",
    location: "Shenzhen, China",
    lastSeen: "4 hours ago",
    category: "Economic Espionage",
    connections: 32,
    alerts: 8,
    organizations: ["Tech Collective", "Eastern Syndicate"],
    activity: [
      { date: "Mon", value: 2 }, { date: "Tue", value: 4 }, { date: "Wed", value: 6 },
      { date: "Thu", value: 3 }, { date: "Fri", value: 7 }, { date: "Sat", value: 5 }, { date: "Sun", value: 4 }
    ],
    recentAlerts: ["Financial transaction flagged", "Travel movement detected"],
    behaviorSummary: "Pattern suggests preparation for operation. Increased financial activity noted.",
  },
  {
    id: "POI-003",
    name: "Ahmad Hassan",
    alias: "Sandstorm",
    riskScore: 91,
    status: "active",
    location: "Tehran, Iran",
    lastSeen: "30 min ago",
    category: "Political Operations",
    connections: 28,
    alerts: 15,
    organizations: ["Regional Council", "Liberation Front"],
    activity: [
      { date: "Mon", value: 8 }, { date: "Tue", value: 6 }, { date: "Wed", value: 9 },
      { date: "Thu", value: 7 }, { date: "Fri", value: 10 }, { date: "Sat", value: 8 }, { date: "Sun", value: 9 }
    ],
    recentAlerts: ["Meeting with known contact", "Secure channel activated"],
    behaviorSummary: "High activity period. Multiple meetings with known operatives in past week.",
  },
  {
    id: "POI-004",
    name: "Sofia Petrova",
    alias: "Whisper",
    riskScore: 76,
    status: "monitoring",
    location: "Belgrade, Serbia",
    lastSeen: "1 day ago",
    category: "Intelligence",
    connections: 19,
    alerts: 5,
    organizations: ["Balkan Network"],
    activity: [
      { date: "Mon", value: 1 }, { date: "Tue", value: 2 }, { date: "Wed", value: 1 },
      { date: "Thu", value: 3 }, { date: "Fri", value: 2 }, { date: "Sat", value: 1 }, { date: "Sun", value: 2 }
    ],
    recentAlerts: ["Location change detected"],
    behaviorSummary: "Reduced activity. Possible operational pause or security concern.",
  },
  {
    id: "POI-005",
    name: "Omar Al-Rashid",
    alias: "Falcon",
    riskScore: 82,
    status: "active",
    location: "Dubai, UAE",
    lastSeen: "6 hours ago",
    category: "Financial Operations",
    connections: 54,
    alerts: 7,
    organizations: ["Gulf Trading Co.", "Desert Holdings"],
    activity: [
      { date: "Mon", value: 4 }, { date: "Tue", value: 5 }, { date: "Wed", value: 3 },
      { date: "Thu", value: 6 }, { date: "Fri", value: 4 }, { date: "Sat", value: 2 }, { date: "Sun", value: 3 }
    ],
    recentAlerts: ["Large transaction detected", "New business registration"],
    behaviorSummary: "Financial movements suggest resource positioning. Multiple shell company activities.",
  },
  {
    id: "POI-006",
    name: "Yuki Tanaka",
    alias: "Ghost",
    riskScore: 68,
    status: "inactive",
    location: "Tokyo, Japan",
    lastSeen: "1 week ago",
    category: "Technology",
    connections: 23,
    alerts: 2,
    organizations: ["Digital Frontier"],
    activity: [
      { date: "Mon", value: 0 }, { date: "Tue", value: 1 }, { date: "Wed", value: 0 },
      { date: "Thu", value: 0 }, { date: "Fri", value: 1 }, { date: "Sat", value: 0 }, { date: "Sun", value: 0 }
    ],
    recentAlerts: ["Online presence resumed"],
    behaviorSummary: "Dormant for extended period. May be in operational security mode.",
  },
]

const statusColors = {
  active: { bg: "bg-red-500/10", text: "text-red-500", border: "border-red-500/30", dot: "bg-red-500" },
  monitoring: { bg: "bg-amber-500/10", text: "text-amber-500", border: "border-amber-500/30", dot: "bg-amber-500" },
  inactive: { bg: "bg-slate-500/10", text: "text-slate-400", border: "border-slate-500/30", dot: "bg-slate-400" },
}

const riskColors = (score: number) => {
  if (score >= 90) return { text: "text-red-500", bg: "bg-red-500" }
  if (score >= 75) return { text: "text-orange-500", bg: "bg-orange-500" }
  if (score >= 60) return { text: "text-amber-500", bg: "bg-amber-500" }
  return { text: "text-green-500", bg: "bg-green-500" }
}

export default function PersonsOfInterestPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [selectedPerson, setSelectedPerson] = useState<typeof persons[0] | null>(null)

  const filteredPersons = persons.filter(p => {
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !p.alias.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !p.id.toLowerCase().includes(searchQuery.toLowerCase())) return false
    if (statusFilter !== "all" && p.status !== statusFilter) return false
    if (categoryFilter !== "all" && p.category !== categoryFilter) return false
    return true
  })

  return (
    <DashboardLayout title="Persons of Interest">
      <div className="space-y-4">
        {/* Control Bar */}
        <Card className="bg-card border-border">
          <CardContent className="flex flex-wrap items-center gap-4 p-3">
            <div className="relative flex-1 min-w-[200px] max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, alias, or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-8 text-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[130px] h-8 text-xs">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="monitoring">Monitoring</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[160px] h-8 text-xs">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Cyber Operations">Cyber Operations</SelectItem>
                  <SelectItem value="Political Operations">Political Ops</SelectItem>
                  <SelectItem value="Financial Operations">Financial Ops</SelectItem>
                  <SelectItem value="Intelligence">Intelligence</SelectItem>
                  <SelectItem value="Economic Espionage">Economic Espionage</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-xs text-muted-foreground">{filteredPersons.length} results</span>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
          {/* Person List */}
          <div className="xl:col-span-7 space-y-3">
            {filteredPersons.map((person) => {
              const status = statusColors[person.status as keyof typeof statusColors]
              const risk = riskColors(person.riskScore)
              return (
                <Card 
                  key={person.id}
                  className={`bg-card border cursor-pointer transition-all hover:border-primary/50 ${
                    selectedPerson?.id === person.id ? 'border-primary ring-1 ring-primary/20' : 'border-border'
                  }`}
                  onClick={() => setSelectedPerson(person)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      {/* Avatar */}
                      <Avatar className="h-14 w-14 border-2 border-border">
                        <AvatarFallback className="bg-muted text-muted-foreground text-lg font-semibold">
                          {person.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>

                      {/* Main Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-card-foreground">{person.name}</h3>
                              <Badge variant="outline" className={`text-[9px] ${status.text} ${status.bg} ${status.border}`}>
                                <span className={`mr-1 h-1.5 w-1.5 rounded-full ${status.dot} ${person.status === 'active' ? 'animate-pulse' : ''}`} />
                                {person.status.toUpperCase()}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">"{person.alias}" - {person.id}</p>
                          </div>
                          {/* Risk Score */}
                          <div className="text-right">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] text-muted-foreground uppercase">Risk</span>
                              <span className={`text-xl font-bold ${risk.text}`}>{person.riskScore}</span>
                            </div>
                            <Progress value={person.riskScore} className="h-1.5 w-20 mt-1" />
                          </div>
                        </div>

                        <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 text-xs">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="h-3.5 w-3.5" />
                            <span>{person.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-3.5 w-3.5" />
                            <span>Last seen {person.lastSeen}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Target className="h-3.5 w-3.5" />
                            <span>{person.category}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Network className="h-3.5 w-3.5" />
                            <span>{person.connections} connections</span>
                          </div>
                        </div>

                        {/* Activity Sparkline */}
                        <div className="mt-3 flex items-center gap-3">
                          <span className="text-[10px] text-muted-foreground">7-day activity:</span>
                          <div className="h-6 flex-1 max-w-[120px]">
                            <ResponsiveContainer width="100%" height="100%">
                              <AreaChart data={person.activity}>
                                <Area
                                  type="monotone"
                                  dataKey="value"
                                  stroke="hsl(var(--primary))"
                                  fill="hsl(var(--primary))"
                                  fillOpacity={0.3}
                                  strokeWidth={1.5}
                                />
                              </AreaChart>
                            </ResponsiveContainer>
                          </div>
                          {person.alerts > 0 && (
                            <Badge variant="outline" className="text-[9px] bg-red-500/10 text-red-500 border-red-500/30">
                              <AlertTriangle className="mr-1 h-2.5 w-2.5" />
                              {person.alerts} alerts
                            </Badge>
                          )}
                        </div>
                      </div>

                      <ChevronRight className="h-5 w-5 text-muted-foreground/50" />
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Detail Panel */}
          <div className="xl:col-span-5">
            {selectedPerson ? (
              <Card className="bg-card border-border sticky top-4">
                <CardHeader className="pb-3 border-b border-border">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12 border-2 border-border">
                        <AvatarFallback className="bg-muted text-muted-foreground font-semibold">
                          {selectedPerson.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">{selectedPerson.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">"{selectedPerson.alias}"</p>
                      </div>
                    </div>
                    <Badge className={`${riskColors(selectedPerson.riskScore).bg} text-white`}>
                      RISK: {selectedPerson.riskScore}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="w-full grid grid-cols-4 h-8">
                      <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
                      <TabsTrigger value="activity" className="text-xs">Activity</TabsTrigger>
                      <TabsTrigger value="network" className="text-xs">Network</TabsTrigger>
                      <TabsTrigger value="alerts" className="text-xs">Alerts</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="mt-4 space-y-4">
                      {/* Quick Stats */}
                      <div className="grid grid-cols-3 gap-2">
                        <div className="rounded-lg bg-muted/30 p-3 text-center">
                          <Network className="h-4 w-4 mx-auto text-primary mb-1" />
                          <p className="text-lg font-bold text-card-foreground">{selectedPerson.connections}</p>
                          <p className="text-[10px] text-muted-foreground">Connections</p>
                        </div>
                        <div className="rounded-lg bg-muted/30 p-3 text-center">
                          <AlertTriangle className="h-4 w-4 mx-auto text-red-500 mb-1" />
                          <p className="text-lg font-bold text-card-foreground">{selectedPerson.alerts}</p>
                          <p className="text-[10px] text-muted-foreground">Active Alerts</p>
                        </div>
                        <div className="rounded-lg bg-muted/30 p-3 text-center">
                          <Building className="h-4 w-4 mx-auto text-amber-500 mb-1" />
                          <p className="text-lg font-bold text-card-foreground">{selectedPerson.organizations.length}</p>
                          <p className="text-[10px] text-muted-foreground">Organizations</p>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/20">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-[10px] text-muted-foreground">Last Known Location</p>
                            <p className="text-sm font-medium text-card-foreground">{selectedPerson.location}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/20">
                          <Target className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-[10px] text-muted-foreground">Category</p>
                            <p className="text-sm font-medium text-card-foreground">{selectedPerson.category}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/20">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-[10px] text-muted-foreground">Last Activity</p>
                            <p className="text-sm font-medium text-card-foreground">{selectedPerson.lastSeen}</p>
                          </div>
                        </div>
                      </div>

                      {/* Behavior Summary */}
                      <div className="p-3 rounded-lg border border-border bg-muted/10">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">Behavioral Analysis</p>
                        <p className="text-xs text-card-foreground leading-relaxed">{selectedPerson.behaviorSummary}</p>
                      </div>

                      {/* Organizations */}
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">Associated Organizations</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedPerson.organizations.map((org) => (
                            <Badge key={org} variant="outline" className="text-xs">
                              <Building className="mr-1 h-3 w-3" />
                              {org}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="activity" className="mt-4 space-y-4">
                      <div className="h-32">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">7-Day Activity Pattern</p>
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={selectedPerson.activity}>
                            <XAxis dataKey="date" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
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
                              dataKey="value"
                              stroke="hsl(var(--primary))"
                              fill="hsl(var(--primary))"
                              fillOpacity={0.3}
                              strokeWidth={2}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="space-y-2">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Activity Timeline</p>
                        {[
                          { time: "2h ago", action: "Secure communication initiated", type: "comm" },
                          { time: "6h ago", action: "Location: Moscow central", type: "location" },
                          { time: "12h ago", action: "Meeting with POI-007", type: "meeting" },
                          { time: "1d ago", action: "Financial transaction detected", type: "financial" },
                        ].map((event, i) => (
                          <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-muted/20 text-xs">
                            <span className="text-muted-foreground w-12">{event.time}</span>
                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                            <span className="text-card-foreground">{event.action}</span>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="network" className="mt-4">
                      <div className="h-48 rounded-lg bg-muted/20 border border-border flex items-center justify-center relative overflow-hidden">
                        {/* Simplified network visualization */}
                        <div className="absolute inset-0 opacity-30">
                          <svg className="w-full h-full">
                            <line x1="50%" y1="50%" x2="20%" y2="20%" stroke="hsl(var(--primary))" strokeWidth="1" />
                            <line x1="50%" y1="50%" x2="80%" y2="30%" stroke="hsl(var(--primary))" strokeWidth="1" />
                            <line x1="50%" y1="50%" x2="30%" y2="75%" stroke="hsl(var(--primary))" strokeWidth="1" />
                            <line x1="50%" y1="50%" x2="75%" y2="70%" stroke="hsl(var(--primary))" strokeWidth="1" />
                            <line x1="50%" y1="50%" x2="15%" y2="50%" stroke="hsl(var(--primary))" strokeWidth="1" />
                          </svg>
                        </div>
                        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2">
                          <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                            {selectedPerson.name.split(' ').map(n => n[0]).join('')}
                          </div>
                        </div>
                        {[
                          { x: "20%", y: "20%", label: "POI-007" },
                          { x: "80%", y: "30%", label: "ORG-A" },
                          { x: "30%", y: "75%", label: "POI-012" },
                          { x: "75%", y: "70%", label: "LOC-3" },
                          { x: "15%", y: "50%", label: "ORG-B" },
                        ].map((node, i) => (
                          <div
                            key={i}
                            className="absolute h-6 w-6 rounded-full bg-muted border border-border flex items-center justify-center"
                            style={{ left: node.x, top: node.y, transform: 'translate(-50%, -50%)' }}
                          >
                            <span className="text-[8px] font-mono text-muted-foreground">{node.label}</span>
                          </div>
                        ))}
                      </div>
                      <p className="text-center text-[10px] text-muted-foreground mt-2">
                        {selectedPerson.connections} total connections identified
                      </p>
                    </TabsContent>

                    <TabsContent value="alerts" className="mt-4 space-y-2">
                      {selectedPerson.recentAlerts.map((alert, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-red-500/5 border border-red-500/20">
                          <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-card-foreground">{alert}</p>
                            <p className="text-[10px] text-muted-foreground mt-1">{i === 0 ? '2 hours ago' : '6 hours ago'}</p>
                          </div>
                        </div>
                      ))}
                      {selectedPerson.alerts > 2 && (
                        <Button variant="outline" size="sm" className="w-full text-xs">
                          View all {selectedPerson.alerts} alerts
                        </Button>
                      )}
                    </TabsContent>
                  </Tabs>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2 border-t border-border">
                    <Button size="sm" className="flex-1 text-xs">
                      <Eye className="mr-1.5 h-3.5 w-3.5" />
                      Full Profile
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 text-xs">
                      <FileText className="mr-1.5 h-3.5 w-3.5" />
                      Generate Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-card border-border">
                <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                  <Users className="h-12 w-12 text-muted-foreground/30 mb-4" />
                  <p className="text-sm text-muted-foreground">Select a person to view details</p>
                  <p className="text-xs text-muted-foreground/70 mt-1">Click on any profile card to see full information</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Card className="bg-card border-border">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase">Total POIs</p>
                  <p className="text-xl font-bold text-card-foreground">{persons.length}</p>
                </div>
                <Users className="h-8 w-8 text-primary/30" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase">Active</p>
                  <p className="text-xl font-bold text-red-500">{persons.filter(p => p.status === 'active').length}</p>
                </div>
                <Activity className="h-8 w-8 text-red-500/30" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase">High Risk (90+)</p>
                  <p className="text-xl font-bold text-orange-500">{persons.filter(p => p.riskScore >= 90).length}</p>
                </div>
                <Shield className="h-8 w-8 text-orange-500/30" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase">Total Alerts</p>
                  <p className="text-xl font-bold text-amber-500">{persons.reduce((sum, p) => sum + p.alerts, 0)}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-amber-500/30" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
