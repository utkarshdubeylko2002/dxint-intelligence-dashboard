"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Bell, 
  AlertTriangle, 
  AlertCircle, 
  Info,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  Filter,
  RefreshCw,
  Volume2,
  VolumeX
} from "lucide-react"

const alerts = [
  {
    id: "ALT-001",
    type: "Intrusion Detection",
    title: "Unauthorized access attempt detected",
    location: "Tehran, Iran",
    severity: "critical",
    timestamp: "2024-03-15T14:32:00",
    status: "active",
    source: "SIGINT",
  },
  {
    id: "ALT-002",
    type: "Network Anomaly",
    title: "Unusual encrypted traffic pattern",
    location: "Moscow, Russia",
    severity: "high",
    timestamp: "2024-03-15T14:28:00",
    status: "active",
    source: "Network Monitoring",
  },
  {
    id: "ALT-003",
    type: "Financial Alert",
    title: "Suspicious wire transfer flagged",
    location: "Zurich, Switzerland",
    severity: "high",
    timestamp: "2024-03-15T14:15:00",
    status: "investigating",
    source: "FININT",
  },
  {
    id: "ALT-004",
    type: "Geofence Breach",
    title: "Target entered restricted zone",
    location: "Damascus, Syria",
    severity: "medium",
    timestamp: "2024-03-15T14:02:00",
    status: "active",
    source: "GEOINT",
  },
  {
    id: "ALT-005",
    type: "Social Media",
    title: "Propaganda campaign detected",
    location: "Multiple Regions",
    severity: "medium",
    timestamp: "2024-03-15T13:45:00",
    status: "acknowledged",
    source: "OSINT",
  },
  {
    id: "ALT-006",
    type: "Communication Intercept",
    title: "High-value target communication",
    location: "Beijing, China",
    severity: "critical",
    timestamp: "2024-03-15T13:30:00",
    status: "investigating",
    source: "SIGINT",
  },
  {
    id: "ALT-007",
    type: "Asset Movement",
    title: "Military equipment relocation detected",
    location: "Pyongyang, North Korea",
    severity: "high",
    timestamp: "2024-03-15T13:15:00",
    status: "active",
    source: "IMINT",
  },
  {
    id: "ALT-008",
    type: "Cyber Attack",
    title: "DDoS attack on allied infrastructure",
    location: "Berlin, Germany",
    severity: "high",
    timestamp: "2024-03-15T12:58:00",
    status: "resolved",
    source: "CYBERINT",
  },
  {
    id: "ALT-009",
    type: "Personnel Alert",
    title: "Known operative spotted at border",
    location: "Tijuana, Mexico",
    severity: "medium",
    timestamp: "2024-03-15T12:42:00",
    status: "acknowledged",
    source: "HUMINT",
  },
  {
    id: "ALT-010",
    type: "System Alert",
    title: "Scheduled maintenance reminder",
    location: "System",
    severity: "low",
    timestamp: "2024-03-15T12:30:00",
    status: "acknowledged",
    source: "System",
  },
]

const severityConfig = {
  critical: { 
    icon: AlertTriangle, 
    badge: "bg-red-600 text-white border-red-600", 
    iconColor: "text-red-500",
    bgColor: "bg-red-500/10",
    borderColor: "border-l-red-500"
  },
  high: { 
    icon: AlertCircle, 
    badge: "bg-red-500/10 text-red-500 border-red-500/20", 
    iconColor: "text-red-500",
    bgColor: "bg-red-500/5",
    borderColor: "border-l-red-500"
  },
  medium: { 
    icon: AlertCircle, 
    badge: "bg-amber-500/10 text-amber-500 border-amber-500/20", 
    iconColor: "text-amber-500",
    bgColor: "bg-amber-500/5",
    borderColor: "border-l-amber-500"
  },
  low: { 
    icon: Info, 
    badge: "bg-blue-500/10 text-blue-500 border-blue-500/20", 
    iconColor: "text-blue-500",
    bgColor: "bg-blue-500/5",
    borderColor: "border-l-blue-500"
  },
}

const statusConfig = {
  active: { badge: "bg-red-500/10 text-red-500 border-red-500/20", label: "Active", icon: AlertCircle },
  investigating: { badge: "bg-amber-500/10 text-amber-500 border-amber-500/20", label: "Investigating", icon: Clock },
  acknowledged: { badge: "bg-blue-500/10 text-blue-500 border-blue-500/20", label: "Acknowledged", icon: CheckCircle },
  resolved: { badge: "bg-green-500/10 text-green-500 border-green-500/20", label: "Resolved", icon: CheckCircle },
}

