"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, Brain, TrendingUp, Zap } from "lucide-react"

const anomalies = [
  {
    id: 1,
    title: "Communication Pattern Deviation",
    description: "Unusual increase in encrypted traffic from Region 7",
    confidence: 94,
    severity: "critical",
    detectedBy: "Neural Pattern Analysis",
  },
  {
    id: 2,
    title: "Sentiment Anomaly",
    description: "Coordinated narrative shift detected across platforms",
    confidence: 87,
    severity: "high",
    detectedBy: "NLP Sentiment Engine",
  },
  {
    id: 3,
    title: "Network Topology Change",
    description: "New connection cluster forming between known entities",
    confidence: 76,
    severity: "medium",
    detectedBy: "Graph Analysis AI",
  },
  {
    id: 4,
    title: "Financial Flow Irregularity",
    description: "Unusual transaction patterns in monitored accounts",
    confidence: 82,
    severity: "high",
    detectedBy: "FININT Algorithm",
  },
]

const severityConfig = {
  critical: { color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/30" },
  high: { color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/30" },
  medium: { color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/30" },
  low: { color: "text-green-500", bg: "bg-green-500/10", border: "border-green-500/30" },
}

export function AnomalyDetection() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-4 w-4 text-primary" />
            <CardTitle className="text-sm font-medium text-card-foreground">AI Anomaly Detection</CardTitle>
          </div>
          <Badge variant="outline" className="text-[10px] font-mono">
            4 ACTIVE
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {anomalies.map((anomaly) => {
          const config = severityConfig[anomaly.severity as keyof typeof severityConfig]
          return (
            <div
              key={anomaly.id}
              className={`rounded-lg border ${config.border} ${config.bg} p-3 space-y-2`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className={`h-3.5 w-3.5 ${config.color}`} />
                  <span className="text-sm font-medium text-card-foreground">{anomaly.title}</span>
                </div>
                <Badge variant="outline" className={`text-[9px] uppercase ${config.color} ${config.bg}`}>
                  {anomaly.severity}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{anomaly.description}</p>
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-muted-foreground">Confidence:</span>
                  <div className="flex items-center gap-1.5">
                    <Progress value={anomaly.confidence} className="h-1.5 w-16" />
                    <span className="text-[10px] font-mono text-card-foreground">{anomaly.confidence}%</span>
                  </div>
                </div>
                <span className="text-[9px] text-muted-foreground/70">{anomaly.detectedBy}</span>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