function formatTimestamp(timestamp: string) {
  const date = new Date(timestamp)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(minutes / 60)
  
  if (minutes < 60) return `${minutes} min ago`
  if (hours < 24) return `${hours}h ago`
  return date.toLocaleDateString()
}

export default function AlertsPage() {
  const [severityFilter, setSeverityFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [soundEnabled, setSoundEnabled] = useState(true)

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSeverity = severityFilter === "all" || alert.severity === severityFilter
    const matchesStatus = statusFilter === "all" || alert.status === statusFilter
    return matchesSeverity && matchesStatus
  })

  const activeCount = alerts.filter(a => a.status === 'active').length
  const criticalCount = alerts.filter(a => a.severity === 'critical').length
  const highCount = alerts.filter(a => a.severity === 'high').length

  return (
    <DashboardLayout title="Alerts">
      <div className="space-y-6">
        {/* Header Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Total Alerts</p>
                  <p className="text-2xl font-bold text-foreground">{alerts.length}</p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Bell className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border border-l-4 border-l-red-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Active Alerts</p>
                  <p className="text-2xl font-bold text-red-500">{activeCount}</p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                  <AlertCircle className="h-5 w-5 text-red-500 animate-pulse" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Critical</p>
                  <p className="text-2xl font-bold text-red-600">{criticalCount}</p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-red-600/10 flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">High Priority</p>
                  <p className="text-2xl font-bold text-amber-500">{highCount}</p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <AlertCircle className="h-5 w-5 text-amber-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-card border-border">
          <CardContent className="flex flex-wrap items-center gap-4 p-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Filters:</span>
            </div>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="investigating">Investigating</SelectItem>
                <SelectItem value="acknowledged">Acknowledged</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2 ml-auto">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setSoundEnabled(!soundEnabled)}
              >
                {soundEnabled ? (
                  <Volume2 className="mr-2 h-4 w-4" />
                ) : (
                  <VolumeX className="mr-2 h-4 w-4" />
                )}
                {soundEnabled ? "Sound On" : "Sound Off"}
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Live Alert Banner */}
        {activeCount > 0 && (
          <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse" />
              <span className="text-sm font-medium text-red-500">
                {activeCount} active alert{activeCount > 1 ? 's' : ''} requiring attention
              </span>
            </div>
            <Button variant="destructive" size="sm">
              View Active Alerts
            </Button>
          </div>
        )}

        {/* Alerts Feed */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-card-foreground">
                Real-time Alert Feed ({filteredAlerts.length})
              </CardTitle>
              <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                <span className="mr-1 h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                Live
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {filteredAlerts.map((alert) => {
              const severity = severityConfig[alert.severity as keyof typeof severityConfig]
              const status = statusConfig[alert.status as keyof typeof statusConfig]
              const Icon = severity.icon
              const StatusIcon = status.icon

              return (
                <div
                  key={alert.id}
                  className={`rounded-lg border border-border ${severity.bgColor} p-4 border-l-4 ${severity.borderColor} transition-colors hover:bg-muted/30`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className={`mt-0.5 rounded-md bg-muted p-2 ${severity.iconColor}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-muted-foreground">{alert.id}</span>
                          <Badge variant="outline" className={severity.badge}>
                            {alert.severity.toUpperCase()}
                          </Badge>
                          <Badge variant="outline" className={status.badge}>
                            <StatusIcon className="mr-1 h-3 w-3" />
                            {status.label}
                          </Badge>
                        </div>
                        <p className="font-medium text-card-foreground">{alert.title}</p>
                        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Bell className="h-3 w-3" />
                            <span>{alert.type}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <span>{alert.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{formatTimestamp(alert.timestamp)}</span>
                          </div>
                          <span className="px-2 py-0.5 rounded bg-muted text-muted-foreground">
                            {alert.source}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {alert.status === 'active' && (
                        <Button size="sm" variant="outline">
                          Acknowledge
                        </Button>
                      )}
                      {alert.status === 'investigating' && (
                        <Button size="sm" variant="outline">
                          Mark Resolved
                        </Button>
                      )}
                      <Button size="sm" variant="ghost">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}

            {filteredAlerts.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12">
                <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
                <p className="text-muted-foreground">No alerts match your filters</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
